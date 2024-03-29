const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const path = require('path');

const db = require('./db');
const collection = "todo";

db.connect((err)=>{
    if(err){
        console.log(`Unable to connect to database`);
        process.exit(1);
    }
    else{
        app.listen(7000, ()=>{
            console.log(`connected to database, app listening on port 7000`);
        });
    }
});

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/getTodos', (req, res)=>{
    db.getDB().collection(collection).find({}).toArray((err, documents)=>{
        if(err)
            console.log(err);
        else{
            console.log(documents);
            res.json(documents);
        }
    })
})