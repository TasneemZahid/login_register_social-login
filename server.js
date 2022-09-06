const express = require('express');
const { register, verify , login, social, logout} = require('./controller');
const app = express();
// const dotenv = require('dotenv');
// dotenv.config({ path: "./.env"});
var cookieParser = require('cookie-parser');

app.use(cookieParser());
const PORT = 5000;
 
app.use(express.json());

    
app.post('/register', register)
app.post('/verify', verify)
app.post('/login', login)
app.get('/social', social)
app.post('/logout', logout)
  
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});