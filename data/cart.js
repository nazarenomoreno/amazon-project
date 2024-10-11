
export const cart =[];


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
      cart.push(                                              //lo guardamos en el carrito
        {productId: productId,
        quantity:1}
      )                          
    }
}
