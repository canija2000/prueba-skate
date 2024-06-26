const path = require('path');
const express = require('express');
const jwt = require('jsonwebtoken');
const { getSkaters, insertSkater,authUser, findSkater, updateSkater} = require('../querys/queries');

const home = async (req, res) => {
    try{
        let skaters = await getSkaters(req, res);
        res.render('index',{ skaters: skaters });
    }
    catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

const login = (req, res) => {
    res.render('login');
}

const signup = (req, res) => {
    res.render('signup');
}

const register = (req, res) => {
    const {nombre, email,exp,espc,pass} = req.body;
    const file = req.files.file;
    const date = Date.now();
    const filename = `${nombre}_${date}`
    

    file.mv(`public/imgs/${filename}.jpg`, (err) => {
        if(err) return res.status(500).send('Internal Server Error');

        insertSkater(email,nombre,pass,exp,espc,`${filename}.jpg`)


    }
    );

    res.status(200).send('Skater registrado con éxito');
}

const verifyUser = async (req, res) => {
    const {email, password} = req.body;
    const response = await authUser(email,password);
  
        if(response == true){
            const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '1h'});
            res.cookie('jwt', `Bearer ${token}`);
            const  user = await findSkater(email);
            res.status(200).render('panel', {user: user});

        }
        else{
            res.status(401).send('Usuario no autorizado');
        }

    }
    
// const verifyToken = (req, res, next) => {
//     //recuperar token
//     const token = req.cookies.jwt;
//     //const token = req.headers.authorization.split(' ')[1];
//     console.log(token);
//     if(!token){
//         return res.status(401).send('Usuario no autorizado');
//     }
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if(err){
//             return res.status(403).send('Usuario no autorizado');
//         }
//         const email = decoded.email;
//         next();
//     });
// }


//entrando al panel
// const editUser = async(req, res) => {

//     const tok = req.cookies.jwt;
//     const token = tok.split(' ')[1];
//     //const token = req.headers.authorization.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const email = decoded.email;
//     try{
//         const user = await findSkater(email);
//         res.render('panel', {user: user});
//     }catch(error){
//         console.log(error);
//         res.status(500).send('Internal Server Error');
//     }  
// }


//cambiando el panel

const changeUser = async(req, res) => {

    const tok = req.cookies.jwt;
    const token = tok.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    const {nombre, password, exp, espc} = req.body;

    try{
        const user = await updateSkater(email,nombre,password,exp,espc);
        if(user == undefined){
            res.status(404).send('Usuario no encontrado');
        }
        else{
            res.status(200).send('Usuario actualizado con éxito');
        }
    }
    

    catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

const logout = (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
}





module.exports = {home, login, signup, register, verifyUser , changeUser,logout};
