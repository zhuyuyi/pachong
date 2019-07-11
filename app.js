const http = require('http');
const mongoose = require('mongoose');
const {
    timeout,
} = require('./reptiles/cbgReptile');

mongoose.connect('mongodb://127.0.0.1:27017/zyy', {
    useNewUrlParser: true
});
mongoose.connection.on("connected", () => {
    console.log("MongoDB连接成功")
});
mongoose.connection.on("error", () => {
    console.log("MongoDB连接失败")
});
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB断开连接")
});

// 启动服务，为了持久化抓取数据
http.createServer((req, res) => {
    res.end('爬虫开始...');
}).listen(5000, () => {
    console.log('正在监听5000端口')
});

// 爬虫开始 4000 为 定时器时间
timeout(4000).catch((err) => {
    console.log(err)
})