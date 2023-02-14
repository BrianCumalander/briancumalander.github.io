/* in order to use a module like https, we need to indicate that our code requires it.

 'require' allows us to use modules that are in seperate files.

 -The code will throw an error if we don't require https, example:
    code: 'MODULE_NOT_FOUND',
    requireStack: []

 docs found at https://nodejs.org/api/https.html#httpsgeturl-options-callback
 The docs also give an example of how to request an https url, the first line in the example is what we'll use:
 const https = require(`https`);

 The teamtreehouse API url we'll be using is https://teamtreehouse.com/profiles/csalgado.json

 Using the example on node's website, but we'll use our url..

*/

const https = require(`https`);

https.get('https://teamtreehouse.com/profiles/csalgado.json', (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
        process.stdout.write(d);
    });

}).on('error', (e) => {
    console.error(e);
});

// Read the data


// Parse the data


// Print the data


