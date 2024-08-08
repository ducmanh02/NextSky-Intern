function toggleHomeModal() {
  const modal = document.querySelector(".header-home-hover-modal");
  modal.classList.toggle("show");
}
function toggleShopModal() {
  const modal = document.querySelector(".header-shop-hover-modal");
  modal.classList.toggle("show");
}

function toggleMinicart() {
  const minicart = document.querySelector(".minicart");
  const overlay = document.querySelector(".overlay");
  minicart.classList.toggle("show");
  overlay.classList.toggle("show");
}

let cartItems = [
  {
    image: "./assets/images/product/product11.jpg",
    name: "Square Textured Striped",
    color: "Black / M",
    price: 145.0,
    quantity: 1,
  },
  {
    image: "./assets/images/product/product12.jpg",
    name: "Floral Print Dress",
    color: "Blue / S",
    price: 89.99,
    quantity: 2,
  },
];
const cartItemsContainer = document.querySelector(".list-item-cart");
const totalPriceElement = document.getElementById("totalPriceElement");

const createCartItemHTML = (item) => {
  const cartItem = document.createElement("div");
  cartItem.classList.add("item");

  cartItem.innerHTML = `
                          <hr class="hr-cart mb-20">
                            <div class="card d-flex gap-10">
                                <div class="image">
                                    <img src=${
                                      item.image
                                    } alt="product-cart" width="100%"
                                        height="100%">
                                </div>
                                <div class="content d-flex justify-content-between flex-1">
                                    <div class="d-flex flex-column gap-19">
                                        <div class="detail">
                                            <p class="fs-16 fw-400 mb-10">
                                                ${item.name}
                                            </p>
                                            <p class="fs-14 fw-400 text-disabled mb-15">
                                                ${item.color}
                                            </p>
                                            <p class="fs-14 fw-500">$${item.price.toFixed(
                                              2
                                            )}</p>
                                        </div>
                                        <div class="quantity-stepper fs-14 fw-400">
                                            <button onclick="decreaseQuantity(this)">-</button>
                                            <span class="quantity" class="fs-14 fw-400">${
                                              item.quantity
                                            }</span>
                                            <button onclick="increaseQuantity(this)">+</button>
                                        </div>
                                    </div>
                                    <div class="action d-flex flex-column gap-10">
                                        <img src="./assets/images/icon/edit.svg" alt="edit-button">
                                        <img src="./assets/images/icon/delete.svg" alt="delete-button" onclick="removeFromCart(this)">
                                    </div>
                                </div>
                            </div>
  `;
  return cartItem;
};
const updateLoadingFreeship = (totalPrice) =>{
  if(totalPrice < 500){
    return totalPrice/500;
  }
  else{
    return 1;
  }
}

const updateTotalPrice = () => {
  const totalPrice = cartItems.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );
  totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
};

const decreaseQuantity = (button) => {
  const cartItem = button.closest(".item");
  const quantityElement = cartItem.querySelector(".quantity");
  const index = Array.from(cartItemsContainer.children).indexOf(cartItem);
  // console.log(index);

  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity--;
    quantityElement.textContent = cartItems[index].quantity;
    updateTotalPrice();
  }
};
function increaseQuantity(button) {
  const cartItem = button.closest(".item");
  const quantityElement = cartItem.querySelector(".quantity");
  const index = Array.from(cartItemsContainer.children).indexOf(cartItem);
  // console.log(index);

  cartItems[index].quantity++;
  quantityElement.textContent = cartItems[index].quantity;
  updateTotalPrice();
  console.log("increment quantity");
}
function removeFromCart(button) {
  const cartItem = button.closest(".item");
  const index = Array.from(cartItemsContainer.children).indexOf(cartItem);
  cartItems.splice(index, 1);
  cartItem.remove();
  updateTotalPrice();
}
// generate sản phẩm
cartItems.forEach((item) => {
  const cartItem = createCartItemHTML(item);
  cartItemsContainer.appendChild(cartItem);
});

updateTotalPrice();
