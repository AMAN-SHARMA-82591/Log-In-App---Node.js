const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SignUpUsers = [];

app.get('/', (req, res) => {
    res.redirect('/login');
})

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
})

app.post('/login', (req, res) => {
    let FoundUser = SignUpUsers.find((user) => user.email === req.body.email);
    if(FoundUser) {
        if(FoundUser.Password !== req.body.Password) {
            res.redirect('/login');
        }else {
            res.send('Logged In!!');
        }
    }
    else {
        res.redirect('/login');
    }
})

app.post('/register', (req, res) => {
    if(!SignUpUsers.find((user) => req.body.email === user.email)) {
        SignUpUsers.push(req.body);
    }
    res.redirect('/login');
})

app.get('/users', (req, res) => {
    res.json(SignUpUsers);
})

app.listen(5000, (req, res) => {
    console.log('Server is listening');
})