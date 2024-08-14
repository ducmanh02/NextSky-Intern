const closeAdsNotification = () => {
  const AdsNotification = document.querySelector(".notification");
  AdsNotification.style.display = "none";
};


function toggleMinicart() {
  const minicart = document.querySelector(".minicart");
  const overlay = document.querySelector(".overlay");
  minicart.classList.toggle("show");
  overlay.classList.toggle("show");
}
let overlay2Visible = false;

const toggleNavbar = () => {
  const nav = document.querySelector(".nav-container");
  const overlay2 = document.querySelector(".overlay2");

  nav.classList.toggle("show");

  if (!overlay2Visible) {
    overlay2.classList.add("show");
    overlay2Visible = true;
  } else {
    overlay2.classList.remove("show");
    overlay2Visible = false;
  }
};

const toggleSubHome = () => {
  const navSubHome = document.querySelector(".nav-container-submenu-home");
  navSubHome.classList.toggle("show");
};

const toggleSubShop = () => {
  const navSubHome = document.querySelector(".nav-container-submenu-shop");
  navSubHome.classList.toggle("show");
};
const toggleSubShopLayout = () => {
  const navSubHome = document.querySelector(
    ".nav-container-submenu-shop-shoplayout"
  );
  navSubHome.classList.toggle("show");
};
//freeship remaining

const freeshipRemaingContainer = document.querySelector(
  ".freeship-remaining-container"
);
const freeshipRemainingText = document.querySelector(
  ".freeship-remaining-text"
);

const updateLoadingFreeship = (totalPrice) => {
  const loadingProgress = document.querySelector(".loading-progress");
  if (totalPrice < 500) {
    const percent = (totalPrice / 500) * 100;
    loadingProgress.style.width = `${percent}%`;
  } else {
    loadingProgress.style.width = "100%";
  }
};

const remainingPriceInnerContent = (totalPrice) => {
  if (totalPrice < 500) {
    freeshipRemainingText.textContent = `Spend $${(500 - totalPrice).toFixed(
      2
    )} more and get `;
  } else {
    freeshipRemainingText.textContent = `Congratulations, you got `;
  }
};

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
                                <div class="content d-flex justify-content-between">
                                    <div class="d-flex flex-column justify-content-between">
                                        <div class="detail mb-12">
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
                                            <button onclick="decreaseQuantity(this)"><span class="icon-minus"></span></button>
                                            <span class="quantity" class="fs-14 fw-400">${
                                              item.quantity
                                            }</span>
                                            <button onclick="increaseQuantity(this)"><span class="icon-plus"></span></button>
                                        </div>
                                    </div>
                                    <div class="action d-flex flex-column gap-10 mt-5">
                                        <img class="pointer" src="./assets/images/icon/delete.svg" alt="delete-button" onclick="removeFromCart(this)">
                                        <img class="pointer" src="./assets/images/icon/edit.svg" alt="edit-button">
                                    </div>
                                </div>
                            </div>
  `;
  return cartItem;
};

const updateTotalPrice = () => {
  const totalPrice = cartItems.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );
  totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
  remainingPriceInnerContent(totalPrice);
  updateLoadingFreeship(totalPrice);
};

const decreaseQuantity = (button) => {
  const cartItem = button.closest(".item");
  const quantityElement = cartItem.querySelector(".quantity");
  const index = Array.from(cartItemsContainer.children).indexOf(cartItem);

  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity--;
    quantityElement.textContent = cartItems[index].quantity;
    updateTotalPrice();
    updateTotalQuantity();
  }
};
function increaseQuantity(button) {
  const cartItem = button.closest(".item");
  const quantityElement = cartItem.querySelector(".quantity");
  const index = Array.from(cartItemsContainer.children).indexOf(cartItem);

  cartItems[index].quantity++;
  quantityElement.textContent = cartItems[index].quantity;
  updateTotalPrice();
  updateTotalQuantity();
}
function removeFromCart(button) {
  const cartItem = button.closest(".item");
  const index = Array.from(cartItemsContainer.children).indexOf(cartItem);
  cartItems.splice(index, 1);
  cartItem.remove();
  updateTotalPrice();
  updateTotalQuantity();
}
// generate sản phẩm
cartItems.forEach((item) => {
  const cartItem = createCartItemHTML(item);
  cartItemsContainer.appendChild(cartItem);
});

updateTotalPrice();

const updateTotalQuantity = () => {
  const items = document.querySelectorAll(".list-item-cart .item");

  let totalProducts = 0;
  items.forEach((item) => {
    const quantity = parseInt(item.querySelector(".quantity").textContent);
    totalProducts += quantity;
  });

  document.querySelectorAll(".total-quantity").forEach((icon) => {
    icon.textContent = totalProducts;
  });
  if (totalProducts == 0) {
    const cartItem = document.createElement("div");
    cartItemsContainer.appendChild(cartItem);
    console.log("0");
    cartItem.innerHTML = `<p class="fs-13 fw-400 text-center">No products in cart</p>`;
  }
};

updateTotalQuantity();

// toggle footer-mobile
const accordionTitles = document.querySelectorAll(
  ".footer-about-mobile-item .accordion"
);
const accordionContents = document.querySelectorAll(".open-link");
const accordionIcons = document.querySelectorAll(
  ".footer-about-mobile-item .icon"
);

accordionTitles.forEach((title, index) => {
  title.addEventListener("click", () => {
    // Thêm/xóa class 'active' cho tiêu đề
    title.classList.toggle("active");

    // Hiện/ẩn nội dung accordion
    const content = accordionContents[index];
    if (content.style.display === "flex") {
      content.style.display = "none";
    } else {
      content.style.display = "flex";
    }

    // Cập nhật biểu tượng dấu cộng/trừ
    const icon = accordionIcons[index];
    if (content.style.display === "block") {
      icon.innerHTML = `<p class="icon-minus"></p>`;
    } else {
      icon.innerHTML = `<p class="icon-plus"></p>`;
    }
  });
});

const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".banner-button-right",
    prevEl: ".banner-button-left",
  },
  
});

const trendingProductlSwiper = new Swiper(".trending", {
  slidesPerView: 2,
  spaceBetween: 20,
  navigation: {
    nextEl: "#next-trending-product",
    prevEl: "#prev-trending-product",
  },
  breakpoints: {
    // when window width is >= 640px
    640: {
      slidesPerView: 2,
      spaceBetween: 15
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 15
    },
    // when window width is >= 1024px
    1024: {
      slidesPerView: 3,
      spaceBetween: 20
    }
  }
});
const newArrivalSwiper = new Swiper(".newArrival", {
  slidesPerView: 2,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: "#newArrivals-next",
    prevEl: "#newArrivals-prev",
  },
  breakpoints: {
    // when window width is >= 640px
    640: {
      slidesPerView: 2,
      spaceBetween: 15
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 15
    },
    // when window width is >= 1024px
    1024: {
      slidesPerView: 3,
      spaceBetween: 20
    }
  }
});

const customerSaySwiper = new Swiper(".customerSay-list-wrapper-mobile", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: "#next-customerSay",
    prevEl: "#prev-customerSay",
  },
  breakpoints: {
    // when window width is >= 640px
    640: {
      slidesPerView: 2,
      spaceBetween: 15
    },
    // when window width is >= 1024px
    1024: {
      slidesPerView: 3,
      spaceBetween: 20
    }
  }
});

// go to top
const goToTop = document.querySelector(".button-toTop-mobile");
goToTop.addEventListener("click", () => {
  window.scroll({top: 0, behavior: "smooth"})
});
window.onscroll = function () {
  scrollFunction();
};
const scrollFunction = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    goToTop.style.display = "flex";
  } else {
    goToTop.style.display = "none";
  }
};


// disable minicart
const body = document.body;
const minicart = document.querySelector('.minicart');

// Open the minicart
minicart.addEventListener('click', () => {
  body.classList.add('disable-scroll');
});

// Close the minicart
minicart.addEventListener('click', () => {
  body.classList.remove('disable-scroll');
});