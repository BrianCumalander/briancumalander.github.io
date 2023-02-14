
const breakfastPromise = new Promise((resolve, reject) => {
    // First, we set up a new promise with the promise constructor
    // basics of setting up a Promis, needs (resolve, reject)...setTimeout...3000ms
    // this function will either return resolve, pending, or rejected.
    setTimeout(() => {
        if (order) {
            // resolve('You order is ready, come and get it!');
            onResolve();
        } else {
            // reject('Oh no! We dropped your biscuits on the floor.');
            onReject();
        }
    }, 1000);
});

// console.log(breakfastPromise);
// //for readability, the return of the promise can be broken down in to 2/3 lines as below:
// breakfastPromise
//     .then(val => console.log(val))
//     .catch(err => console.log(err))

function onResolve() {
    console.log('You order is ready, come and get it!');
}

function onReject() {
    console.log(Error('Oh no! We dropped your biscuits on the floor.'))
}

const order = true;
breakfastPromise
    .then(onResolve)
    .catch(onReject)


/* ----------------------------- = --------------------------------- */

function addFive(n) {
    return n + 5;
}
function double(n) {
    return n * 2;
}
function finalValue(nextValue) {
    console.log(`The final value is ${nextValue}`);
}

const mathPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve promise if 'value' is a number; otherwise, reject it
        if (typeof value === 'number') {
            resolve(value);
        } else {
            reject('You must specify a number as the value.')
        }
    }, 1000);
});

const value = 5;    // the promise sequence will pass values down the chain from one then() call to the other, unless there's an error
mathPromise
    .then(addFive)
    .then(double)
    .then(finalValue)
    .catch(err => console.log(err))
// The final value is 20