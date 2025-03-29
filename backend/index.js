import { startDB } from './db.js';
const express = require('express');
const app = express();

startDB().catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hello world')
})

app.post('/message', (req, res) => {
  const body = req.body;
  console.log(body);
  res.send("check")
})

app.listen(4000, () => {
  console.log('Server is running on port 4000')
})
