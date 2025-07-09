import { menuArray } from './data.js';

let orderArray = []
let orderTotal = 0

document.addEventListener('click', function(e){
    if (e.target.dataset.addItem) {
        document.getElementById('order-summary').innerHTML = getOrderHtml(e.target.dataset.addItem)
        document.getElementById('order-summary-section').classList.remove('hidden')
    } else if (e.target.dataset.completeOrder) {
        completeOrder()
    } else if (e.target.dataset.removeItem) {
        removeItem(e.target.dataset.removeItem)
    } else if (e.target.dataset.submitPayment) {
        submitPayment()
    }
})

function submitPayment() {
    const name = document.getElementById('credit-card-name').value
    const cardNumber = document.getElementById('credit-card-number').value
    const cVVNumber = document.getElementById('credit-card-cvv').value
    if (name && cardNumber && cVVNumber) {
        document.getElementById('order-summary-section').innerHTML = `
                <div class="order-confirmation-msg">
                    <p>Thanks, ${name}! Your order is on its way!</p>
                </div>
    `
        document.getElementById('payment-details-modal').classList.add('hidden')
    }
    
}

function removeItem(item) {
    let orderHtml = ''
    const index = orderArray.findIndex((element) => element.name === item )
    orderArray.splice(index, 1)
    orderArray.forEach(function(orderItem){
        orderHtml += `
        <li>
            <div class="order-summary__item">
                <div class="order-summary__item">
                    <p class="menu__item-name" id="order-item-${orderItem.name}">${orderItem.name}</p>
                    <button class="btn-remove-item" id="" data-remove-item="${orderItem.name}">remove</button>
                </div>
                <p class="menu__item-price">$${orderItem.price}</p>
            </div>
        </li>
`
    })
    calculateOrderTotal()
    document.getElementById('order-summary').innerHTML = orderHtml
}

function calculateOrderTotal() {
    orderTotal = 0
    orderArray.forEach( function (orderItem) {
        orderTotal += orderItem.price
    })
    document.getElementById('total-price').innerHTML = `$${orderTotal}`
}

function completeOrder() {
    document.getElementById('payment-details-modal').classList.remove('hidden')
}

function getOrderHtml(orderItem) { 
    let orderHtml = ''
    orderArray.push(menuArray[orderItem])
    calculateOrderTotal()
    orderArray.forEach(function(orderItem){
        orderHtml += `
        <li>
            <div class="order-summary__item">
                <div class="order-summary__item">
                    <p class="menu__item-name" id="order-item-${orderItem.name}">${orderItem.name}</p>
                    <button class="btn-remove-item" id="" data-remove-item="${orderItem.name}">remove</button>
                </div>
                <p class="menu__item-price">$${orderItem.price}</p>
            </div>
        </li>
`
    })
    return orderHtml
}

function getMenuHtml() {
    let menuHtml = ''
    menuArray.forEach(function(menuItem) {
        menuHtml += `
                        <li>
                            <div class="menu__item">
                                <div class="menu__item-details">
                                    <p class="menu__item-emoji">${menuItem.emoji}</p>
                                    <ul class="menu__item-list">
                                        <li class="menu__item-name">${menuItem.name}</li>
                                        <li class="menu__item-ingredients">${menuItem.ingredients}</li>
                                        <li class="menu__item-price">$${menuItem.price}</li>
                                    </ul>
                                </div>
                                <button class="btn-add-item" data-add-item="${menuItem.id}"><i class="fa-thin fa-plus" data-add-item="${menuItem.id}"></i></button>
                            </div>
                        </li>
                        <hr class="menu-divider">
        `
    })
    return menuHtml
}

function renderMenu() {
    document.getElementById('menu').innerHTML = getMenuHtml()
}

renderMenu()
