const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

// handle all fetch requests and catch any errors all the way to the chained .finally at eof.
async function getJSON(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        throw error;
    }
}

async function getPeopleInSpace(url) {
    const peopleJSON = await getJSON(url); //returns array(10), number: 10, just dont know how to get it out of there to display =(.

    const profiles = peopleJSON.people.map(async (person) => {
        const craft = person.craft;
        const profileJSON = await getJSON(wikiUrl + person.name);
        return { ...profileJSON, craft };
    });

    return Promise.all(profiles);
}

// Generate the markup for each profile
function generateHTML(data) {
    data.map(person => {
        const section = document.createElement('section');
        peopleList.appendChild(section);
        // Check if request returns a 'standard' page from Wiki
        if (person.type === 'standard') {
            section.innerHTML = `
        <img src=${person.thumbnail.source}>
        <span>${person.craft}</span>
        <h2>${person.title}</h2>
        <p>${person.description}</p>
        <p>${person.extract}</p>
      `;
        } else {
            section.innerHTML = `
            <img src="https://api.time.com/wp-content/uploads/2015/10/iconic-space-photos-armstrong-moon-nasa1.jpg" width="90" height="90" alt="ocean clouds seen from space">
            <h2>${person.title}</h2>
            <p>Results unavailable for ${person.title}</p>
            ${person.extract_html}
         `;
        }

        length.innerHTML = `${this.length}`;

    });
}

btn.addEventListener('click', (event) => {
    event.target.textContent = "Loading...";

    getPeopleInSpace(astrosUrl)
        .then(generateHTML)
        .catch(e => {
            peopleList.innerHTML = '<h3>Something went wrong!</h3>';
            console.error(e);
        })
        .finally(() => event.target.remove()) //when the resolve returns, remove the button and display the data of the astronat list.
});