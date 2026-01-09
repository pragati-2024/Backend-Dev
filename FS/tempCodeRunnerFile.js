fs.appendFile('./output.txt',"this is new onw",(err)=>{
    if(err) throw err
    console.log("text add successfully")

})