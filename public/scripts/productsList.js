const buyBtn = document.querySelector('#buy-btn');
const returnBtn = document.querySelector('#return-btn');
const transactionBtn = document.querySelector('#transaction-btn');
const methodBtn = document.querySelector('#method-btn');
const checkoutBtn = document.querySelector('#checkout-btn');
const resetBtn = document.querySelector('#reset-btn');
const productInput = document.querySelector('#product-input');
const transactionInput = document.querySelector('#transaction-input');
const getProducts = () => document.querySelector('#products');
const getTotal = () => document.querySelector('#total');
const errorMessages = document.querySelector('#error-messages');
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

const makeDeleteBtn = (res, isReturn) => {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'btn btn-danger btn-sm delete-btn px-1 py-0';
    deleteBtn.addEventListener('click', e => {
        e.preventDefault();
        e.target.parentElement.parentElement.remove();
        getTotal().textContent = parseFloat(getTotal().textContent) - getPrice(res, isReturn);
        productNums.pop(res.data.num);
    });
    return deleteBtn;
};

const makeFlexContainer = (res, isReturn) => {
    const flexContainer = document.createElement('div');
    flexContainer.className = 'd-flex justify-content-between align-items-center w-100 flex-container';
    flexContainer.appendChild(makeSpan(getProductText(res, isReturn)));
    flexContainer.appendChild(makeDeleteBtn(res, isReturn));
    return flexContainer;
};

const makeLi = (res, isReturn) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.appendChild(makeFlexContainer(res, isReturn));
    return li;
};

const validateProduct = (res, isReturn) => {
    if (productNums.includes(res.data.num)) throw new Error('Product already added');
    if (isReturn) {
        if (res.data.is_available) throw new Error('Product is already available');
        if (res.data.last_trans_num != trans_num) throw new Error('Transaction does not match');
    }
};

const getPrice = (res, isReturn) => isReturn ? -res.data.price : res.data.price;

const addProduct = (res, isReturn) => {
    validateProduct(res, isReturn);
    getProducts().appendChild(makeLi(res, isReturn));
    productNums.push(res.data.num);
    getTotal().textContent = parseFloat(total.textContent) + getPrice(res, isReturn);
};

const displayError = err => {
    const { message = 'Invalid Input' } = err.response ? err.response.data : err;
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;
    errorMessages.appendChild(errorMessage);
};

buyBtn.addEventListener('click', e => {
    e.preventDefault();
    if (errorMessages.children.length > 0) errorMessages.removeChild(errorMessages.children[0]);
    axios.get('/products/buy/' + productInput.value)
        .then(res => addProduct(res, false))
        .catch(err => displayError(err));
});

returnBtn.addEventListener('click', e => {
    if (!trans_num) return;
    e.preventDefault();
    if (errorMessages.children.length > 0) errorMessages.removeChild(errorMessages.children[0]);
    axios.get('/products/return/' + productInput.value)
        .then((res) => addProduct(res, true))
        .catch((err) => displayError(err));
});

transactionBtn.addEventListener('click', e => {
    e.preventDefault();
    if (errorMessages.children.length > 0) errorMessages.removeChild(errorMessages.children[0]);
    axios.get('/transactions/' + transactionInput.value)
        .then(res => {
            returnBtn.removeAttribute('data-bs-toggle');
            // If there is already a span, remove it
            const parent = transactionBtn.parentElement; 
            if (parent.children.length > 2) parent.removeChild(parent.children[2]);
            const span = makeSpan(`Transaction Number ${res.data.num} successfully entered`);
            span.classList.add('text-success');
            transactionBtn.parentElement.appendChild(span);
            trans_num = res.data.num;
        })
        .catch(err => displayError(err));
});

checkoutBtn.addEventListener('click', e => {
    try {
        e.preventDefault();
        if (errorMessages.children.length > 0) errorMessages.removeChild(errorMessages.children[0]);
        if (total.textContent == 0) throw new Error('No products added');
        const modal = new bootstrap.Modal(document.querySelector('#checkout-modal'));
        modal.show();
    } catch (err) {
        displayError(err);
    }
});

resetBtn.addEventListener('click', e => {
    e.preventDefault();
    window.location.reload();
});

methodBtn.addEventListener('click', e => {
    e.preventDefault();
    if (errorMessages.children.length > 0) errorMessages.removeChild(errorMessages.children[0]);
    axios.post('http://localhost:3000/transactions', { productNums })
        .then(() => {
            const modal = new bootstrap.Modal(document.querySelector('#checkout-modal'));
            modal.hide();
            window.location.reload();
        })
        .catch(err => displayError(err));
});