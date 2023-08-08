'use strict';

const button = document.querySelector('#productBtn');
const input = document.querySelector('#productInput');
const ol = document.querySelector('#products');
const flashMessages = document.querySelector('.flash-messages');

button.addEventListener('click', (e) => {
    e.preventDefault();
    if (flashMessages.children.length > 0) flashMessages.removeChild(flashMessages.children[0]);
    axios.get('/products/' + input.value) // Use relative URL
        .then((res) => {
            const li = document.createElement('li');
            li.textContent = res.data.number + ' - ' + res.data.type + ' - ' + res.data.price + '$';
            ol.appendChild(li);
        })
        .catch((err) => {
            if (err.response) {
                const { message = 'Empty Input' } = err.response.data;
                const flashMessage = document.createElement('div');
                flashMessage.classList.add('flash-message');
                flashMessage.textContent = message;
                flashMessages.appendChild(flashMessage);
            } else {
                console.log('An error occurred:', err.message);
            }
        });
});

