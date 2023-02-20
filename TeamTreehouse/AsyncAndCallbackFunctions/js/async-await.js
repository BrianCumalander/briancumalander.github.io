const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

async function getJSON(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        throw error;
    }
}


// Handle all fetch requests
async function getPeopleInSpace(url) {
    const peopleResponse = await fetch(url).catch(e => console.log("Error fetching data: ", e));
    const peopleJSON = await peopleResponse.json();

    const profiles = peopleJSON.people.map(async (person) => {
        const craft = person.craft;
        const profileResponse = await fetch(wikiUrl + person.name).catch(e => console.log("Error fetching data: ", e));
        const profileJSON = await profileResponse.json();

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
    });
}

btn.addEventListener('click', (event) => {
    event.target.textContent = "Loading...";

    getPeopleInSpace(astrosUrl)
        .then(generateHTML)
        .finally(() => event.target.remove())
});


// btn.addEventListener('click', async (event) => {
//     event.target.textContent = "Loading...";

//     const astros = await getPeopleInSpace(astrosUrl);
//     generateHTML(astros);
//     event.target.remove();
// });