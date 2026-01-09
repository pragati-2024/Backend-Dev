function fetchDataPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data fetched using Promise");
        }, 2000);
    });
}

// Calling the function
fetchDataPromise()
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    });
