console.log('Client side js file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#prvi');


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = search.value;
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            messageOne.textContent = data.Data.summary;
        })
    })

})