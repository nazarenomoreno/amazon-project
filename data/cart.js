


export let cart =  JSON.parse(localStorage.getItem('cart')) ;      //usamos localStorage para obtener los datos del navegador

if(!cart){                             //si el carrito es falsy (null), es decir, esta vacio:
  cart= [{                                                 //se llena (no se inicializa, se llena)
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
  }];
}


function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}





export function AddToCart(productId){
    let matchingItem;                                        //esta variable sirve para saber si el producto existe en el carrito

    cart.forEach((cartItem)=>{                                 //si el carrito esta vacio, no se recorre
      if (productId === cartItem.productId){
        matchingItem = cartItem;

      }
    });

    if (matchingItem){
      matchingItem.quantity +=1;        //si marchingItem esta undefined, no se ejecuta esto
    } else{                             //pero si esto
      cart.push(                                              //luego lo guardamos en el carrito
        {productId: productId,
        quantity:1}
      )                          
    }

    saveToStorage();

}


export function removeFromCart(productId){          //funcion para eliminar un producto del carrito con el boton Eliminar
    const newCart =[];                           //creamos un carrito nuevo

    cart.forEach((cartItem)=>{
      if (productId !== cartItem.productId){         //si el id del producto que quiero eliminar no es igual al id del producto, entonces
        newCart.push(cartItem);                                /*se guarda el elemento en el carrito*/
      }
      
    });

    cart=newCart;           //el carrito se modifica con los elementos del nuevo carrito, pero se sigue llamando 'cart'

    saveToStorage(); 
}