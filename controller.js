const request = require("request");
const jwt = require('jsonwebtoken');
const apikey="9489e32b-da63-4b10-8884-6e2ef036e828"
const secret="766a33f2-8255-4969-97a1-ded22dc26149"
const sott="Lq3AyTNg1rCJuZLKY437eovxmzLRRajmHYELVSWuSAfqNTeiNLC52NrJqq21eZ8Wzdul+3LedDyMukZiRL7YUrGeQjQeTNJOLT9qvYWTtBE=*f569ab155058c04a330ebd7f8ca678b4"
const secretkey="thisIsMySecret12345"
const bearer=" f3aeb9f7-9511-4b2e-820d-8c28949a17ab"

const register = (req, res) => {
    const { email, password } = req.body
    const options = {
        method: 'POST',
        url: 'https://api.loginradius.com/identity/v2/auth/register',
        qs: { "apikey": apikey, "verificationurl": "https://api.loginradius.com/identity/v2/auth/email", "emailtemplate": "", "welcomeemailtemplate": "", "options": "" },
        headers: { "content-Type": "application/json", "X-LoginRadius-Sott": sott },
        body: {
            "Email": [
                {
                    "Type": "Primary",
                    "Value": email
                }
            ],
            "Password": password,
            
        },
        json: true,
    };
    request(options, function (error, response, body) {
        res.json(body);
    });

}

const verify = (req, res)=>{
    const { email } = req.body
    const options = {
        method: 'POST',
        url: 'https://api.loginradius.com/identity/v2/manage/account/verify/token',
        qs: {"apikey":apikey,"apisecret":secret},
        headers: {"content-Type":"application/json"},
        body: {
      "email": email
    },
        json: true,
    };
    request(options, function (error, response, body) {
        const options = {
            method: 'GET',
            url: 'https://api.loginradius.com/identity/v2/auth/email',
            qs: {"apikey":apikey,"verificationtoken": body.VerificationToken ,"welcomeemailtemplate":"","url":""},
            headers: {"content-Type":"application/x-www-form-urlencoded"},
            json: true,
        };
        request(options, function (error, response, body) {
            res.json(body);
        });
    });
   
}

const login = (req, res)=>{
    const { email, password } = req.body
    const options = {
    method: 'POST',
    url: 'https://api.loginradius.com/identity/v2/auth/login',
    qs: {"apikey":apikey,"verificationurl":"","loginurl":"","emailtemplate":"","g-recaptcha-response":""},
    headers: {"content-Type":"application/json"},
    body: {
  "email": email,
  "password": password,
   
},
    json: true,
};
console.log(apikey)
request(options, function (error, response, body) {
    const token = jwt.sign(body, secretkey);
    res.cookie('userdata', token);
    res.json({ body, token}) 
});
}

const social = (req, res)=>{
const options = {
    method: 'GET',
    url: 'https://api.loginradius.com/identity/v2/auth/account',
    qs: {"apikey": apikey,"access_token":bearer},
    headers: {"content-Type":"application/x-www-form-urlencoded","Authorization":`Bearer ${bearer}`},
    json : true
};
request(options, function (error, response, body) {
    res.json(body);
});

}

const logout = (req, res)=>{
    res.clearCookie('userdata')
    res.send('logout successfully')
}

module.exports = { register, verify , login , social, logout}