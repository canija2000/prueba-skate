const { get } = require('http');
const pool = require('../../config/db');
const express = require('express');

const getSkaters = async () => {
    try {
        const response = await pool.query('SELECT * FROM skaters');
        return response.rows;
    } catch (error) {
        console.log(error);
    }
}

const insertSkater = async(email,nombre,pass,exp,espc,filen) => {
    try {
        const response = await 
        pool.query('INSERT INTO skaters (email,nombre,password, anos_experiencia, especialidad,foto,estado) VALUES ($1, $2, $3, $4, $5, $6, $7)',
         [email,nombre,pass,exp, espc,filen,'false']);
       ;
    
        return response.rows;

    } catch (error) {
        console.log(error);
    }
}

const authUser = async(email,password) => {
    try {
        const response = await pool.query('SELECT * FROM skaters WHERE email = $1 AND password = $2',[email,password]);
        user = response.rows[0].email;
        if(user == email){
            return true
        }
        else{
        return false
        }
    } catch (error) {
        console.log(error);
    }
}


const findSkater = async(email) => {
    try {
        const response = await pool.query('SELECT * FROM skaters WHERE email = $1',[email]);
        return response.rows[0];
    } catch (error) {
        console.log(error);
    }
}


const updateSkater = async(email,nombre,pass,exp,espc,filen) => {
    try {
        const response = await 
        pool.query('UPDATE skaters SET nombre = $2, password = $3, anos_experiencia = $4, especialidad = $5, foto = $6 WHERE email = $1',
         [email,nombre,pass,exp, espc,filen]);
        return response.rows;
    } catch (error) {
        console.log(error);
    }
}
module.exports = { getSkaters, insertSkater, authUser, findSkater, updateSkater };

