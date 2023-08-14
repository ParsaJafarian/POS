const buyBtn = document.querySelector('#buy-btn');
const returnBtn = document.querySelector('#return-btn');
const transactionBtn = document.querySelector('#transaction-btn');
const methodBtn = document.querySelector('#method-btn');
const checkoutBtn = document.querySelector('#checkout-btn');
const resetBtn = document.querySelector('#reset-btn');

const productInput = document.querySelector('#product-input');
const transactionInput = document.querySelector('#transaction-input');

const ol = document.querySelector('#products');
const errorMessages = document.querySelector('#error-messages');

const total = document.querySelector('#total');

var trans_num = null;
const productNums = [];