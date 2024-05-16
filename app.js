const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
const router = require('./router/v1');
app.use(cors());
app.use(helmet());
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use('/api/v1', router);
app.get('/',(req,res)=>res.send('Hola mundo'))

module.exports={app}