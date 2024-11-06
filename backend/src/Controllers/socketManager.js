import { Server } from "socket.io";

let  connections = {}
let messages = {}
let timeOnline = {}


const connectToSocket = (server) => {
  const io = new Server(server);

  io.on('connection', (socket)=>{
    socket.on("accept-call", (path)=>{
      
    })
  })
  return io;
};

export default connectToSocket;
