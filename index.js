const {app} = require('./app');
const connectDB = require('./db.js');
const config = require('./config.js');
const {initJobs}=require('./serveis/jobs.js')

const port = process.env.PORT || 5000;


connectDB();
initJobs()


app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
