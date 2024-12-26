

import {formatCurrency} from "../scripts/utils/money.js";


export function getProduct(productId){             
  let matchingProduct;                              //en parametro se guarda el id del producto del carrito

  products.forEach((product)=>{                 //se recorren todos los productos originales
    if(product.id === productId){               //si el id del producto original es igual al id del producto del carrito 
      matchingProduct=product;                   //se guarda en una variable el producto original
    };
  });
  return matchingProduct;
};



class Product {
  id;             //definimos propiedades indefinidas
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails){                  //el parametro guarda un objeto
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl(){
    return `images/ratings/rating-${this.rating.stars}.png`;
  }

  getPrice(){
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML(){        //si el producto no es ropa no se muestra nada (este metodo es para no generar un error)
    return '';
  }
}



class Clothing extends Product{               //la clase Clothing hereda de la clase Product
  sizeChartLink;                     //nuevo atributo a parte de los heredados

  constructor(productDetails){          //constructor de la clase padre
    super(productDetails);                //llama al constructor de la clase padre (y sus seteos)
    this.sizeChartLink = productDetails.sizeChartLink;        //nueva propiedad a setear
  }

  extraInfoHTML(){                                         //metodo que brinda informacion extra de talles para la ropa
    //super.extraInfoHTML()                                      //llamaria a un metodo de la clase padre
    return `
      <a href="${this.sizeChartLink}" target="_blank">
      Tabla de tallas
      </a>      
    `;                                                    //esto se invocara en el HTML de producto ropa
  }
}

/*
const date = new Date();                      ->  fecha de hoy (usa clases)
console.log(date);        
console.log(date.toLocaleTimeString());       -> me muestra la hora actual de mi pais
*/


/*
function logThis(){
  console.log(this)                  -> sera undefined
}

logThis.call('hello');             -> le puedo dar un valor a this
*/










/*                           SE CARGA LOS PRODUCTOS DESDE EL BACKEND           */       
export let products = [];


export function loadProductsFetch(){
  const promise = fetch(                          //guardamos la promesa en la variable promise
    'https://supersimplebackend.dev/products'

  ).then((response)=>{   

    return response.json();      

  }).then((productsData)=>{
    products = productsData.map((productDetails) =>{          //transorma JSON en un objeto y lo recorre

      if(productDetails.type==='clothing'){     //si el producto es ropa, se usa la clase Clothing
        return new Clothing(productDetails);        //para poder usar los nuevos atributos y metodos
      }
    
    
      return new Product(productDetails);         //el nuevo array con los objetos de la clase, se llamara products nuevamente
      //el array contendra productos de las dos clases
    });
    console.log('productos cargados')



  }).catch((error)=>{                    //se ejecuta cuando hay un error. el parametro contiene informacion adicional del error
    console.log('Unexpected error. Please try again later')         //similar al addEventListener 'error'
                                                                
  });       
  
  return promise
}

/*                                                  
loadProductsFetch().then(()=>{
  console.log('next step')
});
*/



/*    Fetch()
Por defecto las peticiones de Fetch son GET
Obtenemos el response y se ejecuta el then
Convertimos la solicitud de JSON a un objeto python (igual que JSON.parse)
Retornamos otra promesa, porque es asincrono y necesitamos esperar que finalice para continuar con el siguiente paso

*/ 



export function loadProducts(renderProductsGrid){                 //funcion que carga productos desde una URL
  const xhr = new XMLHttpRequest();                //crea una instancia de XMLHttpRequest para realizar una solicitud HTTP.

    xhr.addEventListener('load',()=>{
      products = JSON.parse(xhr.response).map((productDetails) =>{          //transorma JSON en un objeto y lo recorre

        if(productDetails.type==='clothing'){     //si el producto es ropa, se usa la clase Clothing
          return new Clothing(productDetails);        //para poder usar los nuevos atributos y metodos
        }
      
      
        return new Product(productDetails);         //el nuevo array con los objetos de la clase, se llamará products nuevamente
        //el array contendra productos de las dos clases
      });
      console.log('productos cargados')

      renderProductsGrid();
    });



    xhr.addEventListener('error', ()=>{            //ejecuta la funcion si ocurre un error durante la solicitud HTTP
      console.log('Unexpected error. Please try again later')  //el parametro suele contener informacion adicional del error
    });
    


    xhr.open('GET', 'https://supersimplebackend.dev/products')     //configura la solicitud HTTP para hacer un GET a la URL
    xhr.send();         //envía la solicitud al servidor. En este momento, la solicitud se realiza y comienza a esperar la respuesta
};

//el metodo ().map crea un nuevo arreglo con el resultado de la funcion que yo le pase







                                      

/*                                                   SIN BACKEND

export const products = [               //productos que se venden, con sus respectivos datos
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Calcetines de algodón negro y gris - 6 pares",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090,
    keywords: [
      "socks",
      "sports",
      "apparel"
    ]
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/products/intermediate-composite-basketball.jpg",
    name: "Balón de baloncesto de tamaño intermedio",
    rating: {
      stars: 4,
      count: 127
    },
    priceCents: 2095,
    keywords: [
      "sports",
      "basketballs"
    ]
  },
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Camiseta de algodón básica para adultos - 2 paquetes",
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 799,
    keywords: [
      "tshirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "Tostadora de 2 ranuras - Negra",
    rating: {
      stars: 5,
      count: 2197
    },
    priceCents: 1899,
    keywords: [
      "toaster",
      "kitchen",
      "appliances"
    ]
  },
  {
    id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    image: "images/products/6-piece-white-dinner-plate-set.jpg",
    name: "Juego de platos de cena blancos - 6 piezas",
    rating: {
      stars: 4,
      count: 37
    },
    priceCents: 2067,
    keywords: [
      "plates",
      "kitchen",
      "dining"
    ]
  },
  {
    id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
    image: "images/products/6-piece-non-stick-baking-set.webp",
    name: "Juego de utensilios para hornear antiadherente de 6 piezas",
    rating: {
      stars: 4.5,
      count: 175
    },
    priceCents: 3499,
    keywords: [
      "kitchen",
      "cookware"
    ]
  },
  {
    id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
    image: "images/products/plain-hooded-fleece-sweatshirt-yellow.jpg",
    name: "Sudadera con capucha de felpa sencilla",
    rating: {
      stars: 4.5,
      count: 317
    },
    priceCents: 2400,
    keywords: [
      "hoodies",
      "sweaters",
      "apparel"
    ]
  },
  {
    id: "77919bbe-0e56-475b-adde-4f24dfed3a04",
    image: "images/products/luxury-tower-set-6-piece.jpg",
    name: "Juego de toallas de lujo - Gris grafito",
    rating: {
      stars: 4.5,
      count: 144
    },
    priceCents: 3599,
    keywords: [
      "bathroom",
      "washroom",
      "restroom",
      "towels",
      "bath towels"
    ]
  },
  {
    id: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
    image: "images/products/liquid-laundry-detergent-plain.jpg",
    name: "Detergente líquido para ropa, 110 cargas, 82.5 fl oz",
    rating: {
      stars: 4.5,
      count: 305
    },
    priceCents: 2899,
    keywords: [
      "bathroom",
      "cleaning"
    ]
  },
  {
    id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
    image: "images/products/knit-athletic-sneakers-gray.jpg",
    name: "Zapatillas deportivas impermeables de punto - Gris",
    rating: {
      stars: 4,
      count: 89
    },
    priceCents: 3390,
    keywords: [
      "shoes",
      "running shoes",
      "footwear"
    ]
  },
  {
    id: "5968897c-4d27-4872-89f6-5bcb052746d7",
    image: "images/products/women-chiffon-beachwear-coverup-black.jpg",
    name: "Cubierta de playa de gasa para mujer - Negra",
    rating: {
      stars: 4.5,
      count: 235
    },
    priceCents: 2070,
    keywords: [
      "robe",
      "swimsuit",
      "swimming",
      "bathing",
      "apparel"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "aad29d11-ea98-41ee-9285-b916638cac4a",
    image: "images/products/round-sunglasses-black.jpg",
    name: "Gafas de sol redondas",
    rating: {
      stars: 4.5,
      count: 30
    },
    priceCents: 1560,
    keywords: [
      "accessories",
      "shades"
    ]
  },
  {
    id: "04701903-bc79-49c6-bc11-1af7e3651358",
    image: "images/products/women-beach-sandals.jpg",
    name: "Sandalias de dos correas para mujer - Marrón",
    rating: {
      stars: 4.5,
      count: 562
    },
    priceCents: 2499,
    keywords: [
      "footwear",
      "sandals",
      "womens",
      "beach",
      "summer"
    ]
  },
  {
    id: "901eb2ca-386d-432e-82f0-6fb1ee7bf969",
    image: "images/products/blackout-curtain-set-beige.webp",
    name: "Juego de cortinas blackout 4-pack - Beige",
    rating: {
      stars: 4.5,
      count: 232
    },
    priceCents: 4599,
    keywords: [
      "bedroom",
      "curtains",
      "home"
    ]
  },
  {
    id: "82bb68d7-ebc9-476a-989c-c78a40ee5cd9",
    image: "images/products/men-slim-fit-summer-shorts-gray.jpg",
    name: "Pantalones cortos de verano ajustados para hombres",
    rating: {
      stars: 4,
      count: 160
    },
    priceCents: 1699,
    keywords: [
      "shorts",
      "apparel",
      "mens"
    ]
  },
  {
    id: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
    image: "images/products/electric-glass-and-steel-hot-water-kettle.webp",
    name: "Hervidor de agua eléctrico de vidrio y acero - 1.7 litros",
    rating: {
      stars: 5,
      count: 846
    },
    priceCents: 3074,
    keywords: [
      "water boiler",
      "appliances",
      "kitchen"
    ]
  },
  {
    id: "6b07d4e7-f540-454e-8a1e-363f25dbae7d",
    image: "images/products/facial-tissue-2-ply-18-boxes.jpg",
    name: "Papel higiénico ultra suave 2 capas - 18 cajas",
    rating: {
      stars: 4,
      count: 99
    },
    priceCents: 2374,
    keywords: [
      "kleenex",
      "tissues",
      "kitchen",
      "tissues box",
      "napkins"
    ]
  },
  {
    id: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
    image: "images/products/straw-sunhat.webp",
    name: "Sombrero de paja de salvavidas",
    rating: {
      stars: 4,
      count: 215
    },
    priceCents: 2200,
    keywords: [
      "hats",
      "straw hats",
      "summer",
      "apparel"
    ]
  },
  {
    id: "e4f64a65-1377-42bc-89a5-e572d19252e2",
    image: "images/products/sky-flower-stud-earrings.webp",
    name: "Pendientes de aro de plata esterlina con diseño de flor",
    rating: {
      stars: 4.5,
      count: 52
    },
    priceCents: 1799,
    keywords: [
      "jewelry",
      "accessories",
      "womens"
    ]
  },
  {
    id: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
    image: "images/products/women-stretch-popover-hoodie-black.jpg",
    name: "Sudadera con capucha de mujer - Negra",
    rating: {
      stars: 4.5,
      count: 2465
    },
    priceCents: 1374,
    keywords: [
      "hooded",
      "hoodies",
      "sweaters",
      "womens",
      "apparel"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a",
    image: "images/products/bathroom-rug.jpg",
    name: "Alfombra de baño 20 x 31 pulgadas - Gris",
    rating: {
      stars: 4.5,
      count: 119
    },
    priceCents: 1250,
    keywords: [
      "bathmat",
      "bathroom",
      "home"
    ]
  },
  {
    id: "4f4fbcc2-4e72-45cc-935c-9e13d79cc57f",
    image: "images/products/women-knit-ballet-flat-black.jpg",
    name: "Bailarinas de punto para mujer - Negra",
    rating: {
      stars: 4,
      count: 326
    },
    priceCents: 2640,
    keywords: [
      "shoes",
      "flats",
      "womens",
      "footwear"
    ]
  },
  {
    id: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
    image: "images/products/men-golf-polo-t-shirt-blue.jpg",
    name: "Camisa polo de secado rápido de ajuste regular para hombres",
    rating: {
      stars: 4.5,
      count: 2556
    },
    priceCents: 1599,
    keywords: [
      "tshirts",
      "shirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "b86ddc8b-3501-4b17-9889-a3bad6fb585f",
    image: "images/products/trash-can-with-foot-pedal-50-liter.jpg",
    name: "Cubeta de basura con pedal - Acero inoxidable cepillado",
    rating: {
      stars: 4.5,
      count: 2286
    },
    priceCents: 8300,
    keywords: [
      "garbage",
      "bins",
      "cans",
      "kitchen"
    ]
  },
  {
    id: "19c6a64a-5463-4d45-9af8-e41140a4100c",
    image: "images/products/duvet-cover-set-blue-twin.jpg",
    name: "Juego de funda nórdica con cierre de cremallera",
    rating: {
      stars: 4,
      count: 456
    },
    priceCents: 2399,
    keywords: [
      "bedroom",
      "bed sheets",
      "sheets",
      "covers",
      "home"
    ]
  },
  {
    id: "d2785924-743d-49b3-8f03-ec258e640503",
    image: "images/products/women-chunky-beanie-gray.webp",
    name: "Gorro de lana grueso para mujer - Gris",
    rating: {
      stars: 5,
      count: 83
    },
    priceCents: 1250,
    keywords: [
      "hats",
      "winter hats",
      "beanies",
      "tuques",
      "apparel",
      "womens"
    ]
  },
  {
    id: "ee1f7c56-f977-40a4-9642-12ba5072e2b0",
    image: "images/products/men-chino-pants-beige.jpg",
    name: "Pantalones chinos de corte clásico para hombres",
    rating: {
      stars: 4.5,
      count: 9017
    },
    priceCents: 2290,
    keywords: [
      "pants",
      "apparel",
      "mens"
    ]
  },
  {
    id: "1c079479-8586-494f-ab53-219325432536",
    image: "images/products/men-athletic-shoes-green.jpg",
    name: "Zapatillas deportivas para hombres",
    rating: {
      stars: 4,
      count: 229
    },
    priceCents: 3890,
    keywords: [
      "shoes",
      "running shoes",
      "footwear",
      "mens"
    ]
  },
  {
    id: "4df68c27-fd59-4a6a-bbd1-e754ddb6d53c",
    image: "images/products/men-navigator-sunglasses-brown.jpg",
    name: "Gafas de sol piloto para hombres",
    rating: {
      stars: 3.5,
      count: 42
    },
    priceCents: 1690,
    keywords: [
      "sunglasses",
      "glasses",
      "accessories",
      "shades"
    ]
  },
  {
    id: "4e37dd03-3b23-4bc6-9ff8-44e112a92c64",
    image: "images/products/non-stick-cooking-set-15-pieces.webp",
    name: "Juego de utensilios de cocina antiadherentes - 15 piezas",
    rating: {
      stars: 4.5,
      count: 511
    },
    priceCents: 6797,
    keywords: [
      "cooking set",
      "kitchen"
    ]
  },
  {
    id: "a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d",
    image: "images/products/vanity-mirror-silver.jpg",
    name: "Espejo de tocador con base pesada - Cromo",
    rating: {
      stars: 4.5,
      count: 130
    },
    priceCents: 1649,
    keywords: [
      "bathroom",
      "washroom",
      "mirrors",
      "home"
    ]
  },
  {
    id: "a45cfa0a-66d6-4dc7-9475-e2b01595f7d7",
    image: "images/products/women-french-terry-fleece-jogger-camo.jpg",
    name: "Pantalones deportivos de felpa para mujer",
    rating: {
      stars: 4.5,
      count: 248
    },
    priceCents: 2400,
    keywords: [
      "pants",
      "sweatpants",
      "jogging",
      "apparel",
      "womens"
    ]
  },
  {
    id: "d339adf3-e004-4c20-a120-40e8874c66cb",
    image: "images/products/double-elongated-twist-french-wire-earrings.webp",
    name: "Pendientes de oro con doble lazo ovalado",
    rating: {
      stars: 4.5,
      count: 117
    },
    priceCents: 2400,
    keywords: [
      "accessories",
      "womens"
    ]
  },
  {
    id: "d37a651a-d501-483b-aae6-a9659b0757a0",
    image: "images/products/round-airtight-food-storage-containers.jpg",
    name: "Contenedores de almacenamiento de alimentos herméticos - 5 piezas",
    rating: {
      stars: 4,
      count: 126
    },
    priceCents: 2899,
    keywords: [
      "boxes",
      "food containers",
      "kitchen"
    ]
  },
  {
    id: "0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524",
    image: "images/products/coffeemaker-with-glass-carafe-black.jpg",
    name: "Cafetera con jarra de vidrio y filtro reutilizable - 25 oz, Negra",
    rating: {
      stars: 4.5,
      count: 1211
    },
    priceCents: 2250,
    keywords: [
      "coffeemakers",
      "kitchen",
      "appliances"
    ]
  },
  {
    id: "02e3a47e-dd68-467e-9f71-8bf6f723fdae",
    image: "images/products/blackout-curtains-black.jpg",
    name: "Juego de cortinas blackout 42 x 84 pulgadas - Negra, 2 paneles",
    rating: {
      stars: 4.5,
      count: 363
    },
    priceCents: 3099,
    keywords: [
      "bedroom",
      "home"
    ]
  },
  {
    id: "8a53b080-6d40-4a65-ab26-b24ecf700bce",
    image: "images/products/cotton-bath-towels-teal.webp",
    name: "Toallas de baño 100% algodón - 2 paquetes, Teal claro",
    rating: {
      stars: 4.5,
      count: 93
    },
    priceCents: 2110,
    keywords: [
      "bathroom",
      "home",
      "towels"
    ]
  },
  {
    id: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
    image: "images/products/knit-athletic-sneakers-pink.webp",
    name: "Zapatillas deportivas impermeables de punto - Rosa",
    rating: {
      stars: 4,
      count: 89
    },
    priceCents: 3390,
    keywords: [
      "shoes",
      "running shoes",
      "footwear",
      "womens"
    ]
  },
  {
    id: "77a845b1-16ed-4eac-bdf9-5b591882113d",
    image: "images/products/countertop-blender-64-oz.jpg",
    name: "Licuadora de mostrador - 64 oz, 1400 Watts",
    rating: {
      stars: 4,
      count: 3
    },
    priceCents: 10747,
    keywords: [
      "food blenders",
      "kitchen",
      "appliances"
    ]
  },
  {
    id: "36c64692-677f-4f58-b5ec-0dc2cf109e27",
    image: "images/products/floral-mixing-bowl-set.jpg",
    name: "Juego de tazones para mezclar de 10 piezas - Floral",
    rating: {
      stars: 5,
      count: 679
    },
    priceCents: 3899,
    keywords: [
      "mixing bowls",
      "baking",
      "cookware",
      "kitchen"
    ]
  },
  {
    id: "aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f",
    image: "images/products/kitchen-paper-towels-30-pack.jpg",
    name: "Toallas de cocina 2 capas - 30 paquetes",
    rating: {
      stars: 4.5,
      count: 1045
    },
    priceCents: 5799,
    keywords: [
      "kitchen",
      "kitchen towels",
      "tissues"
    ]
  },
  {
    id: "bc2847e9-5323-403f-b7cf-57fde044a955",
    image: "images/products/men-cozy-fleece-zip-up-hoodie-red.jpg",
    name: "Sudadera de felpa con cierre de cremallera para hombres",
    rating: {
      stars: 4.5,
      count: 3157
    },
    priceCents: 2400,
    keywords: [
      "sweaters",
      "hoodies",
      "apparel",
      "mens"
    ]
  }
].map((productDetails) =>{                    //este parametro representa cada objeto producto

  if(productDetails.type==='clothing'){     //si el producto es ropa, se usa la clase Clothing
    return new Clothing(productDetails);        //para poder usar los nuevos atributos y metodos
  }


  return new Product(productDetails);         //el nuevo array con los objetos de la clase, se llamara products nuevamente
  //el array contendra productos de las dos clases
});

*/