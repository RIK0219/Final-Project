const mongoose= require('mongoose')
// const url= "mongodb://127.0.0.1:27017/apartmenthouse"
const LiveUrl = "mongodb+srv://rinkeshjha2222:Rinkesh321@cluster0.u1aviog.mongodb.net/apartmenthouse?retryWrites=true&w=majority&appName=Cluster0"
const connectdb=()=>{
    return mongoose.connect(LiveUrl)
    .then(()=>{
        console.log("Connected Succeessfully")
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports=connectdb