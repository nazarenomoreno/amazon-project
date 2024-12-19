

export const orders = JSON.parse(localStorage.getItem('orders'))  || [];


export function addOrder () {
  orders.unshift(order)                //coloca un elemento al principio de un array
  saveToStorage();
};

function saveToStorage(){
  localStorage.setItem('orders', JSON.stringify(orders));
}


