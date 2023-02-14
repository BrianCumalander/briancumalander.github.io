
/*
url https://dictionaryapi.com/api/v3/references/collegiate/json/test?key=
key 3c3746b6-6fd8-4bbc-a618-aa3d99fa6903


*/

const https = require("https");
const key = "3c3746b6-6fd8-4bbc-a618-aa3d99fa6903";

// print the message
/*
function printMessage(definition) {
    const message = `the definition of ${word}: ${definition}`;
    console.log(message);
}
*/


function getDef(term) {
    try {
        const request = https.get(
            `https://dictionaryapi.com/api/v3/references/collegiate/json/${term}?key=${key}`,
            (response) => {
                let body = ""; //store incoming stream of data to body var.
                //Read the data
                response.on("data", (data) => {
                    body += data.toString();
                });


                response.on("end", () => {
                    //parse the data chunk
                    const definition = JSON.parse(body);
                    // print the data                    //printMessage(def);
                    console.log(definition[0].shortdef);
                });
            }
        );
        request.on("error", (error) => console.error(error.message));
    } catch (error) {
        console.error(error.message);
    }
}

const query = process.argv.slice(2);
query.forEach(getDef);
getDef();