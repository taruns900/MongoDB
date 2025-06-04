const mongoose = require('mongoose');
const express = require('express');
const connectDB = require('./db');

const app = express();
const path = require('path');
const userModel = require('./models/user');

//body parser
app.use(express.json());
//connect to database
connectDB();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.render("index")
});

app.get('/read', async (req, res) => {
    let users = await userModel.find();
    res.render("read", { users });
});

app.get('/delete/:id', async (req, res) => {
    await userModel.findOneAndDelete({ _id: req.params.id });
    let users = await userModel.find();
    res.render("read", { users });
});

app.post('/create', async (req, res) => {
    let {name, email, image} = req.body;
    await userModel.create({ name, email, image }); // ✅ Add await
    res.redirect("/read");
});


app.listen(8080);

