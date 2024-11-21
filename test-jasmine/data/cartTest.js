
import {AddToCart, cart, loadFromStorage} from "../../data/cart.js";
//en jasmine un mock solo dura un test

describe('test suites: addToCart', ()=>{

  it('añadir un producto existente al carrito', ()=>{
    spyOn(localStorage, 'setItem');

    spyOn(localStorage,'getItem').and.callFake(()=>{            //objeto que queremos mockear y método que queremos mockear
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:1,
        deliveryOption: '1'
      }]);                               
    });  
    loadFromStorage();

    AddToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');         //agrega un producto al carrito y actualiza el localStorage
    expect(cart.length).toEqual(1);                             //verifica que carrito es igual a 1
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);    //confirma que el metodo localStorage.setItem fue llamado una 1 vez
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');  //verifica si lo que esta en el carrito es lo que agregamos

    expect(cart[0].quantity).toEqual(2);   //verifica si tenemos 1 producto, el cual es el que agregamos
  });





  it('añadir un nuevo producto al carrito', ()=>{
    spyOn (localStorage, 'setItem')                  //este espía (spyOn) monitorea el método setItem del objeto localStorage para verificar más adelante si fue llamado y cuántas veces.

    spyOn(localStorage,'getItem').and.callFake(()=>{            //objeto que queremos mockear y método que queremos mockear
      return JSON.stringify([]);                                //devuelve un carrito vacio
    });  
    loadFromStorage();                       

 
    AddToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');         //agrega un producto al carrito y actualiza el localStorage
    expect(cart.length).toEqual(1);                             //verifica que carrito es igual a 1
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);    //confirma que el metodo localStorage.setItem fue llamado una 1 vez
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');  //verifica si lo que esta en el carrito es lo que agregamos

    expect(cart[0].quantity).toEqual(1);   //verifica si tenemos 1 producto, el cual es el que agregamos

  });
});


