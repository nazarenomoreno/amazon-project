
//este script contiene el resumen del pedido

import {cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import {products} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'  //libreria externa con codigo javascript (para los dias)
import {deliveryOptions} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js'; 



const today = dayjs();   //la funcion dayjs retorna un objeto que se guardara en otro objeto 'today'
const deliveryDate = today.add(7,'days');   //añade 7 dias (aunque puede ser months, hours, weeks)-> add metodo especial de dayjs

console.log(deliveryDate.format('dddd, MMMM, D'))  //se muestra en ese formato-> format metodo especial de dayjs


//----
export function renderOrderSummary(){              //funcion que carga la página


  let cartSummaryHTML=''; //esto concatena los html de los productos que hay en el carrito. es global porque debe concatenarse

  cart.forEach((cartItem)=>{                          //se recorre el carrito y para cada elemento se hace..
    const productId= cartItem.productId                    //se guarda el id del producto del carrito del elemento

    let matchingProduct;

    products.forEach((product)=>{                 //se recorre los productos y si el id es igual se guarda ese producto en una variable
        if (product.id === productId){
          matchingProduct = product;
        }
    })


       
    //----------
    const deliveryOptionId = cartItem.deliveryOptionId;   //se recupera el dia que en el carrito el cliente seleccionó para la entrega
    let deliveryOption;                                              //para luego mostrarlo en la fecha de entrega y HTML

    deliveryOptions.forEach((option)=>{
      if(option.id===deliveryOptionId){   //se compara el id de las opciones de delivery con el id de la opcion del producto del carrito
        deliveryOption = option;                         //opcion del array original de opciones
      }
    });

    const today = dayjs();                                               //fecha actual
    const deliveryDate = today.add(                                     //fecha actual + dias de entrega
        deliveryOption.deliveryDays, 'days'                               //cantidad y tipo de cambio
      );

    const dateString = deliveryDate.format('dddd, MMMM, D');          //formato de muestra
      //-----------------


    cartSummaryHTML = cartSummaryHTML + `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Fecha de entrega: ${dateString}               <!--fecha de entrega que calculamos antes-->
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
                  <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                    Eliminar
                  </span>
                </div>
              </div>

              <div class="delivery-options"> 
                <div class="delivery-options-title">
                  Elige una opción de entrega:
                </div>
                ${deliveryOptionsHMTL(matchingProduct, cartItem)}               <!-- funcion para mostrar HTML las opciones de delivery -->
              </div>
            </div>
        </div>
      `;

  });




  function deliveryOptionsHMTL(matchingProduct, cartItem){                //funcion para generar el HTML de las opciones de delivery
    let html ='';

    deliveryOptions.forEach((deliveryOption)=>{                             //para cada opcion de delivery
      const today = dayjs();                                               //fecha actual
      const deliveryDate = today.add(                                     //fecha actual + dias de entrega
        deliveryOption.deliveryDays, 'days'                              //cantidad y tipo de cambio
      );

      const dateString = deliveryDate.format('dddd, MMMM, D')           //formato de muestra

      const priceString = deliveryOption.priceCents                    //si el precio es 0 entonces es GRATIS, sino se coloca el precio
      === 0
          ? 'GRATIS'
          : `$${formatCurrency(deliveryOption.priceCents)} -` 

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;     //si la opcion del carrito es igual a la opcion del delivery

      html +=`                                                          <!-- se concatenca el html -->
          <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
              <input type="radio"
                  ${isChecked ? 'checked' : ''}                        
                  class="delivery-option-input"          
                  name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  ${dateString}
                </div>
                <div class="delivery-option-price">
                  ${priceString} Envío
                </div>
              </div>
            </div>
      `
    });
    return html;                                                      //devuelve el html concatenado
  }


  console.log(cartSummaryHTML); //se muestra en la consola el html de los productos que haya en el carrito
  document.querySelector('.order-summary').innerHTML= cartSummaryHTML;  //cartSummaryHTML concatena el html de los productos que hay en el cart y se muestra en la pagina de productos que hay en el carrito



  document.querySelectorAll('.delete-quantity-link').forEach((link)=>{    //para todos los botones eliminar

      link.addEventListener('click',()=>{                             //le damos funcionalidad al boton eliminar
        
          const productId = link.dataset.productId          //guardamos en una variable el id del boton que esta en el dataset
          removeFromCart(productId);                         //ejecuta la funcion eliminar un producto del carrito

          document.querySelector(`.js-cart-item-container-${productId}`).remove();  //elimina el producto del DOM

          renderPaymentSummary();                                 //se actualiza el resumen de pago
      });
  });




  document.querySelectorAll('.js-delivery-option').forEach((element)=>{     //para los contenedores de opciones de delivery en la pagina
    element.addEventListener('click',()=>{                                  //se les da funcionalidad al contenedor
      const {productId, deliveryOptionId} = element.dataset;            //guardo en dos constantes los valores del dataset del contenedor
      updateDeliveryOption(productId, deliveryOptionId);                    //llamo a la funcion con esos dos argumentos
      //los cuales son: el id original del producto y el id del contenedor al cual le hice click


      renderOrderSummary();                      //apenas se cambia la opcion, se actuliza en la pantalla
      //si no estaria esta funcion, se tiene que recargar la pagina para que se actualice              
      
      renderPaymentSummary();      //apenas se cambia la opcion, se actualiza el resumen de pago
      
    });
    
  });

};

  