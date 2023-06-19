//安装ws
import ws from 'ws'

//创建ws服务8080端口
const wss = new ws.Server({ port: 8080 }, () => {
    console.log('ws server is listening on 8080')
})

const state = {
    HEART: 1,
    MESSAGE: 2
}
//监听客户端的连接
wss.on('connection', (socket) => {
    console.log('one client is connected')
    socket.on('message', (e) => {
        //e是一个Buffer  -->  string
        // console.log(e.toString());
        //广播给所有的客户端
        wss.clients.forEach((client) => {
            client.send(JSON.stringify({
                type: state.MESSAGE,
                message: e.toString()
            }))
        })
    })
    //socket长时间不使用 网络波动 弱网模式 会断开连接
    //心跳检测 进行保活 保持连接
    let heartBeatTimer: any = null
    const heartCheck = () => {
        if (socket.readyState === ws.OPEN) {
            socket.send(JSON.stringify({
                type: state.HEART,
                message: '心跳检测'
            }))
        } else {
            clearInterval(heartBeatTimer)
        }
    }
    heartBeatTimer = setInterval(heartCheck, 1000)
})