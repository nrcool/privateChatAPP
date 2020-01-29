const express=require("express")
const app=express();
const iosocket=require("socket.io")
app.use(express.json())

let server= app.listen(4000,()=>console.log("running server on port 4000"))


let io = iosocket(server)

let users=[]
io.on("connection",(socket)=>{
    console.log("server connected")
    console.log(socket.id)
    socket.on("initial",(data)=>{
        let name=data.username;
        let user= {[name]:socket.id}
        users.push(user)
        console.log(users)
    })
    socket.on("pmsj",data=>{
        console.log(data)
        users.map(user=>{
            console.log([user])
            if(Object.keys(user).includes(data.user)){
                console.log("testing .....",user[data.user])
                 io.to(`${user[data.user]}`).emit('pmsj', {msj:data.msj})
            }
        })
           
       
    })
  
})



