const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const router = require('./app/routes/recipes');
const fetchYoutube = require('./app/config/fetchYoutube');
const CronJob = require('cron').CronJob;

app.use(bodyParser.urlencoded({extend: true}));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;



router.use((req, res, next) => {
    console.log('something is happening');
    next();
});

app.use('/api', router);
app.listen(port);

const job = new CronJob({
    cronTime: '00 00 9 * * 1-7',
    onTick: fetchYoutube(),
    onComplete: () => {
        console.log('job stopped');
    },
    start: false,
    timeZone: 'America/Argentina/Cordoba'
});

job.start();

console.log('Serving on PORT: ', port);

mongoose.connect('mongodb://localhost:27017/recipes');

