import { Router } from 'express';
//Encriptado de password
import { hashSync, compareSync } from 'bcrypt';
//Generador de password & token

import generator from 'generate-password';
//nodemailer
import nodemailer from 'nodemailer';
//importamos la conexión DB
import conn from '../database/conn.js';
const router = Router();


// SIGNUP (Registro de usuario)
router.post('/users/signUp', (req, res) => {
    //Recogemos los datos
    const nombre = req.body.nombre;
    const apell = req.body.apell;
    const signUpEmail = req.body.signUpEmail;
    const passSignUp1 = req.body.passSignUp1;
    const passSignUp2 = req.body.passSignUp2;

    //Validamos los datos
    const email_regexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (nombre.length === 0) {
        res.json('Rellena el campo nombre');
    } else if (nombre.length < 1 || nombre.length > 20) {
        res.json('Campo nombre con formato incorrecto');
    } else if (apell.length === 0) {
        res.json('Rellena el campo Apellidos');
    } else if (apell.length < 1 || apell.length > 100) {
        res.json('Campo Apellidos con formato incorrecto');
    } else if (signUpEmail.length === 0) {
        res.json('Rellena el campo Email');
    } else if (!email_regexp.test(signUpEmail)) {
        res.json('Formato de Email incorrecto');
    } else if (passSignUp1.length === 0) {
        res.json('Rellena el campo Contrseña');
    } else if (passSignUp1.length < 6) {
        res.json('Formato de contraseña incorrecto');
    } else if (passSignUp2.length === 0) {
        res.json('Rellena el campo confirmar contraseña');
    } else if (passSignUp1 != passSignUp2) {
        res.json('Las contraseñas no coinciden');
    } else {
        // Comprobar que el email no está previamente registrado en nuestra DB
        const sql = 'select * from Usuario where mail = ?';
        conn.query(sql, [signUpEmail], (err, result) => {
            if (err) throw err; //Lanza excepciónde error
            // Si la consulta devuelve un valor (array), el email está registrado
            if (result.length > 0) {
                res.json('El email introducido ya está registrado');
            } else {
                //Encriptar password
                const hashpassSignUp1 = hashSync(passSignUp1, 10);
                //Generamos un token
                const reg_token = generator.generate({
                    length: 100,
                    numbers: true
                });
                //URL token
                const url_host = `${req.protocol}://${req.get('host')}`;
                const url_link = `${url_host}/reg_confirm?email=${signUpEmail}&token=${reg_token}`;

                //enviamos el email con link de confirmación de registro
                const transporter = nodemailer.createTransport({
                    service: 'hotmail',
                    auth: {
                        user: 'crochetmania-bcn@outlook.es',
                        pass: 'netmind22'
                    }
                })

                const mailOptions = {
                    from: 'crochetmania-bcn@outlook.es',
                    to: signUpEmail,
                    subject: 'Confirmación de registro - Vegan Menu',
                    html: `
                        <div>
                        <h1>Confirmación de registro</h1>
                        <h2><a href="${url_link}">Click aquí</a> para confirmar el registro</h2>
                        
                        </div>
                    `
                }
                //enviamos el mail con la contraseña
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        res.json('¡Error al enviar los datos por mail! ' + err);
                    }

                    const sql = 'insert into Usuario values (?,?,?,?,?, default,default,?)';
                    conn.query(sql, [null, nombre, apell, signUpEmail, hashpassSignUp1, reg_token], (err, result) => {
                        if (err) throw err; //Lanza excepciónde error
                        res.json(`${nombre} registrado correctamente`);
                    });

                });
            }
        });
    }
})



// ForgotPass (Recuperación de contraseña)
router.post('/forgotPass', (req, res) => {
    //recogemos los datos
    const forgotPassemail = req.body.forgotPassEmail;
    //Validamos los datos
    const email_regexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    if (forgotPassemail.length === 0) {
        res.json('Rellena el campo Email');
    } else if (!email_regexp.test(forgotPassemail)) {
        res.json('Formato de Email incorrecto');
    } else {
        //Comprobar que el email esta previamente registrado
        const sql = 'select * from Usuario where mail = ?';
        conn.query(sql, [forgotPassemail], (err, result) => {
            if (err) throw err; //Lanza excepciónde error
            // Si la consulta devuelve un valor (array), el email está registrado
            if (result.length === 0) {
                res.json('El email introducido NO está registrado');
            } else {
                //Generamos un nuevo password
                const newPassword = generator.generate({
                    length: 6,
                    numbers: true
                })
                //enviamos el email con el nuevo password
                const transporter = nodemailer.createTransport({
                    service: 'hotmail',
                    auth: {
                        user: 'crochetmania-bcn@outlook.es',
                        pass: 'netmind22'
                    }
                })

                const mailOptions = {
                    from: 'crochetmania-bcn@outlook.es',
                    to: forgotPassemail,
                    subject: 'Nueva contraseña - Vegan Menu',
                    html: `
                        <div>
                        <h1>Nueva contraseña</h1>
                        <h2>Contraseña nueva: ${newPassword}</h2>
                        </div>
                    `
                }
                //enviamos el mail con la contraseña
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        res.json('¡Error al enviar los datos por mail! ' + err);
                    }
                    //Encriptamos el nuevo password
                    const hashNewPass = hashSync(newPassword, 10);

                    const sql = 'update Usuario set password = ? where mail = ?';
                    conn.query(sql, [hashNewPass, forgotPassemail], (err, result) => {
                        if (err) throw err; //Lanza excepciónde error
                        res.json(`Se ha enviado su nueva contraseña a ${forgotPassemail}`);
                    });

                })




            }
        })
    }

    //Confirmación de registro
    router.get('/reg_confirm', (req, res) => {
        const email = req.query.email; //Recogemos el mail por URL proveniente del link de confirmación de registro
        const token = req.query.token; //Recogemos el token por URL proveneinte del link de confirmación de registro
        //Comprobar que el token es el mismo del usuario que tiene en la DB
        const sql = 'select reg_token from Usuario where mail = ?';
        conn.query(sql, [email], (err, result) => {
            if (err) throw err; //Lanza excepciónde error
            if (result[0].reg_token === token) {
                const sql = 'update Usuario set reg_confirm = 1 where mail = ?';
                conn.query(sql, [email], (err, result) => {
                    if (err) throw err; //Lanza excepciónde error
                    const url_host = `${req.protocol}://${req.get('host')}`;
                    const url_link = `${url_host}/users`;
                    res.send(`<h3>Registro confirmado correctamente!</h3><a href="${url_link}">Volver</a>`)
                });
            } else {
                res.send(`<h3>Ha ocurrido un error con la confirmación de registro!</h3><a href="${url_link}">Volver</a>`);
            }
        });
        //Actualizar el campo(BOOLEAN) de la DB que confirma el registro por mail
    })

});

// SIGNIN (Login de usuario)
 router.post('/users/signIn', (req, res)=>{
    //Recoger los datos del form
    const signInEmail = req.body.signInEmail;
    const signInPass = req.body.signInPass;
    // Validar datos
    const email_regexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (signInEmail.length === 0){
        res.json('Rellena el campo Email');
    } else if (!email_regexp.test(signInEmail)) {
        res.json('Formato de Email incorrecto');
    } else { // Si el email esta validado conrrectamente
        const sql = 'select * from Usuario where mail = ?';
        conn.query(sql, [signInEmail], (err, result)=>{
            if (err) throw err; //Lanza excemoción de error
            if (result.length === 0){ //Email no registrado
                res.json('este Email no esta registrado!');
            } else{
                const sql = 'select * from Usuario where mail = ? and reg_confirm = ?';
                conn.query(sql, [signInEmail, true], (err, result) =>{
                    if(err) throw err; // excepción de error
                    if (result.length === 0){ //Registro no confirmado (token)
                        res.json('Registro no confirmado, por favor revise su correo electrónico');
                    } else { // encriptado de password + comprobación
                        const hashPassword = result[0].password;
                        const comparePasswords = compareSync(signInPass, hashPassword);
                        if (comparePasswords){ //Pass OK --> LOGIN CORRECTO!!!
                            //Iniciamos sesión
                            req.session.idUsuario = result[0].idUsuario;
                            req.session.nombreUsuario = result[0].nombre;
                            req.session.EmailUsuario = result[0].mail;
                            //Establecer la duración de la cookie del incio de sesión
                            req.session.cookie.maxAge = 1 * 24 * 60 * 60 * 1000; // 1 dia (1d/24h/60m/60s/1000ms)
                            res.json('Datos de entrada correctos!');
                        } else {
                            res.json('Contraseña incorrecta!');
                        }
                    }
                });
            }
        });

    }
});

//Cerrar Sesión
router.get('/logout', (req, res) =>{
    req.session.destroy();
    res.redirect('/');
})

export default router;