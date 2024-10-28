
export const deliveryOptions=[{             //opciones de entrega, tres opciones
  id:'1',
  deliveryDays:7,
  priceCents:0
},
{
  id:'2',
  deliveryDays:3,
  priceCents:499
},{
  id:'3',
  deliveryDays:1,
  priceCents:999
}];   


export function getDeliveryOption(deliveryOptionId){       //funcion para obtener la opcion de delivery
  let deliveryOption;                                              

  deliveryOptions.forEach((option)=>{
      if(option.id === deliveryOptionId){  //si el id de las opciones de delivery es igual que el id de la opcion del producto del carrito
        deliveryOption = option;            //se guarda la opcion de delivery de las opciones de delivery
      }
  });

  return deliveryOption || deliveryOptions[0];      //retorna la opcion o por defecto la primera opcion de los deliverys
};