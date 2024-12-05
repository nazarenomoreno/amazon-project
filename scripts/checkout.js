
import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import '../data/backend-practice.js'
import {loadProducts, loadProductsFetch} from '../data/products.js';

new Promise((resolve)=>{
  loadProducts(()=>{
    resolve();          //llama a esta funcion cuando loadProducts ha terminado
  });
})
.then(()=>{                     //se ejecuta a traves de resolve
  renderOrderSummary();         //luego de cargar los productos se ejecuta esto
  renderPaymentSummary();
}); 



/*      EJEMPLO QUE ESTA MAL

new Promise((resolve)=>{
  loadProducts(()=>{
    resolve();
  });
}).then(()=>{
  loadCart(()=>{                                en el caso de tener loadCart() que carga el carrito
    renderOrderSummary();                     esto esta mal, ya que las funciones render podrian ejecutarse antes de que se carguen
    renderPaymentSummary();                   los datos de loadCart()
  });
})

*/


  
/*         EJEMPLO QUE ESTA BIEN

new Promise((resolve)=>{
  loadProducts(()=>{
    resolve('value1');
  });

}).then((value)=>{
  console.log(value)                                    console: 'value1'
  return new Promise((resolve)=>{
    loadCart(()=>{                                  
      resolve();
    });
  });

}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
})

*/


/*                                array de promesas: nos permite correr mas de una promesa al mismo tiempo
Promise.all([
  loadProductsFetch(),        caso particular donde usamos fetch para cargar objetos (se indenta asi porque ya retorna una Promesa)

  new Promise((resolve)=>{
    loadCart(()=>{                                  
      resolve();
    });
  })

]).then((value)=>{                             
    console.log(value)                          console: ['value1',undefined]
    renderOrderSummary();
    renderPaymentSummary();
  });

*/


//------------------------



/*        CARGAR LOS PRODUCTOS SIN USAR PROMESAS
loadProducts(()=>{
  renderOrderSummary();               funcion callback: esto se ejecuta luego de loadProducts
  renderPaymentSummary();             para de esta manera funcionar de manera asincrónica
});
*/ 



