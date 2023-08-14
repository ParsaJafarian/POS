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
    if (productNums.includes(res.data.num)) throw new Error('Product already added');
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
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;
    errorMessages.appendChild(errorMessage);
};