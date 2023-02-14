const https = require("https");
//const { getHeapSpaceStatistics } = require("v8");

//print the data
function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
    console.log(message);
}
function getProfile(username) {
    //connect to our url
    const request = https.get(
        `https://teamtreehouse.com/profiles/${username}.json`,
        (response) => {
            let body = ""; //this is our varible to store the incomming stream of data, in this case, .json
            //console.dir(response.statusCode); //looking for a response statusCode, defined below
            //read the data
            response.on("data", (data) => {   //we're looking for statusCode of 'data'
                body += data.toString();  //pour it in to the body varible
            });
            response.on("end", () => { //when there's no more data incoming, this is the 'end' portion
                //parse the data
                //console.dir(JSON.parse(body)); //--good for testing. In the next line of code we will run the data through our printMessage function instead.
                /* 
                without the JSON.parse(body), plain console.dir(body) 
                displays everything with NO SPACES, it's VERY difficult
                to read. Adding the Json.parse parsed it in to readable chunks. 
                Now our data is an object. 
                */
                let profile = JSON.parse(body);
                //console.dir(profile.points); 
                /*
                --for testing. at first the code errored. But then we ran the console.dir...
                */
                printMessage(username, profile.badges.length, profile.points.JavaScript);
            });
        }
    );
}
//getProfile("bc2000");
//console.dir(process);

const users = process.argv.slice(2);
users.forEach(getProfile);

//now from the cmd line you can specify users
// so, in the cmd line, run: node app.js csalgado jennifernordell bc2000
















