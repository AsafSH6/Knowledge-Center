/*
 configuration details:
 mongoDB_connection_string: the connection string of mongo DB server
 secret_key: read https://www.npmjs.com/package/express-session#secret
 email: nodemailer transport info. for example: {service: "Gmail", auth: {user: "user@gmail.com", pass: "123456"}} for more information read https://nodemailer.com/
 host: http(s)://(ip/url):port
 */

module.exports = {
    mongoDB_connection_string: 'mongodb://admin:admin@ds019498.mlab.com:19498/knowledge-center',
    secret_key: 'knowledge center',
    email: false,
    //host: 'http://localhost:5000'
    host: 'https://knowledge-center.herokuapp.com/'
}