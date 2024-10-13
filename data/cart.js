
export const cart =[{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
},
{
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1,
}];


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
}
