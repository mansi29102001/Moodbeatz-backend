const express = require('express');
const register = require('../models/registeration');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUser = (req, res, next) => {
    register.findOne({ email: req.body.email })
        .exec()
        .then(newLogin => {
            if (!newLogin) {
                return res.status(404).json({
                    message: 'User not registered'
                })
            }
            bcrypt.compare(req.body.password, newLogin.password, function (err, result) {
                if (err) {
                    res.status(401).json({
                        message: 'Login failed'
                    });
                }
                if (result) {
                    
                    return res.status(200).json({
                        message: 'Login Successfull !!',
                        
                    })
                }
                res.status(401).json({
                    message: 'Login Failed'
                });
            })
        })
        .catch( err => {
            res.send(err)
        })
}