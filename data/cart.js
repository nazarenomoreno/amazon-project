
export let cart;

loadFromStorage();


export function loadFromStorage(){        //funcion para cargar desde el localStorage
  
  cart =  JSON.parse(localStorage.getItem('cart')) ;      //usamos localStorage para obtener los datos del navegador
  //al recargar el localStorage se cargara el carrito modificado o si esta vacio, uno nuevo
  
  if(!cart){                             //si el carrito es falsy (null), es decir, esta vacio:
    cart= [];                             //se llena, no se inicializa
   }


  console.log('carrito cargado: ', cart)
  



  let cantidadDeProductos = 0;

  if(document.querySelector('.cart-quantity')){      //existirá solo en el HTML index 
    cart.forEach((element)=>{
      cantidadDeProductos = cantidadDeProductos + 1
  
    })
    document.querySelector('.cart-quantity').textContent = cantidadDeProductos;
  }
  
 
};


function saveToStorage(){                         //funcion para guardar en el localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}





export function AddToCart(productId){                         // funcion para guardar producto en el carrito (id del dataset)

  let matchingItem;                                        //varaible indefinida, para guardar el producto

  cart.forEach((cartItem)=>{                                 //si el carrito esta vacio, no se recorre
    if (productId === cartItem.productId){        //si el id del dataset del producto es igual al id del producto del carrito
      matchingItem = cartItem;                    /*se guarda el producto en el carrito, osea si existe en el carrito*/

    }
  });

  if (matchingItem){
    matchingItem.quantity +=1;        //esto se ejecuta si la variable no esta vacia, si no es undefined
    /*                                 agregamos otro producto al carrito*/

  } else{                             //si es undefined se ejecuta esto
    cart.push(                                              //luego lo guardamos en el carrito
      {productId: productId,
      quantity:1,
      deliveryOptionId:'1'}
    )                          
  }

  saveToStorage();

}


export function removeFromCart(productId){          //funcion para eliminar un producto del carrito con el boton Eliminar
    const newCart =[];                             //creamos un carrito nuevo

    cart.forEach((cartItem)=>{
      if (productId !== cartItem.productId){         //si el id del producto que quiero eliminar no es igual al id del producto, entonces
        newCart.push(cartItem);                                /*se guarda el elemento en el carrito*/
      }
      
    });

    cart=newCart;           //el carrito se modifica con los elementos del nuevo carrito, pero se sigue llamando 'cart'

    saveToStorage(); 
}





export function updateDeliveryOption(productId, deliveryOptionId) {     //funcion para actualizar la opcion de delivery
  let matchingItem;                                        //esta variable sirve para saber si el producto existe en el carrito

  cart.forEach((cartItem)=>{                                 //si el carrito esta vacio, no se recorre
    if (productId === cartItem.productId){
      matchingItem = cartItem;                        // se guarda el producto del carrito correspondiente

    }   
  });

  matchingItem.deliveryOptionId = deliveryOptionId;    //se le asigna al producto del carrito un nuevo id de delivery al cual se clickeo
  
  saveToStorage();
  
};


