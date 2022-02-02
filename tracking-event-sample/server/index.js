const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require('request');

dotenv.config();

const PORT = process.env.PORT|| 5000;
const app = express();
const API_URL = 'https://bps.bringer.dev/public/api/v2/get/parcel/tracking.json';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2MDM5MTYyMDAsImV4cCI6MTYzNTQ1MjIwMCwiYXVkIjoiaHR0cHM6Ly9icmluZ2VycGFyY2VsLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNTI1eXM2YWh4d3UyIiwianRpIjoiOGFiYWY3ZGQtYmQ0NS00NzcyLWJhMGQtNDBkMTMwMWI4NDY0In0.I0R5iJOLUASXmelc7dQ6pcEKstIPYwjTkcHvLu4IRk'

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

app.get("/data/:trackingId", (req, res) => { 
  try {
        const trackingId = req.params.trackingId;
        request({
            url: API_URL + `?tracking_number=${trackingId}`,
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            },
            rejectUnauthorized: false
            }, function(err, resp) {
                if(err) {
                    console.error(err);
                } else {
                    // console.log(resp.body);
                    res.status(200).json(resp.body);
                }
        });
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
});

app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));