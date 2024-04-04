const mongoose = require('mongoose');

const Connection = async() =>{
    
    await mongoose.connect('mongodb+srv://vikashmishra:xclZU6qRRZVJAMdT@cluster0.y2r2pc1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(()=>{console.log("connected to databasse")})
    .catch((err)=>console.log(err.message))

}

module.exports= Connection;