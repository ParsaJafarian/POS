'use strict';

const buyBtn = document.querySelector('#buy-btn');
const returnBtn = document.querySelector('#return-btn');

const input = document.querySelector('#productInput');
const ol = document.querySelector('#products');
const flashMessages = document.querySelector('.flash-messages');

const addedProductsTexts = new Set();

const getProductText = (res, is_return) => {
    return is_return ?
        res.data.number + ' / ' + res.data.type + ' / -' + res.data.price + '$' :
        res.data.number + ' / ' + res.data.type + ' / ' + res.data.price + '$';
};

const makeSpan = (text) => {
    const span = document.createElement('span');
    span.textContent = text;
    return span;
};

const makeDeleteBtn = () => {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'btn btn-danger btn-sm delete-btn px-1 py-0';
    return deleteBtn;
};

const makeFlexContainer = (span, deleteBtn) => {
    const flexContainer = document.createElement('div');
    flexContainer.className = 'd-flex justify-content-between align-items-center w-100 flex-container';
    flexContainer.appendChild(span);
    flexContainer.appendChild(deleteBtn);
    return flexContainer;
};

const makeLi = (container) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.appendChild(container);
    return li;
};

const addProduct = (res, is_return) => {
    const productText = getProductText(res, is_return);
    if (addedProductsTexts.has(productText)) throw new Error('Product already added');
    const deleteBtn = makeDeleteBtn();
    deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        ol.removeChild(li);
        addedProductsTexts.delete(productText);
    });
    const span = makeSpan(productText);
    const flexContainer = makeFlexContainer(span, deleteBtn);
    
    const li = makeLi(flexContainer);
    ol.appendChild(li);
    addedProductsTexts.add(productText);
};

const displayError = (err) => {
    const { message = 'Empty Input' } = err.response ? err.response.data : err;
    const flashMessage = document.createElement('div');
    flashMessage.classList.add('flash-message');
    flashMessage.textContent = message;
    flashMessages.appendChild(flashMessage);
};

buyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (flashMessages.children.length > 0) flashMessages.removeChild(flashMessages.children[0]);
    axios.get('/products/buy/' + input.value)
        .then((res) => addProduct(res, false))
        .catch((err) => displayError(err));
});

returnBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (flashMessages.children.length > 0) flashMessages.removeChild(flashMessages.children[0]);
    axios.get('/products/return/' + input.value)
        .then((res) => addProduct(res, true))
        .catch((err) => displayError(err));

});

