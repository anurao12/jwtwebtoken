const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'welcome to the api'
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    //verify the token with secretkey
    jwt.verify(req.token, 'secretKey', (err, authData) =>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'post created....',
                authData
            });
        }
    });
});

app.post('/api/login', (req, res) => {
    //mock user
    const user = {
        id: 1,
        userName: 'anu',
        email: 'anu@gmail.com'
    }
    //generate the token with secretkey
    jwt.sign({ user }, 'secretKey', {expiresIn: '30s'}, (err, token) => {               
        res.json({
            token
        });
    });
});

//middleware function to add headers and for verification
//verifyToken

//format of Token
//authorization: bearer <accessToken>

function verifyToken(req, res, next){
const bearerHeader = req.headers['authorization'];
// check if bearer is undefined
if(typeof bearerHeader!=='undefined'){
    //split at the space
    const bearer = bearerHeader.split(' ');
    // get the token from an array
    const bearerToken = bearer[1];
    //set the token
    req.token = bearerToken;
    next();
}
else {
    res.sendStatus(403);
    }
}


app.listen(5000, () => console.log('server is connected on port 5000'));
 
//commands which i followed to code this.
//npm init 
//npm install express jsonwebtoken
//npm install -g nodemon
//touch index.js
//code index.js
