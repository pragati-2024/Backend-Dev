// promises.js

// LOGIN FUNCTION (returns Promise)
function login() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Login successful");
            resolve("User logged in");
        }, 2000);
    });
}

// USER DETAIL FUNCTION (returns Promise)
function userDetail() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("User details fetched");
            resolve("User details");
        }, 2000);
    });
}

// ASYNC / AWAIT FUNCTION
async function demo() {
    try {
        await login();        // pehle login hoga
        await userDetail();  // phir user detail aayegi
        console.log("All tasks completed");
    } catch (error) {
        console.log("Error:", error);
    }
}

// FUNCTION CALL
demo();
