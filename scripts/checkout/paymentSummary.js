
//este script contiene el resumen del pago

import {cart} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';

export function renderPaymentSummary(){        //esta funcion hace el resumen del pago total del carrito
    let productPriceCents = 0;                   //aca se guardará la suma total de (cantidad de producto del carrito*su precio)
    let shippingPriceCents = 0;                  //aca se guardará el precio de envio


    cart.forEach((cartItem)=>{
      const product = getProduct(cartItem.productId);          //producto original
      productPriceCents = productPriceCents + (cartItem.quantity * product.priceCents); //sumatoria de (cantidad de producto del carrito*su precio)


      const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);//se guarda la opcion de entrega de las opciones, para este producto

      shippingPriceCents = (shippingPriceCents + deliveryOption.priceCents);
      //se acumulan la suma de todos los envios (gratis o pago) de cada producto del carrito



    });

    

    const totalBeforeTaxCents= productPriceCents + shippingPriceCents;  //5773 total antes del impuesto
    const taxCents = totalBeforeTaxCents * 0.1;    //577.3      impuesto
    const totalCents = totalBeforeTaxCents + taxCents;   //5773 + 577.3 = 6350.3

    console.log(productPriceCents);   //total de lo se gasta en productos
    console.log(shippingPriceCents);  //total de lo que se gasta en envío
    console.log(totalBeforeTaxCents);  //suma de todo lo que se gasta
    console.log(taxCents);             //10% del impuesto
    console.log(totalCents);           //todo lo que se gasta + 10% de impuesto -> TOTAL

    const paymentSummaryHTML = `
            <div class="payment-summary-title">
              Resumen del pedido
            </div>

            <div class="payment-summary-row">
              <div>Articulos (3):</div>
              <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
            </div>

            <div class="payment-summary-row">
              <div>Envío &amp; manipulacion:</div>
              <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
              <div>Total antes de impuestos:</div>
              <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
            </div>

            <div class="payment-summary-row">
              <div>Impuesto estimado (10%):</div>
              <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
            </div>

            <div class="payment-summary-row total-row">
              <div>Total del pedido:</div>
              <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
            </div>

            <button class="place-order-button button-primary">
              Haz tu pedido
            </button>
      `;
  document.querySelector('.payment-summary').innerHTML= paymentSummaryHTML;

};  




