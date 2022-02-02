const express = require('express');
const dotenv = require('dotenv');
const jwt = require('njwt');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const PORT = process.env.PORT|| 5000;
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.get("/", (req, res) => { 
  try {
      var hello = "Hello";             
      res.status(200).json(hello);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
});

app.get("/token", (req, res) => { 
  try {
      const payload = {
          iss: 'jwt-sample', 
          sub: 'sample'
      }
      const token = jwt.create(payload, process.env.TOKEN_SECRET)
      token.setExpiration(new Date().getTime() + 60*1000)                
      res.status(200).json(token.compact());
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
});

app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));