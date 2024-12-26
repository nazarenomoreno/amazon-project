


import {cart, AddToCart} from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';
import {formatCurrency} from '../scripts/utils/money.js';


loadProducts(renderProductsGrid);



function renderProductsGrid(){       //se pone en una funcion por una cuestion de asincronia al cargar desde el backend

  let productsHTML ='';


  products.forEach((products) =>{
    productsHTML= productsHTML + `
      <div class="product-container">
            <div class="product-image-container">
              <img class="product-image" src="${products.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">${products.name}</div>

            <div class="product-rating-container">
              <img class="product-rating-stars" src="${products.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${products.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${products.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${products.extraInfoHTML()}               <!--invoca el metodo del constructor para los productos de ropa -->


            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Añadido
            </div>

            <button class="add-to-cart-button button-primary" data-product-id="${products.id}" >
              Añadir al carrito
            </button>
      </div> 
    `;
  })



  document.querySelector('.products-grid').innerHTML= productsHTML;
 


  function updateCartQuantity(){                      //esta funcion modifica el carrito visual de la pagina
    let cartQuantity=0;

      cart.forEach((cartItem)=>{
        cartQuantity += cartItem.quantity;            //sumamos la cantidad de productos que hay en el carrito
      })
      
      document.querySelector('.cart-quantity').innerHTML= cartQuantity;   //usamos DOM para agregar en el html

      console.log(cart)
  }



  document.querySelectorAll('.add-to-cart-button').forEach((button)=>{
    button.addEventListener('click', ()=>{             //al clickear
      const productId = button.dataset.productId;       //obtenemos el id del producto con el dataset y lo almacenamos

      AddToCart(productId);    //se ejecuta la funcion de agregar al carrito
      updateCartQuantity();     //se actualiza el carrito de la pagina al hacer click
      
    });
  });


} //cierre de la funcion
 

