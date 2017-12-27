var mysql = require('mysql');
function optPool(){
    this.flag = true;
    this.pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: "",
        database: "rain",
        port: '3306'
    });
    this.getPool = function(){  //初始化pool
        if(this.flag){
            //监听connection事件
            this.pool.on('connection',function(connection){
                connection.query('SET SESSION auto_increment_increment=1');
                this.flag = false;
            });
        }
        return this.pool;
    }
};
module.exports = optPool;   //导出为一个类