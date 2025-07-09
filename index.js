import { menuArray } from './data.js';

let orderArray = [];
let orderTotal = 0;

// 전역 클릭 이벤트 핸들러
document.addEventListener('click', function (e) {
  // 메뉴 아이템 추가
  if (e.target.dataset.addItem) {
    const itemId = Number(e.target.dataset.addItem);
    document.getElementById('order-summary').innerHTML = getOrderHtml(itemId);
    document.getElementById('order-summary-section').classList.remove('hidden');
  }
  // 주문 완료 버튼
  else if (e.target.dataset.completeOrder) {
    completeOrder();
  }
  // 아이템 제거 버튼
  else if (e.target.dataset.removeItem) {
    const itemId = Number(e.target.dataset.removeItem);
    removeItem(itemId);
  }
  // 결제 정보 제출 버튼
  else if (e.target.dataset.submitPayment) {
    submitPayment();
  }
});

// 결제 정보 제출 함수
function submitPayment() {
  const name = document.getElementById('credit-card-name').value;
  const cardNumber = document.getElementById('credit-card-number').value;
  const cVVNumber = document.getElementById('credit-card-cvv').value;

  if (name && cardNumber && cVVNumber) {
    document.getElementById('order-summary-section').innerHTML = `
      <div class="order-confirmation-msg">
        <p>Thanks, ${name}! Your order is on its way!</p>
      </div>
    `;
    document.getElementById('payment-details-modal').classList.add('hidden');
  }
}

// 주문 목록에서 아이템 제거
function removeItem(itemId) {
  orderArray = orderArray.filter(item => item.id !== itemId);
  calculateOrderTotal();
  renderOrder();
}

// 총액 계산
function calculateOrderTotal() {
  orderTotal = orderArray.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('total-price').textContent = `₩${orderTotal}`;
}

// 결제 모달 열기
function completeOrder() {
  document.getElementById('payment-details-modal').classList.remove('hidden');
}

// 주문 요약 HTML 생성
function getOrderHtml(itemId) {
  // 새 아이템 array에 추가
  orderArray.push(menuArray[itemId]);
  calculateOrderTotal();

  return orderArray
    .map(orderItem => `
      <li>
        <div class="order-summary__item">
          <div class="order-summary__item-details">
            <p class="menu__item-name">${orderItem.name}</p>
            <button class="btn-remove-item" data-remove-item="${orderItem.id}">제거</button>
          </div>
          <p class="menu__item-price">₩${orderItem.price}</p>
        </div>
      </li>
    `)
    .join('');
}

// 주문 요약 렌더링 (removeItem 등에서 재사용)
function renderOrder() {
  document.getElementById('order-summary').innerHTML =
    orderArray
      .map(orderItem => `
        <li>
          <div class="order-summary__item">
            <div class="order-summary__item-details">
              <p class="menu__item-name">${orderItem.name}</p>
              <button class="btn-remove-item" data-remove-item="${orderItem.id}">제거</button>
            </div>
            <p class="menu__item-price">₩${orderItem.price}</p>
          </div>
        </li>
      `)
      .join('');
}

function getMenuHtml() {
  let menuHtml = '';
  menuArray.forEach(function(menuItem) {
    menuHtml += `
      <li class="menu__item">
        <div class="menu__item-details">
          <p class="menu__item-emoji">${menuItem.emoji}</p>
          <ul class="menu__item-list">
            <li class="menu__item-name">${menuItem.name}</li>
            <li class="menu__item-ingredients">${menuItem.ingredients.join(', ')}</li>
            <li class="menu__item-price">₩${menuItem.price}</li>
          </ul>
        </div>
        <!-- 여기에 추가 버튼이 반드시 있어야 합니다 -->
        <button class="btn-add-item" data-add-item="${menuItem.id}">추가</button>
      </li>
      <hr class="menu-divider">
    `;
  });
  return menuHtml;
}


// 메뉴 렌더링
function renderMenu() {
  document.getElementById('menu').innerHTML = getMenuHtml();
}

// 초기 메뉴 렌더
renderMenu();