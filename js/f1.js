console.log('This is f1.js')

// Create a scope to limit variables

{
    // Set the navbar to dark by replacing the word light with dark in className
    // let body = document.body;
    // let children = body.children;
    // console.log(children);
    // let navBar = children[0];
    // let navBar = document.getElementsByTagName('nav')[0];
    let navBar = document.querySelector('nav');
    navBar.className = navBar.className.replaceAll('light', 'dark');

    // Set the buttons to be bootstrap style colors
    let buttonColors = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];

    let myButtons = document.querySelectorAll('.col-2 > button');
    
    // Loop through buttons and apply button color to class name
    for (let i = 0; i < myButtons.length; i++){
        myButtons[i].className = `btn btn-${buttonColors[i]}`
    }

    // Add a header under the buttons in the container
    // First create the header
    let newHeader = document.createElement('h4');
    newHeader.id = 'myHeader';
    newHeader.className = 'text-center mt-3';
    newHeader.innerHTML = 'Created by Vance with the help of Mr. Stanton';
    newHeader.style.color = 'black';


    // Get the row of buttons
    let buttonRow = document.getElementsByClassName('row')[0];
    // Add the new header AFTER the row of buttons (as opposed to being appended as the last child of the row)
    buttonRow.after(newHeader);

}

// Create a new scope

{
    // Get the header
    let myHeader = document.getElementById('myHeader');
    // console.log(myHeader);
}
// Get the country from the form and display info on page
{
    // Grab the form
    let form = document.getElementById('seasonForm');
    
    // Create a function to handle submit event
    async function handleSubmit(e){
        e.preventDefault();
        // Get the input data from the form
        let inputSeason = e.target.season.value;
        // Get country info from the input data
        let season = await getCountryInfo(inputSeason);
        // Build and add country card to display
        buildCountryCard(season)
        e.target.season.value = '';
    }

    // Add handleSubmit function as listener to submit even on form
    form.addEventListener('submit', handleSubmit);


    // Function that will get the data from the country API
    async function getCountryInfo(countryName){
        try{
            let res = await fetch(`https://ergast.com/api/f1/${season}/${round}/results`)
            let data = await res.json()
            return data[0]
        } catch(err) {
            console.error(err)
        }
    }

    // Function that will create country card and add to country display div
    function buildCountryCard(countryObj){
        // Create the card div
        const card = document.createElement('div');
        card.className = 'card';

        // Create card body
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        // Create country name and population elements
        const countryTitle = document.createElement('h5');
        countryTitle.className = 'card-title'
        countryTitle.innerHTML = countryObj.name.official;

        const population = document.createElement('p');
        population.className = 'card-text'
        population.innerHTML = `Population: ${countryObj.population.toLocaleString('en-US')}`;

        // Append title and population to card body
        cardBody.append(countryTitle);
        cardBody.append(population);

        // Add card body to card div
        card.append(cardBody);

        // Create our column for the row
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-3'

        // Add the card to the column
        col.append(card)

        // Get the country display row
        const countryDisplay = document.getElementById('countryDisplay');

        // Add the new column to our display
        countryDisplay.append(col);
    }
}
