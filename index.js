 const express =require("express")
 const multer=require("multer")
 const fs=require("node:fs")
// import express from "express"
// import multer from "multer"

const {createPool}=require("mysql2/promise.js")
// import { createPool } from "mysql2/promise";

const poll=createPool({
    host:"192.99.207.151"
    ,
    user:"corladic_cham800",
    password:"@mysql12",
    database:"corladic_cham800"
})



// import { poll } from "./db.js"
const upload=multer({dest:"uploads/"})










const app=express()




// app.use((req, res, next) => {
//     res.setTimeout(60000, () => { // Establece el tiempo de espera en 60 segundos (60000 milisegundos)
//       res.status(408).send('Tiempo de espera agotado');
//     });
//     next();
//   });



app.use(express.json())
app.post("/enviar",upload.single("imagenPerfil"),(req,res)=>{
console.log(req.file)
saveImage(req.file)
    res.send("termina")

})




app.post("/enviar/muchos",upload.array("imagenes",5),async (req,res)=>{


    const {name,count,area}=req.body


 

    const[rows]=await poll.query("INSERT INTO request (name,count,area) VALUES (?,?,?)",[name,count,area])




    req.files.map(saveImage)
    res.send({
  
        name,
        count,area,
        // img:req.file?.originalname
       })
})


function saveImage(file){
// const newPath=`./uploads/${file.originalname}${Math.floor(Math.random()*100)}`
const newPath=`./uploads/${file.originalname}`
fs.renameSync(file.path,newPath)
return newPath
}





app.get("/",async(req,res)=>{

    //  req.setTimeout(60000);


     const [rows]=await poll.query('SELECT * FROM request')
 res.json(rows)
    


// res.send("sssssssdskdnsnsnj")
    })



app.listen(3000,()=>{
    console.log("servidor puerto 3000")
})