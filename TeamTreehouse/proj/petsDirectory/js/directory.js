let html = '';

for (let i = 0; i < pets.length; i++) {
    let pet = pets[i];
    html += `
    <h2>${pet.name}</h2>
    <h3>${pet.type} | ${pet.breed}</h3>
    <p>Age: ${pet.age}</p>
    <img src="${pet.photo}" alt="${pet.breed}">
  `;
}

console.log(html);

//document.querySelector('main').innerHTML = html;
//This next way is quicker when dealing with lots of data.
document.querySelector('main').insertAdjacentHTML('beforeend', html);