import { Router } from "express";
const router = Router();

//RUTAS PÚBLICAS

// INDEX
router.get('/', (req, res) =>{
    res.render('index', {
        idUsuario: res.locals.idUsuario,
        pageName: 'index'
    });
})

// CONTACTO
router.get('/contacto', (req, res) =>{
    res.render('contacto', {
        idUsuario: res.locals.idUsuario,
        pageName: 'contacto'
    });
})

//USERS LOGIN/REGISTRET
router.get('/users', (req,res)=>{
    res.render('users',{
        idUsuario: res.locals.idUsuario,
        pageName: 'users'
    });
})

//Forgot Passwprd
router.get('/forgotPass', (req,res)=>{
    res.render('forgotPass', {
        idUsuario: res.locals.idUsuario
    });
})

//Manifesto
router.get('/manifesto', (req, res)=>{
    res.render('manifesto',{
        idUsuario: res.locals.idUsuario,
        pageName: 'manifesto'
    })
})


//RUTAS PRIVADAS O PROTEGIDAS
router.get('/tumenu', (req, res)=>{
    // res.render('tumenu',{
    //     idUsuario: res.locals.idUsuario,
    //     pageName: 'tumenu'
    // })

    if (req.session.idUsuario) {//Si existe la sesión
        res.render('tumenu',{
            idUsuario: res.locals.idUsuario,
            nombreUsuario: res.locals.nombreUsuario,
            pageName: 'tumenu'
        });
    } else{
        res.redirect('users');
    }
})

export default router;