import connectDb from "./db.js";
import user from './model/userSchema.js'
import product from'./model/productSchema.js'
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


// const updateUser = async()=>{
//     user.updateOne({name:"pragati"},{$set:{name:'akansha'}})
// }

// const deleteUser = async(id)=>{
//         try{
//             const result = await user.findByIdAndDelete(id);
//             console.log(`Deleted user ${result}`);
//         }
//         catch(error){
//             console.log("user cannot be delted",error)
//         }
// }


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
// deleteUser();



// const findAllProducts = async()=>{
//     try{
//         const result  = await product.find({name:'bottle'}).populate('userid');
//         console.log("hee=llo",result);

//     }
//     catch(error){
//         console.log("not ")
//     }
// }
// findAllProducts()
// const createProduct = async()=>{
//     try{
//         const newProduct  = await product.create({
//             name: 'bottle',
//             category: 'Accessories',
//             price: 90,
//             stock: 55,
//             userid:'69bb76436d142c6a9c2a9a4f',
//             specs: { resolution: '1080p' },
//             tags: [ 'work', 'streaming' ]
//         })
//         console.log(newProduct)
        
//     }
//     // command to run->db.products.find({name:"Webcam newOne"})
//     catch(error){
//         console.log(error)
//     }
// }
// createProduct()

// const productCount = async()=>{
//     const result = await product.aggregate([
//         // $-> calleed operator
//         {$match:{category:"Accessories"}},
//         {$count:"total count"}
//     ])
//     console.log(result)
// }
// productCount()

// 2. high value filter
// pipeline first step match krna
const highValue = async()=>{
    const result = await product.aggregate([
        {$match:{price:{$gte:100}}},
        {$sort:{price:-1}},
        {$limit:5},
        //projection hae isme like select kre id ni ayega  name and price ayega
        {$project:{_id:0,name:1,price:1}}
    ])
    console.log(result)
}

highValue()
// we are now using populate method

// list all unique categories in database
// use $group and set_id to the category
const allCategory = async()=>{
    const result = await product.aggregate([
        {$group:{_id:"$category"}}
    ])
    console.log(result)

}
allCategory()

// tag counter
// count how many product