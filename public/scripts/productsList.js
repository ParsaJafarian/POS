'use strict';

const button = document.querySelector('#productBtn');
const input = document.querySelector('#productInput');
const ol = document.querySelector('#products');
const flashMessages = document.querySelector('.flash-messages');

button.addEventListener('click', (e) => {
    axios.get('/products/' + input.value) // Use relative URL
        .then((res) => {
            const li = document.createElement('li');
            li.textContent = res.data.number + ' - ' + res.data.type + ' - ' + res.data.price + '$';
            ol.appendChild(li);
        })
        .catch((err) => {
            console.log(err);
        });
});

