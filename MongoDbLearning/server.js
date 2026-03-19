import connectDb from "./db.js";
import user from './model/userSchema.js'
connectDb();


// const createUser = async(name,email,password,role)=>{
//     try{
//         const newUser = await user.create({
//             name,email,password,role
//         });
//     }
//     catch(err){
//         console.log("user not created")
//     }
// }

// read krhe yahan
// const readUser = async()=>{
//     const result = await user.find();
//     console.log(result)
// }


const updateUser = async()=>{
    user.updateOne({name:"pragati"},{$set:{name:'akansha'}})
}


// const createUser = async()=>{
//     try{
// //yeh document hae hmaara
//         const newuser = await user.create([{
//             name:'Pragati Bansal',
//             email:'bpragati21@gmail.com',
//             password:'12345678',
//             role:'user'
//         },{
//             name:'Vamika Solanki',
//             email:'vamikasolanki@gmail.com',password:'99001345',role:'admin'
//         },{
//             name:'reshu Patel',
//             email:'reshupatel@gmail.com',password:'00112345',role:'user'
//         },{
//             name:'Ritika soni',
//             email:'ritikasoni@gmail.com',password:'00001345',role:'user'
//         },{
//             name:'Ashmita Agarwal',
//             email:'ashmitaagarwal@gmail.com',password:'99661345',role:'user'
//         }]) ;
        
//         console.log("user created successfully")
//     }
//     catch(error){
//         console.log('user not created',error)
//     }
// }
// createUser()
// createUser('raj','rag@gmail.com','12345567,"user');

//  readUser();