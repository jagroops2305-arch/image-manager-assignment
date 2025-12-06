const express = require('express');
const app = express();
app.use(express.static('public'));
app.get('/ping', (req,res)=> res.json({ok:true}));
app.listen(3001, ()=> console.log('backend listening 3001'));
