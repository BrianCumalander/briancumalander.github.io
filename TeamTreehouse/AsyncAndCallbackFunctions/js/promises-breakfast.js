const order = false;    //for testing only, creating ‘order’, setting to true or false, meaning resolve or reject.
const breakfastPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (order) {
            resolve('Your order is ready.Come and get it');
        } else {
            // reject(Error('Your order cannot be made.'));
            reject(Error('Your order cannot be made.'));
        }
    }, 1000);   // one second. 
});
console.log(breakfastPromise);
breakfastPromise
    .then(val => console.log(val))
    .catch(err => console.log(err));


    //running node promises-breakfast.js returns resolve or reject. On reject, it will return the 'stack trace' which
    // are several errors with specifiied errors when running the app.
