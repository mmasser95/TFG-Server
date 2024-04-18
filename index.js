const {app} = require('./app');
const connectDB = require('./db.js');
const config = require('./config.js');



const port = process.env.PORT || 5000;

connectDB();

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
