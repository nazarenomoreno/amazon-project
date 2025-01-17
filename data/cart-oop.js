


function Cart(localStorageKey) {         //PascalCase para cosas que generan objetos

  // Cuatro funciones en el objeto




  const cart = {
    cartItems: undefined,






    //------------------------              Funcion para cargar el localStorage
    loadFromStorage(){                         
      this.cartItems =  JSON.parse(localStorage.getItem(localStorageKey)) ;      //usamos localStorage para obtener los datos del navegador
      //al recargar el localStorage se cargara el carrito modificado o si esta vacio, uno nuevo
      
      if(!this.cartItems){                             //si el carrito es falsy (null), es decir, esta vacio:
        this.cartItems= [{                                                 //se llena (no se inicializa, se llena)
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId:'1'
      
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId:'2'
        }];
      }
    },


    //-----------------------                    Funcion para guardar en el localStorage
    saveToStorage(){                                           
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },





    //----------                     Funcion para guardar producto en el carrito
    AddToCart(productId){                                      
      let matchingItem;                                        //esta variable sirve para saber si el producto existe en el carrito

      this.cartItems.forEach((cartItem)=>{                                 //si el carrito esta vacio, no se recorre
        if (productId === cartItem.productId){
          matchingItem = cartItem;
  
        }
      });

      if (matchingItem){
        matchingItem.quantity +=1;        //si marchingItem esta undefined, no se ejecuta esto
      } else{                             //pero si esto
        this.cartItems.push(                                              //luego lo guardamos en el carrito
          {productId: productId,
          quantity:1,
          deliveryOptionId:'1'}
        )                          
      }

      this.saveToStorage();

    },
    //-------------                 Funcion para eliminar un producto del carrito con el boton Eliminar



    removeFromCart(productId){          
      const newCart =[];                             //creamos un carrito nuevo

      this.cartItems.forEach((cartItem)=>{
        if (productId !== cartItem.productId){         //si el id del producto que quiero eliminar no es igual al id del producto, entonces
          newCart.push(cartItem);                                /*se guarda el elemento en el carrito*/
        }
        
      });

      this.cartItems=newCart;           //el carrito se modifica con los elementos del nuevo carrito, pero se sigue llamando 'cart'

      this.saveToStorage(); 
    },


    //------------------------------               Funcion para actualizar la opcion de delivery


    updateDeliveryOption(productId, deliveryOptionId) {     
      let matchingItem;                                        //esta variable sirve para saber si el producto existe en el carrito
    
      this.cartItems.forEach((cartItem)=>{                                 //si el carrito esta vacio, no se recorre
        if (productId === cartItem.productId){
          matchingItem = cartItem;                        // se guarda el producto del carrito correspondiente
    
        }   
      });
    
      matchingItem.deliveryOptionId = deliveryOptionId;    //se le asigna al producto del carrito un nuevo id de delivery al cual se clickeo
      
      this.saveToStorage();
    }
  };

  return Cart;


}; 






const cart = Cart('cart-oop');             //carrito 1  -> con su kay para localStorage
const businessCart= Cart('cart-business');               //carrito 2    -> en el caso de necesitar otro carrito






cart.loadFromStorage();              //cart, no this porque esta fuera del objeto

businessCart.loadFromStorage();      









 




