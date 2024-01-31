const app = require('./app');
const dotenv = require("dotenv");
const path = require("path");
const connectDatabase = require('./Config/database');

dotenv.config({path: path.join(__dirname,'./Config/config.env')});
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log( `My Server listenning to the port : ${process.env.PORT} in ${process.env.NODE_ENV}`);
})
