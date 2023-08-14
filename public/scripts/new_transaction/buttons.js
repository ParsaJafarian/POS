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
        .then(res => {
            const modal = new bootstrap.Modal(document.querySelector('#checkout-modal'));
            console.log("transaction complete");
            modal.hide();
            window.location.reload();
        })
        .catch(err => displayError(err));
});