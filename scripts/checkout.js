import {cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from '../utils/money.js';


let cartSummaryHTML=''; //esto concatena los html de los productos que hay en el carrito

cart.forEach((cartItem)=>{                          //se recorre el carrito y para cada elemento se hace..
   const productId= cartItem.productId                    //se guarda el id del producto del carrito del elemento

   let matchingProduct;

   products.forEach((product)=>{                 //se recorre los productos y si el id es igual se guarda ese producto en una variable
      if (product.id === productId){
        matchingProduct = product;
      }
   })

   

   cartSummaryHTML = cartSummaryHTML + `
      <div class="cart-item-container js-cart-item-container-${productId}">
          <div class="delivery-date">
            Fecha de entrega: Miércoles 15 de Junio
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Cantidad: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Actualizar
                </span>
                <span class="delete-quantity-link link-primary" data-product-id="${productId}">
                  Eliminar
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Elige una opción de entrega:
              </div>

              <div class="delivery-option">
                <input type="radio" class="delivery-option-input"
                  name="delivery-option-${productId}">               <!--si comparten el mismo nombre habra una sola seleccion-->
                <div>
                  <div class="delivery-option-date">
                    Martes 21 de Junio
                  </div>
                  <div class="delivery-option-price">
                    Envío GRATIS
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" checked class="delivery-option-input"
                  name="delivery-option-${productId}">
                <div>
                  <div class="delivery-option-date">
                    Miercoles 15 de Junio
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Envío
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input"
                  name="delivery-option-${productId}">
                <div>
                  <div class="delivery-option-date">
                    Lunes 13 de Junio
                  </div>
                  <div class="delivery-option-price">
                    $9.99 - Envío
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    `;

});

console.log(cartSummaryHTML); //se muestra en la consola el html de los productos que haya en el carrito
document.querySelector('.order-summary').innerHTML= cartSummaryHTML;//cartSummaryHTML concatena el html de los productos que hay en el cart y se muestra en la pagina de productos que hay en el carrito



document.querySelectorAll('.delete-quantity-link').forEach((link)=>{    //para todos los botones eliminar

    link.addEventListener('click',()=>{                             //le damos funcionalidad al boton eliminar
      
        const productId = link.dataset.productId          //guardamos en una variable el id del boton que esta en el dataset
        removeFromCart(productId);                         //ejecuta la funcion eliminar un producto del carrito

        document.querySelector(`.js-cart-item-container-${productId}`).remove();  //elimina el producto del DOM
        
    });
});


