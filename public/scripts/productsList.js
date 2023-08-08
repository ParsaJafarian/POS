'use strict';

const button = document.querySelector('#productBtn');
const input = document.querySelector('#productInput');
const ol = document.querySelector('#products');
const flashMessages = document.querySelector('.flash-messages');

button.addEventListener('click', (e) => {
    axios.get('http://localhost:3000/products/' + input.value)
        .then((res) => {
            const li = document.createElement('li');
            li.textContent = res.data.number + ' - ' + res.data.type + ' - ' + res.data.price + '$';
            ol.appendChild(li);
        })
        .catch((err) => {
            if (err.response) {
                // Display the error message from the response in the flash messages area
                const errorMessage = err.response.data.error;
                const flashMessage = document.createElement('div');
                flashMessage.classList.add('flash-message');
                flashMessage.textContent = errorMessage;
                flashMessages.appendChild(flashMessage);
            } else {
                console.log("OOopsies");
            }
        });
});

