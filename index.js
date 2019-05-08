var http = require('http')
var express = require('express')
var bodyParser = require ('body-parser')
var cors = require('cors')
const app = express()

var routes = require('./routes/routes')

/*var connectionPool      =    mysql.createPool({
    connectionLimit : 100, 
    host     : dbConfig.HOST_NAME,
    user     : dbConfig.DB_USER,
    password : dbConfig.DB_PASSWORD,
    database : dbConfig.DB_NAME,
    debug    :  false
});*/

//This will be move to Db service 
/*connectionPool.getConnection((err,connection) => { 
    if (err) {
        console.log("Error in Connection:" + err)
        return
    }
    console.log("Connection:" +connection.threadId)
}); */
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

routes(app)
app.listen(3000, () => {
    console.log(`server running on port 3000`)
  });