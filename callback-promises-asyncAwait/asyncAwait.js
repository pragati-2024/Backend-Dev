//asyncAwait function 
function login(callback){
    return new Promise ((resolve,reject)=>{
        setTimeout(()=>{
            console.log("Login");
            resolve();
        },2000);
    });
}
function UserDetails(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("UserDetails");
            resolve();
        },1000)
    });
}
//add more function 
function Password(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("Password");
            resolve();
        }
        ,1500);
    });
}
async function demo(){
    try{await login();
    await UserDetails();
    await Password();

    }catch(err){

    console.log("Error:",error);
    }
    
    console.log("all tasks done");
}
demo();

// create a task and call it using callback,
// promises then async await
