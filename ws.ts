//安装ws
import ws from 'ws'

//创建ws服务8080端口
const wss = new ws.Server({ port: 8080 }, () => {
    console.log('ws server is listening on 8080')
})
//监听客户端的连接
wss.on('connection', (socket) => {
    socket.on('message', (e) => {
        //e是一个Buffer  -->  string
        console.log(e.toString());
        //广播给所有的客户端
        wss.clients.forEach((client) => {
            client.send(`serve to client: ${e.toString()}`)
        })
    })
})