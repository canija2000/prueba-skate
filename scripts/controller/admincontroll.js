const path = require('path');
const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { getSkaters, findSkater, updateSkater, updateEstado} = require('../querys/queries');



const logAdmin = (req, res) => {
    res.render('adminlog');
}


const verifyAdmin = async (req, res) => {
    const {user, password} = req.body;
    //read JSON file with admin data
    const data = fs.readFileSync(path.join(__dirname, '../../config/admins.json'));
    const jsondata = JSON.parse(data);
    const admins = jsondata.admins;
    let response = false;
    const skaters = await getSkaters();
    //compare data with admin data
    for(let i = 0; i < admins.length; i++){
        if(admins[i].name == user && admins[i].pass == password){
            response = true;
            break;
        }
    }
    if(response == true){
        const token = jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.cookie('jwt', `Bearer ${token}`);
        res.status(200).render('panelAdmin',{skaters: skaters})
    }
    else{
        res.status(401).send('Admin no autorizado');
    }
}


const Aprobar = async (req, res) => {
    const {email} = req.body;
    try {
        const skater = await findSkater(email);
        if(skater.estado == false){
            await updateEstado(email);
            const skaters = await getSkaters();
            res.status(200)
            res.render('panelAdmin',{skaters: skaters});
        }
        
    }
    catch (error) {
        console.log(error);
    }
    
}

module.exports = {logAdmin, verifyAdmin, Aprobar};
