import fs from "fs"


let logfun = (req,res,next)=>{
     
   let logText = `timestamp:${new Date().toISOString()} URL:${req.url} Method: ${req.method} \n`

   fs.appendFileSync("./log.txt", logText)

    console.log(logText)
    next()
}


const userValidation = (req,res,next)=>{
    const { username, password } = req.body;

     if (!username || !password) {
    return res.status(400).json({
      message: "username and password require",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "password strength is weak",
    });
  }
  next()
}

export {logfun, userValidation}