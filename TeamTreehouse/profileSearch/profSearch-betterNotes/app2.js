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

 Project:
(https://teamtreehouse.com/library/nodejs-basics-3/requesting-data-with-https#questions)
 Use the teamtreehouse api url to access the .json data for a given username.
 It will return the number of badges that they've earned and other various info.
*/

const https = require(`https`);

// create and name a function to get the profile of the user
function getProfile() {

    // connect to the API URL https://teamtreehouse.com/profiles/csalgado.json


    // Read the data


    // Parse the data


    // Print the data

}




https.get('https://teamtreehouse.com/profiles/csalgado.json', (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
        process.stdout.write(d);
    });

}).on('error', (e) => {
    console.error(e);
});




