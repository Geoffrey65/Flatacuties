// Loadinng the DOM to execute the code
document.addEventListener('DOMContentLoaded', () => {
    // Getting references to HTML elements
    const animalListContainer = document.getElementById('animalList');
    const animalDetailsContainer = document.getElementById('animalDetails');
    const resetVotesButton = document.getElementById('resetVotes');
// Function to fetch animals from the server
    function fetchAnimals() {
        // Making a GET request to retrieve the animals list
        fetch('http://localhost:3000/characters')
            .then(response => response.json())
            .then(animals => {
                animalListContainer.innerHTML = '';
                //Iterating through  each animal and creating a div for its name
                animals.forEach(animal => {
                    const animalName = document.createElement('div');
                    animalName.textContent = animal.name;
                    // Attaching an event listener the details when clicked
                    animalName.addEventListener('click', () => showAnimalDetails(animal.id));
                    animalListContainer.appendChild(animalName);
                });
            })
            .catch(error => console.error('Error fetching animals:', error));
    }
   // Function to show details for a specific animal
    function showAnimalDetails(animalId) {
        fetch(`http://localhost:3000/characters/${animalId}`)
            .then(response => response.json())
            .then(animal => {
                const votes = animal.votes !== undefined ? animal.votes : 0;
                 // Display the details in the animalDetailsContainer
                animalDetailsContainer.innerHTML = `
                    <h2>${animal.name}</h2>
                    <img src="${animal.image}" alt="${animal.name}">
                    <p>Votes: ${votes}</p>
                    <button onclick="addVote(${animal.id})">Add Vote</button>
                `;
            })
            .catch(error => console.error('Error fetching animal details:', error));
    }

    window.addVote = function(animalId) {
        // Get the current votes from the displayed conent
        const votesElement = document.querySelector('#animalDetails p');
        const currentVotes = parseInt(votesElement.textContent.match(/\d+/)[0]);
        votesElement.textContent = `Votes: ${currentVotes + 1}`;
    };
// Event listener for the resetVotesButton
    resetVotesButton.addEventListener('click', () => {
        const votesElement = document.querySelector('#animalDetails p');
        votesElement.textContent = 'Votes: 0';
    });

    // Loading the page and fetching the initial list of animals

    fetchAnimals();
});
