document.addEventListener('DOMContentLoaded', init);
//to store words as an array
let words = [];

function init() {
    let button;
    //get main div from html
    let mainContainer = document.getElementById('main-container');
    //create a div for creating stories
    let createStoryDiv = document.createElement('div');
    createStoryDiv.setAttribute('id', 'createStoryPage');
    createStoryDiv.setAttribute('class', 'page active');
    mainContainer.appendChild(createStoryDiv);

    // create heading
    let h2 = document.createElement('h2');
    h2.innerHTML = "Choose a story";
    createStoryPage.appendChild(h2);

    //create a div for read stories and enter inputs
    let readStoryDiv = document.createElement('div');
    readStoryDiv.setAttribute('id', 'readStoryPage');
    readStoryDiv.setAttribute('class', 'page');
    mainContainer.appendChild(readStoryDiv);
    
    //create a div to display full story
    let displayStoryDiv = document.createElement('div');
    displayStoryDiv.setAttribute('id', 'displayStoryPage');
    displayStoryDiv.setAttribute('class', 'page');
    mainContainer.appendChild(displayStoryDiv);
     

    //loop through stories array to create button with story title
    stories.forEach(item => {
        button = document.createElement("button");
        button.setAttribute('id', `${item.title}`);
        button.innerHTML = `${item.title}`;
        button.addEventListener('click', readStoryForm);
        createStoryDiv.appendChild(button);

        
    });
}
//function to display read story form with inputs
function readStoryForm(e) {
    e.preventDefault();
    //toggle between two pages to display read story page and hide create story page
    document.getElementById('readStoryPage').classList.add('active');
    document.getElementById('createStoryPage').classList.remove('active');
    //To remove innerHTML of read story page div to avoid repeating
    document.getElementById('readStoryPage').innerHTML = "";
    let readStoryPage = document.getElementById('readStoryPage');
    //loop through story words to display inputs with read story button

    // create heading
    let h3 = document.createElement('h3');
    h3.innerHTML = "Provide the follwing words";
    readStoryPage.appendChild(h3);

    stories.forEach(item => {
        if(item.title === e.target.id) {
            let form = document.createElement("form");
            form.setAttribute('id', 'readStoryForm');
            readStoryPage.appendChild(form);
            item.words.forEach(word => {
                let input = document.createElement('input');
                input.setAttribute('id', `${word}`);
                input.setAttribute('type', 'text');
                input.setAttribute('name', `${word}`);
                input.setAttribute('placeholder', `${word}`);
                form.appendChild(input);
            });
            //create read story button to display complete story on it's click event
            let readStoryButton = document.createElement('button');
            readStoryButton.setAttribute('id', `${item.title}`);
            readStoryButton.innerHTML = "Read Story";
            form.appendChild(readStoryButton);
            readStoryButton.addEventListener('click', displayCompleteStory);
        }
    });
}
//function to display complete story
function displayCompleteStory(e) {
    e.preventDefault();
    document.getElementById('displayStoryPage').innerHTML = "";
    //toggle between two pages to display complete story page and hide read story page
    document.getElementById('displayStoryPage').classList.add('active');
    document.getElementById('readStoryPage').classList.remove('active');
    let displayStoryDiv = document.getElementById('displayStoryPage');

    

    //loop through stories array to create a output of input values
    stories.forEach(item => {
        if(item.title === e.target.id) {
            // create heading
            let h4 = document.createElement('h4');
            h4.innerHTML = `${item.title}` ;
            displayStoryPage.appendChild(h4);
            
            for(let i = 0; i < item.words.length; i++) {
                words[`${item.words[i]}`] = document.getElementById(`${item.words[i]}`).value;
                
            }
            displayStoryDiv.innerHTML += `${item.output(words)}`;
        }
    });

    
    //create a button display create story page on click event
    let button = document.createElement("button");
    button.setAttribute('id', "createStory");
    button.innerHTML = "Create a Story";
    displayStoryDiv.appendChild(button);
    button.addEventListener('click', toggleToMainPage);

    
}

//function to toggle between two pages to display create story page and hide display complete story page
function toggleToMainPage(e) {
    e.preventDefault();
    document.getElementById('createStoryPage').classList.add('active');
    document.getElementById('displayStoryPage').classList.remove('active');
}