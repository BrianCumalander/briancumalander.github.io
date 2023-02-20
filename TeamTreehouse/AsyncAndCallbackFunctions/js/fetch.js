const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

function getProfiles(json) {
    const profiles = json.people.map(person => {
        const craft = person.craft; //to return the craft that they are on
        return fetch(wikiUrl + person.name)
            .then(response => response.json()) //pass it a .then and pass it a function that parses a json
            .then(profile => {
                return { ...profile, craft }; // combine both api's to create the return value
            })
            .catch(err => console.log('Error Fetching Wiki: ', err))
    });
    return Promise.all(profiles); //Returns everything--profiles and the wikipedia data.
}

// Generate the markup for each profile
function generateHTML(data) {
    data.map(person => {
        const section = document.createElement('section');
        peopleList.appendChild(section);
        // Check if request returns a 'standard' page from Wiki
        if (person.type === 'standard') {
            section.innerHTML = `
            <span>${person.craft}</span>
            <img src=${person.thumbnail.source}> 
            <h2>${person.title}</h2>
            <p>${person.description}</p>
            <p>${person.extract}</p>
            `;
        } else {
            section.innerHTML = `
              <span>${person.craft}</span>
              <img src="https://api.time.com/wp-content/uploads/2015/10/iconic-space-photos-armstrong-moon-nasa1.jpg" width="90" height="90" alt="ocean clouds seen from space">
              <h2>${person.title}</h2>
              <p>Results unavailable for ${person.title}</p>
              ${person.extract_html}
            `;
        }
    });
}

btn.addEventListener('click', (event) => {
    //after the promise is returned, use chaining to change the btn to say Loading...
    event.target.textContent = "Loading...";

    fetch(astrosUrl)
        .then(response => response.json()) //fetch needs this line to parse the json, but the old get method does not because it used the xhr request.
        .then(getProfiles)
        .then(generateHTML)
        .catch(err => {
            peopleList.innerHTML = '<h3>Something went wrong!</h3>';
            console.log(err)
        })
        .finally(() => event.target.remove())
});