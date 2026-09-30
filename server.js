const fs=require('fs/promises')
const path=require('path')
const express=require('express');
const { promises } = require('dns');
const app=express()
const port=3000;


const filepath=path.join(__dirname,"db.json")

async function readData(){
    let data=await fs.readFile(filepath,"utf8")
    return JSON.parse(data)
}

async function delayReadData(){
    await new promise((res,rej)=>{

    setTimeout(resolve,1500);

    })
    
    return await readData()
}
app.get('/products',async (req,res)=>{
    let products=await readData()
    res.json(products)

})

app.get('/products/:id',async (req,res)=>{
    try{
    let id = Number(req.params.id)
    let products=await readData()
    let data=products.find((item)=>item.id===id)
    res.json(data)
    }catch(err){
        console.log(err)
    }

})


app.listen(port,()=>{
    console.log("Server running...")
})