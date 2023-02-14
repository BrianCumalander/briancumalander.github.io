const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

// Make an ajax request
function getJSON(url, callback) { // have the url, and then callback, which can actually be called anything but most ppl just write it as 'callback'
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url); // FIRST, GET the url, and if successful, pass the callback which is defined above in the function def. Later, it will be returned in the function.
    xhr.onload = () => {
        if (xhr.status === 200) { //if its OK (returns status of 200), then run the let data...
            let data = JSON.parse(xhr.responseText);
            console.log(data);
            return callback(data); // RETURN the callback with the DATA (defined a line above)
        }
    };
    xhr.send();
}
// oleg%20kononenko

// Generate the markup for each profile, cool!
function generateHTML(data) {
    const img_src = (data.thumbnail && data.thumbnail.source) ? data.thumbnail.source : '';
    const section = document.createElement('section');
    peopleList.appendChild(section);
    section.innerHTML = `
    <img src=${img_src}>
    <h2>${data.title}</h2>
    <p>${data.description}</p>
    <p>${data.extract}</p>
    `;
}

//make sure it works, run this then check the console
// getJSON(astrosUrl);

//create an eventListener to listen for the click event. Then we will run a callback with the => Symbol, and that call back will run the getJSON() And within that, we will run astrosUrl
//currently only displays in the console everytime the button is clicked.
// btn.addEventListener('click', () => getJSON(astrosUrl)); 
// We want it to run on every person that is in space, so we'll create an anonomous function next.
btn.addEventListener('click', () => {
    getJSON(astrosUrl, (json) => { // this is now receiving data from its parent func, getJSON
        json.people.map(person => {
            if (person.name == "Zhang Lu") {        // His info showed generic incorrect data b/c there's more than one "Zhang Lu" in wikipedia's database. had to fine correct one on wikipedia and specify to replace it on the next line.
                getJSON(wikiUrl + "Zhang Lu (taikonaut)", generateHTML); // replace with correct person
            } else if (person.name == "Sergey Prokopyev") {
                getJSON(wikiUrl + "Sergey Prokopyev (cosmonaut)", generateHTML); // replace with correct person
            } else {
                getJSON(wikiUrl + person.name, generateHTML);
            }
        });
    });
});




