
//tests de jasmine - para la funcion formatCurrency


import {formatCurrency} from '../scripts/utils/money.js';

describe('test suite: formatCurrency', ()=>{   //contenedor para agrupar tests y una funcion (suite test = conjunto de pruebas)
  it('convertir centavos a dolares', () =>{       //prueba individual con su nombre y una funcion
    expect(formatCurrency(2095)).toEqual('20.95');     //metodo que compara un valor con otro
  })

  it('trabajar con cero', ()=>{
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('redondear al centavo mas cercano', ()=>{
    expect(formatCurrency(2000.5)).toEqual('20.01');
  })

});
