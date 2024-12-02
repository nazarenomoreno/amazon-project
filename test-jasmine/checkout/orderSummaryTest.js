
import {renderOrderSummary} from "../../scripts/checkout/orderSummary.js";
import {loadFromStorage, cart} from "../../data/cart.js";
import {loadProducts} from "../../data/products.js";


describe('test suite: renderOrderSummary', ()=>{

  beforeAll((done)=>{
    loadProducts(()=>{
      done();          //nos permite controlar cuando avanzar al siguiente paso
    });
    
  });

  it('mostrar el carrito', ()=>{
    document.querySelector('.js-test-container').innerHTML= `

    <div class="js-test-container"></div>`;


    spyOn(localStorage,'getItem').and.callFake(()=>{            //objeto que queremos mockear y método que queremos mockear
      return JSON.stringify([{                                                 //se llena (no se inicializa, se llena)
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId:'1'
    
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId:'2'
      }]);                               
    });  
    loadFromStorage();

    renderOrderSummary;

    expect(
      document.querySelector('.js-test-container').length
    ).toEqual(2);
    
    expect(

      document.querySelector(`.js-test-quantity-product${"e43638ce-6aa0-4b85-b27f-e1d07eb678c6"}`).innerText
    ).toContain('Quantity: 2')

    expect(

      document.querySelector(`.js-test-quantity-product${"15b6fc6f-327a-4ec4-896f-486349e85a3d"}`).innerText
    ).toContain('Quantity: 1')

    document.querySelector('.js-test-container').innerHTML='';


  });






//.......................






  it('eliminar un producto', () =>{

    spyOn(localStorage, 'setItem');


    document.querySelector('.js-test-container').innerHTML= `
    <div class="js-test-container"></div>
    <div class="payment-summary" ></div>
    `;


    spyOn(localStorage,'getItem').and.callFake(()=>{            //objeto que queremos mockear y método que queremos mockear
      return JSON.stringify([{                                                 //se llena (no se inicializa, se llena)
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId:'1'
    
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId:'2'
      }]);                               
    });  
    loadFromStorage();

    renderOrderSummary();
    
    document.querySelector(`js-test-delete-link-${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}`).click()
  
    expect(
      document.querySelector('.js-test-container').length
    ).toEqual(1);

    expect(
      docuent.querySelector(`.js-cart-item-container-${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}`)  //primer producto
    ).toEqual(null);

    expect(
      docuent.querySelector(`.js-cart-item-container-${'15b6fc6f-327a-4ec4-896f-486349e85a3d'}`)  //segundo producto
    ).not.toEqual(null);    //not es lo opuesto a lo que esta despues (toEqual)

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');

    document.querySelector('.js-test-container').innerHTML='';
  });
});

