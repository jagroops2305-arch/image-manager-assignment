const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const publicDir = path.join(__dirname,'public');
app.use(express.static(publicDir));
const upload = multer({ dest: path.join(__dirname,'uploads') });
app.get('/api/getImage', (req,res)=>{
  const name = (req.query.name||'').toLowerCase();
  if(!name) return res.status(400).json({error:'name required'});
  const files = fs.readdirSync(publicDir);
  const found = files.find(f => path.parse(f).name.toLowerCase() === name);
  if(found) return res.json({filename:found, url:/});
  return res.status(404).json({error:'not found'});
});
app.post('/api/upload', upload.single('file'), (req,res)=>{
  const name = (req.query.name||'').toLowerCase();
  if(!name) return res.status(400).json({error:'name required'});
  if(!req.file) return res.status(400).json({error:'file required'});
  const ext = path.extname(req.file.originalname) || '.jpg';
  const dest = path.join(publicDir, ${name});
  fs.copyFileSync(req.file.path, dest);
  fs.unlinkSync(req.file.path);
  return res.json({success:true, filename:${name}, url:/});
});
app.listen(3001, ()=>console.log('backend listening on 3001'));
