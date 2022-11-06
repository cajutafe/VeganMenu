import { Router } from "express";
const router = Router();
// NODEMAILER
import nodemailer from 'nodemailer'; 

// CONTACTO
router.post('/contacto/emailSend', (req, res) =>{
    // Recogemos los datos
    const nombre = req.body.nombre;
    const email = req.body.email;
    const mensaje = req.body.mensaje;

    // 1- Validamos los datos en servidor
    const email_regexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if(nombre.length === 0){
        res.json('Rellena el campo nombre');
    } else if(nombre.length < 1 || nombre.length > 20){
        res.json('Campo nombre con formato incorrecto');
    } else if(email.length === 0){
        res.json('Rellena el campo email');
    } else if(!email_regexp.test(email)){
        res.json('Campo email con formato incorrecto');
    } else if(mensaje.length === 0){
        res.json('Rellena el campo mensaje');
    } else if(mensaje.length < 10 || mensaje.length > 100){
        res.json('Campo mensaje con formato incorrecto');
    } else{
        // 2- Datos validados correctamente, enviamos email al admin de la app.
        const transporter = nodemailer.createTransport("SMTP",{
            service: 'hotmail',
            auth: {
                user: 'crochetmania-bcn@outlook.es',
                pass: 'netmind22'
            }
        })

        const mailOptions = {
            from: 'crochetmania-bcn@outlook.es',
            to: 'crochetmania-bcn@outlook.es',
            subject: 'Email enviado con Nodemailer desde el formulario de contacto',
            html: `
                <div>
                <h1>Datos de Formulario de contacto</h1>
                <h2>Nombre: ${nombre}</h2>
                <h2>Email: ${email}</h2>
                <h2>Mensaje:</h2> <p>${mensaje}</p>
                </div>
            `
        }
        // 3- Si el email se ha enviado correctamente, se devuelve mensaje al navegador
        transporter.sendMail(mailOptions, (err, info) =>{
            if (err){
                res.json('¡Error al enviar los datos! ' + err);
            }
            res.json('¡Mensaje enviado correctamente!');
        })
    }
    
});

export default router