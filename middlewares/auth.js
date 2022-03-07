
 const debug = require('debug')('books:auth');
 const jwt = require('jsonwebtoken');
 const { user_model } = require('../models');

 /**
  * 
  * Validate JWT token
  * 
  */
 const validateJwtToken = (req, res, next) => {
     // make sure Authorization header exists, otherwise fail with (401)
     if (!req.headers.authorization) {
         debug("Authorization header missing");
 
         return res.status(401).send({
             status: 'fail',
             data: 'Authorization failed',
         });
     }
 
     // split authorization header
     const [authSchema, token] = req.headers.authorization.split(' ');
     if (authSchema.toLowerCase() !== "bearer") {
         return res.status(401).send({
             status: 'fail',
             data: 'Authorization failed',
         });
     }
 
     // verify token and save in user_model
     try {
         req.user_model = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
 
     } catch (error) {
         return res.status(401).send({
             status: 'fail',
             data: 'Authorization failed',
         });
     }
 
     next();
 }
 
 module.exports = {
     validateJwtToken,
 }