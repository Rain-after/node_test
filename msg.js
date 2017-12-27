var optPool = require('./optPool');
var optpool = new optPool();
var pool = optpool.getPool();

function push(msg) {
    //从连接池中获取一个连接
    pool.getConnection(function (err, connect) {   //如果操作成功就拿到连接（connect）
        //做一个插入操作
        var userAddSql = "insert into msg (uname,message) values(?,?)";
        var param = ["rain", msg];
        connect.query(userAddSql, param, function (err, rs) {    //异步操作
            if (err) {
                console.log("insert err:", err.message);
                return;
            }
            console.log('success');
            connect.release()   //将连接放回连接池
        });
    });
}
module.exports = push;