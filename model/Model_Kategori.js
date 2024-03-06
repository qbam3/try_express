const connection = require('../config/database');
class Model_Kategori{
    static async getAll(){
        return new Promise((resolve, reject) => {
            connection.query('select * from kategori order by id_kategori desc',function(err,rows){
                if(err){
                    reject(err);
                }
                else{
                    resolve(rows);
                }
            });  
        })
    }
}
module.exports=Model_Kategori;