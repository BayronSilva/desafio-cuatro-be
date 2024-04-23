// const socket = io();

// socket.on("productos", (data) => {
//     renderProductos(data);
// })

// //Función para renderizar el listado de productos
// const renderProductos = (productos) => {
//     const contenedorProductos = document.getElementById("contenedorProductos");
//     contenedorProductos.innerHTML = "";

//     productos.forEach(item => {
//         const card = document.createElement("div");
//         card.innerHTML = `
//                             <h2> Titulo:  ${item.title} </h2>
//                             <p> ID: ${item.id} </p>
//                             <p> Precio: ${item.price} </p>
//                             <button> Eliminar producto </button>
//                         `;
//         contenedorProductos.appendChild(card);

//         //Agregamos el evento al boton de eliminar producto: 
//         card.querySelector("button").addEventListener("click", () => {
//             eliminarProducto(item.id)
//         })
//     })
// }

// //Eliminar producto: 
// const eliminarProducto = (id) => {
//     socket.emit("eliminarProducto", id);
// }

// //Agregar producto
// document.getElementById("btnAgregarProducto").addEventListener("click", () => {
//     const producto = {
//         title: document.getElementById("title").value,
//         description: document.getElementById("description").value,
//         price: document.getElementById("price").value,
//         img: document.getElementById("img").value,
//         code: document.getElementById("code").value,
//         stock: document.getElementById("stock").value,
//         category: document.getElementById("category").value,
//         status: document.getElementById("status").value === "true",
//     };
//     socket.emit("agregarProducto", producto);
// });


//Creamos una instancia de socket.io del lado del cliente ahora: 
const socket = io(); 

//Creamos una variable para guardar el usuario: 
let user; 
const chatBox = document.getElementById("chatBox");

//Sweet Alert 2: es una librería que nos permite crear alertas personalizadas. 

//Swal es un objeto global que nos permite usar los métodos de la libreria.  
//Fire es un método que nos permite configurar el alerta.

Swal.fire({
    title: "Identificate", 
    input: "text",
    text: "Ingresa un usuario para identificarte en el chat", 
    inputValidator: (value) => {
        return !value && "Necesitas escribir un nombre para continuar"
    }, 
    allowOutsideClick: false,
}).then( result => {
    user = result.value;
})


chatBox.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        if(chatBox.value.trim().length > 0) {
            socket.emit("message", {user: user, message: chatBox.value}); 
            chatBox.value = "";
        }
    }
})

//Listener de Mensajes: 
socket.on("message", data => {
    let log = document.getElementById("messagesLogs");
    let messages = "";

    data.forEach( message => {
        messages = messages + `${message.user} dice: ${message.message} <br>`
    })

    log.innerHTML = messages;
})