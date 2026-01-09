// // callback function
// function task1(callback) {
//     setTimeout(() => {
//         console.log("Task 1 completed");
//         callback();
//     }, 1000);
// }

// function task2(callback) {
//     setTimeout(() => {
//         console.log("Task 2 completed");
//         callback();
//     }, 2000);
// }

// function task3(callback) {
//     setTimeout(() => {
//         console.log("Task 3 completed");
//         callback();
//     }, 3000);
// }

// // execution
// task1(() => {
//     task2(() => {
//         task3(() => {
//             console.log("All tasks done using Callbacks");
//         });
//     });
// });

// PROMISES *****************************************************************

// function task1() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("Task 1 completed");
//             resolve();
//         }, 1000);
//     });
// }

// function task2() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("Task 2 completed");
//             resolve();
//         }, 2000);
//     });
// }

// function task3() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("Task 3 completed");
//             resolve();
//         }, 3000);
//     });
// }

// // execution
// task1()
//     .then(task2)
//     .then(task3)
//     .then(() => {
//         console.log("All tasks done using Promises");
//     });


// ASYNC AND AWAIT*******************************************************************
// function task1() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("Task 1 completed");
//             resolve();
//         }, 1000);
//     });
// }

// function task2() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("Task 2 completed");
//             resolve();
//         }, 2000);
//     });
// }

// function task3() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("Task 3 completed");
//             resolve();
//         }, 3000);
//     });
// }

// // execution
// async function runTasks() {
//     await task1();
//     await task2();
//     await task3();
//     console.log("All tasks done using Async/Await");
// }

// runTasks();
