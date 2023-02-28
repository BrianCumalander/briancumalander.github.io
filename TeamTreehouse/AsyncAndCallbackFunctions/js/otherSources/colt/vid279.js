//create your own promise by:

//new Promise( (param1, param2) => {  // 1st is usually the resolve, 2nd is the reject. A lot of times thats exactly what you see as params, '(resolve, reject)'
    //code to run
 // })
  
  /* new Promise( (resolve, reject) => {
    resolve();  // either a resolve or reject(). But until then, it will be in a 'pending' state
  })
  
  */

  const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        const rand = Math.random();
        setTimeout( () => {
            if (rand < 0.7) {
                resolve('Your fake data here');
            }
            reject('Request error!');
        }, 1000) 
    })
  }

  fakeRequest('/dogs/1')
    .then( (data) => {
        console.log("Done with request.");
        console.log('data is: ', data);
    })
    .catch( (err) => {
        console.log('Error encountered: ', err)
    })