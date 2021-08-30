let product = document.querySelectorAll(".products");
let buyItem = document.querySelector(".buyItem");
let sumPrice = document.querySelector(".sumPrice");
let searchBar = document.querySelector(".searchBar");
let productOfCart = JSON.parse(localStorage.getItem("shoppingCart"));
if(!productOfCart){
  productOfCart = [];
}

product.forEach((element) => {
  element.addEventListener("click", (event) => {
    if (event.target.classList.contains("addToCart")) {
      event.preventDefault();
      const id = event.target.dataset.productId;
      const price =
        event.target.previousElementSibling.firstChild.nextElementSibling
          .textContent;

      const productName =
        event.target.previousElementSibling.previousElementSibling.textContent;
      const image =
        event.target.previousElementSibling.previousElementSibling
          .previousElementSibling.firstChild.src;
      let productInCart = {
        price: +price,
        basePrice: +price,
        productName: productName,
        image: image,
        count: 1,
        id: id,
      };
      updateCart(productInCart);
      updateShoppingCartByHtml();
    }
  });
});

function updateCart(cartItem) {
  for (let i = 0; i < productOfCart.length; i++) {
    if (productOfCart[i].id === cartItem.id) {
      productOfCart[i].count += 1;
      productOfCart[i].price =
        productOfCart[i].basePrice * productOfCart[i].count;
      return;
    }
  }
  productOfCart.push(cartItem);
}

function updateShoppingCartByHtml() {
  localStorage.setItem("shoppingCart", JSON.stringify(productOfCart)); 
  if (productOfCart.length > 0) {
    let result = productOfCart.map((product) => {
      return `<li class="buyItem">
						<img class="rounded-pill" src="${product.image}" height="100px" width="100px">
						<div>
							<h5>${product.productName}</h5>
							<h6>${product.price}</h6>
							<div>
								<button class="buttonMinus" data-id-Val="${product.id}">-</button>
								<span class="countOfProduct">${product.count}</span>
								<button class="buttonPlus" data-id-Val="${product.id}">+</button>
							</div>
						</div>
					</li>`;
    });

    buyItem.innerHTML = result.join("");
    sumPrice.innerHTML = `<h1> total price = ${totalPriceCalculation()}</h1> `;
  } else {
    buyItem.innerHTML = "";
    sumPrice.innerHTML ="";
  }
}

function totalPriceCalculation() {
  let totalPrice = 0;
  productOfCart.forEach((product) => {
    totalPrice += parseInt(product.price);
  });
  return totalPrice;
}

buyItem.addEventListener("click", (event) => {
  const buttonMinus = event.target.classList.contains("buttonMinus");
  const buttonPlus = event.target.classList.contains("buttonPlus");
  if (buttonPlus || buttonMinus) {
    for (let i = 0; i < productOfCart.length; i++) {
      if (productOfCart[i].id === event.target.dataset.idVal) {
        if (buttonPlus) {
          productOfCart[i].count += 1;
        } else if (buttonMinus) {
          productOfCart[i].count -= 1;
        }
        productOfCart[i].price =
          productOfCart[i].basePrice * productOfCart[i].count;
      }
      if (productOfCart[i].count <= 0) {
        productOfCart.splice(i, 1);
        console.log(productOfCart);
      }
    }
    updateShoppingCartByHtml();
  }
});
updateShoppingCartByHtml();

searchBar.addEventListener("keyup", (event) => {
  let searchValue = event.target.value.toLowerCase();
  product.forEach((element) => {
   productTitle = element.children[1].textContent;
   if(productTitle.toLowerCase().indexOf(searchValue) == -1) {
      element.style.display = "none";
   }else{
     element.style.display = "inline-block";
     element.style.flexDirection = "column";
     element.style.flexWrap = "wrap";
   }
  })
})