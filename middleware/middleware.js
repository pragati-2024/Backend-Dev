let logfun = (req,res,next)=>{
  let logText = `timestamp : ${new Date().toString()} url ${req.url}
  method ${req.method} \n`
  console.log(logText)
  fs.appendFileSync('./log.txt',logText);

  // loading state mae na fase isiliye
  next()
}
export default logfun;