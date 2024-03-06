let mysql=require('mysql')
let connection = mysql.createConnection({
    host:           'localhost',
    user:           'root',
    password:       '',
    database:       'db_express_basic',
});
connection.connect(function(eror){
    if(eror){
        console.log(eror);
    }
    else{
        console.log('Berhasil terhubung ke database')
    }
})
module.exports = connection;