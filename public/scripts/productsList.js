'use strict';

const buyBtn = document.querySelector('#buy-btn');
const returnBtn = document.querySelector('#return-btn');
const transactionBtn = document.querySelector('#transaction-btn');
const methodBtn = document.querySelector('#method-btn');
const checkoutBtn = document.querySelector('#checkout-btn');

const productInput = document.querySelector('#product-input');
const transactionInput = document.querySelector('#transaction-input');

const ol = document.querySelector('#products');
const flashMessages = document.querySelector('.flash-messages');

const total = document.querySelector('#total');

var trans_num = null;
const productNums = [];

const getProductText = (res, isReturn) => {
    return isReturn ?
        res.data.num + ' / ' + res.data.type + ' / -' + res.data.price + '$' :
        res.data.num + ' / ' + res.data.type + ' / ' + res.data.price + '$';
};

const makeSpan = text => {
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

const makeLi = container => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.appendChild(container);
    return li;
};

const addProduct = (res, isReturn) => {
    if(productNums.includes(res.data.num)) throw new Error('Product already added');
    if (isReturn) {
        if (res.data.is_available) throw new Error('Product is already available');
        if (res.data.last_trans_num != trans_num) throw new Error('Transaction does not match');
    }

    const productText = getProductText(res, isReturn);
    const deleteBtn = makeDeleteBtn();
    deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        ol.removeChild(li);
        addedProductsTexts.delete(productText);
        total.textContent = parseFloat(total.textContent) - res.data.price;
    });
    const span = makeSpan(productText);

    const flexContainer = makeFlexContainer(span, deleteBtn);

    const li = makeLi(flexContainer);
    ol.appendChild(li);
    productNums.push(res.data.num);    

    if (isReturn) total.textContent = parseFloat(total.textContent) - res.data.price;
    else total.textContent = parseFloat(total.textContent) + res.data.price;
};

const displayError = err => {
    const { message = 'Invalid Input' } = err.response ? err.response.data : err;
    const flashMessage = document.createElement('div');
    flashMessage.classList.add('flash-message');
    flashMessage.textContent = message;
    flashMessages.appendChild(flashMessage);
};

buyBtn.addEventListener('click', e => {
    e.preventDefault();
    if (flashMessages.children.length > 0) flashMessages.removeChild(flashMessages.children[0]);
    axios.get('/products/buy/' + productInput.value)
        .then(res => addProduct(res, false))
        .catch(err => displayError(err));
});

returnBtn.addEventListener('click', e => {
    if (!trans_num) return;
    e.preventDefault();
    if (flashMessages.children.length > 0) flashMessages.removeChild(flashMessages.children[0]);
    axios.get('/products/return/' + productInput.value)
        .then((res) => addProduct(res, true))
        .catch((err) => displayError(err));
});

transactionBtn.addEventListener('click', e => {
    e.preventDefault();
    if (flashMessages.children.length > 0) flashMessages.removeChild(flashMessages.children[0]);
    axios.get('/transactions/' + transactionInput.value)
        .then(res => {
            returnBtn.removeAttribute('data-bs-toggle');
            const text = `Transaction Number ${res.data.num} successfully entered`;
            // If there is already a span, remove it 
            if (transactionBtn.parentElement.children.length > 2) transactionBtn.parentElement.removeChild(transactionBtn.parentElement.children[2]);
            const span = makeSpan(text);
            span.classList.add('text-success');
            transactionBtn.parentElement.appendChild(span);
            trans_num = res.data.num;
        })
        .catch(err => displayError(err));
});

checkoutBtn.addEventListener('click', e => {
    try {
        e.preventDefault();
        if (flashMessages.children.length > 0) flashMessages.removeChild(flashMessages.children[0]);
        if (total.textContent == 0) throw new Error('No products added');
        const modal = new bootstrap.Modal(document.querySelector('#checkout-modal'));
        modal.show();
    } catch (err) {
        displayError(err);
    }
});

methodBtn.addEventListener('click', e => {
    e.preventDefault();
    if (flashMessages.children.length > 0) flashMessages.removeChild(flashMessages.children[0]);
    axios.post('/transactions', { productNums })
        .then(res => {
            // Resolved
        })
        .catch(err => displayError(err));
});
