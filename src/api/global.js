/***
 * websocket实时更新
 * @param ws    ws
 * @param send  type: string
 * @param onmessage type: function
 * @param onclose   type: function
 * @param overtime   type: function  连接超时后的回调
 * @param duration   websocket连接时长  type: number(秒)    default: infinite
 */
function wSocket({
                     ws = null,
                     send = null,
                     onmessage = (e) => {},
                     onclose = (e) => {},
                     overtime = (msg = "The socket closed") => {console.log(msg)},
                     duration = "infinite",
                     onopen = (e) => {},
                 }) {
    // if (!!ws) return;

    // 创建一个Socket实例
    let socket = new WebSocket(`ws://${ws}`);
    // 打开Socket
    socket.onopen = onopen;

    if (send === null){
        // 发送一个初始化消息
        // socket.send(send);
    }
    // 监听消息
    socket.onmessage = onmessage;

    // 监听Socket的关闭
    socket.onclose = onclose;
    //关闭Socket
    window.onbeforeunload = function(event) {
        // 关闭Socket....
        socket.close();
    };
    if (duration !== "infinite"){
        if (typeof duration === "number"){
            setTimeout(function () {
                // 关闭Socket....
                socket.close();
                overtime();
            }, duration * 1000);
        }else {
            console.error(`TypeError: ${duration} is not a number`);
        }
    }

}



export default {
    wSocket
};

