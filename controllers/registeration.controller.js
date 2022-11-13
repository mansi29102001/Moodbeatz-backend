const express = require('express');
const register = require('../models/registeration');
const bcrypt = require("bcrypt");
const validator = require('validator');
const nodemailer = require('nodemailer');

exports.registerUser = (req,res, next) => {
    register.find({email: req.body.email})
    .exec()
    .then((user) => {
        if(user.length >= 1){
            return res.status(409).json({
                message: "Mail already exists",
            });
        }
        else{
            if(!validator.isEmail(req.body.email)){
                return res.status(404).json({
                    message: "Invalid email"
                })
            }
            
            if (!validator.isStrongPassword(req.body.password)) {
                return res.status(411).json({
                    message: "Please Enter Strong Pasword"
                })
            }

            bcrypt.hash(req.body.password, 10, (err, hash) => {
                const details  = new register({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phnNo: req.body.phnNo,
                    email: req.body.email,
                    loginId: req.body.loginId,
                    password: hash
                });
                details
                .save()
                .then(result => {
                    
                    
                        res.status(200).json({
                            message: 'User Registered successfully'
                        })
                    
                   
                    
                })
                .catch((err) => {
                    res.status(404).json({
                        message: err
                    })
                })
            })
            
        }
    })
    .catch(err => {
        res.send(err)
    })
    
    
    
}