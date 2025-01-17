const xhr = new XMLHttpRequest();   //se crea una instancia de XMLHttpRequest, que es una interfaz en JavaScript para realizar solicitudes HTTP a servidores web


xhr.addEventListener('load', ()=>{   //esto se ejecuta despues del send
  console.log(xhr.response);
})

// load es el evento que ocurre cuando la solicitud HTTP realizada por xhr se completa correctamente y el servidor devuelve una respuesta. Este evento garantiza que los datos solicitados están listos para ser utilizados. la funcion console se activa cuando el evento load ocurre


xhr.open('GET','https://supersimplebackend.dev/hello');   //primer parametro: que tipo de mensaje HTTP será, segundo parametro: donde enviar ese mensaje HTTPS
//GET obtiene informacion del backend

xhr.send();                  //envia el mensaje a traves del internet al backend del otro lado





/*

xhr.response      -> el navegador no espera a que el servidor responda antes de continuar ejecutando el resto del código

al llamar a xhr.send(), la solicitud se envía al servidor, pero la respuesta aún no ha llegado. por eso si intentas hacer console.log(xhr.response) inmediatamente después de xhr.send(), el navegador todavía no ha recibido la respuesta, y xhr.response estará undefinido.

*/



















