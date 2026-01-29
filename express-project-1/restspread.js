import express from 'express'
const app = express();
// rest spread
const emp={
    id:1,
    name:"Rakesh",
    salary:"12424242",
    address:"delhi",
    age:25,
    department:"HR"
}
const updatecity = {...emp,address:"banglore"};
// best tarika above wala
// const updatecity = {...emp};
// updatecity.address="mumbai";
// console.log(updatecity)
// sara data copy hojayega
// spread
const empCopy = {...emp}
// sirf id name salary chahhie
// rest
const {id,name,salary,...otherinfo}=emp;
console.log(otherinfo)
console.log(empCopy)