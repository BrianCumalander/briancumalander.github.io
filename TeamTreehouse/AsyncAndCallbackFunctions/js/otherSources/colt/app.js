/*  PROMISES USING ASYNC / AWAIT */ 

 //   -simply by putting 'async' in front of the function, creates a promise.
// async function hello() { 
// }




/*
// -Works with arrow functions too:
const sing = async () => {
    return 'La La La La'
}

// - Returning the promise:
sing()
    .then((data) => { //calling this .then 'data'
        throw('oooo') //--manually throwing an error to show the .catch working below
        console.log('promise resolved with: ', data)
    })

    // reject a promise by throwing an error, of course ;0
    .catch(err => {
        console.log("Oh no, err:", err)
    })
    */



// Example of a promise waiting for async, b/c in the real world this will take a bit of time, even if in miliseconds..
    const login = async (username, password) => {
        if (!username || !password) throw 'Missing credentials'
        if (password === 'letmein123') return 'Welcome!'
        throw 'Invalid password'
    }

    login('sdf', 'letmein123')
        .then(msg => {
            console.log("logged in,", msg)
        })
        .catch(err => {
            console.log("Error:", err)
        })


const colorChange = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}

/* USING PROMISE & .THEN CHAINING: */
// colorChange('red', 1000)
//     .then(() => colorChange('orange', 1000))
//     .then(() => colorChange('yellow', 1000))
//     .then(() => colorChange('green', 1000))
//     .then(() => colorChange('blue', 1000))
//     .then(() => colorChange('indigo', 1000))
//     .then(() => colorChange('violet', 1000))

/* USING PROMISE & ASYNC/ AWAIT:       --await will wait/pause until the line is finished (or wait until it has returned)  before moving to the next.*/
async function rainbow() {
    await colorChange('red', 1000)
    await colorChange('yellow', 1000)
    await colorChange('green', 1000)
    await colorChange('blue', 1000)
    await colorChange('indigo', 1000)
    await colorChange('violet', 1000) // Origionallly I left off the await and the printRainbow func immediatly showed its console.log message, THEN afterwards the color changed to violet.
    return "all done"
}

async function printRainbow() {
    await rainbow();    //will take 7 seconds (7000), then finishes returning the promise.
    let thing = "Reached the end of the rainbow";
    console.log(thing) //then will print the console msg.
    document.getElementById('main').innerHTML = thing;
}

printRainbow();

const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * (4500)) + 500;
        setTimeout(() => {
            if (delay > 2000) {
                reject('Connection Timeout :(')
            } else {
                resolve(`Here is your fake data from ${url}`)
            }
        }, delay)
    })
}


async function makeTwoRequests() {
    try {
        let data1 = await fakeRequest('/page1');
        console.log(data1);
        let data2 = await fakeRequest('/page2');
        console.log(data2);
    } catch (e) {
        console.log("CAUGHT AN ERROR!")
        console.log("error is:", e)
    }

}
