   // const texto= document.getElementById(".parr");

   

   

   // const contenedor =document.getElementById("contenedor")

   

   const listadoArticulos = [

         { id:1, nombre: "camiseta titular", precio: 9500, img: "titular.webp"},
         { id:2, nombre: "camiseta suplente", precio: 8700, img:"camisetahomenaje.jpg" },
         { id:3, nombre: "buzo GIVOVA", precio: 10500, img: "buzo.jpg"},
         { id:4, nombre: "campera oficial", precio: 12000, img: "campera.jpg"},
         { id:5,nombre:"musculosas femeninas",precio: 4500, img: "musculosas.jpg"},
         { id:6,nombre: "calzas deportivas", precio:5500, img:"calza.webp" },
         { id:7,nombre:"camisetas niños/as",precio: 6500, img: "camiseta niñosjpg.jpg"},

   ];


   const mediosPago= ["Efectivo", "Tarjeta de Débito", "Tarjeta de Crédito", "Transferencia"];

   
   const ul  = document.getElementById("lista");


   const containerDiv = document.querySelector("#container");

   const carritoDiv = document.querySelector(".carrito");

   let carrito= JSON.parse(localStorage.getItem("carrito")) || [];

   const cajaDeTexto = document.querySelectorAll("#formulario");

   const form =document.querySelector("form");

   const input =  document.getElementById("ingreso");

   const search = document.querySelector("#search");

   // const nombre= document.querySelector("nombre");

   // const id= document.querySelector("id");
  
   // const lista= document.querySelector(".lista");

   const footer = document.getElementById("footer");

   const frase= document.createElement("p");

   const base = document.querySelector("#base");
  
   //JSON
   const btn = document.getElementById("btnIngresar"),

   checkbox = document.getElementById("checkbox"),

    email = document.getElementById("email"),

    password = document.getElementById("password"),

    p = document.querySelector(".mensaje");

   btn.value = "Registrar";
    

   function crearCards (arr){

      let html = "";  
      for (const element of arr) {
         html = ` <div class="card">
         <h4>${element.nombre}</h4>
         <p>$${element.precio}</p>
         <img src="../images/${element.img}" alt="Imagen">
         <button class="btnCarrito" id="btn-agregar${element.id}">COMPRAR</button>
     </div> `
     containerDiv.innerHTML += html;
     
      }

      agregarFuncionAlBoton(listadoArticulos);
   }

      crearCards(listadoArticulos);   
     
     function agregarFuncionAlBoton(arr){
      for (const el of arr) {
         document.querySelector(`#btn-agregar${el.id}`).addEventListener("click" , ()=>{
            agregarAlCarrito(el)
         })
         
      }  
     }
   // function agregarFuncionAlBoton(){
   //    listadoArticulos.forEach(el=>{
   //       document.querySelector(`#btn-agregar${el.id}`).addEventListener("click" , ()=>{
   //         agregarAlCarrito(el)
   //       })
   //    })
   // }


   function agregarAlCarrito(el){
    
      let existe = carrito.some(articulo=>articulo.id === el.id);
      if (existe === false){
         el.cantidad=1;
         carrito.push(el);
      }

      else {
         let artFind = carrito.find(articulo=> articulo.id===el.id)
         artFind.cantidad++;
      }
     console.log(carrito);

     renderizarCarrito();
   }


   function renderizarCarrito(){
      carritoDiv.innerHTML ="";
      carrito.forEach(art=>{
         carritoDiv.innerHTML +=` <div class="card">
         <h4>${art.nombre}</h4>
         <h3>Cantidad: ${art.cantidad}</h3>
         <img class="img_carrito" src="../images/carrito.png" alt="carrito">
         <p>$${art.precio}</p>
         <button class="btnCarrito" id="btn-eliminar${art.id}">ELIMINAR</button>
     </div>
 `
      })
      
      localStorage.setItem("carrito", JSON.stringify(carrito))

      eliminarArticulo();
   }


   function eliminarArticulo(){
        carrito.forEach(art=>{
         document.querySelector(`#btn-eliminar${art.id}`).addEventListener("click", ()=>{
            let indice = carrito.findIndex(element=>element.id===art.id)
            carrito.splice(indice,1)
            renderizarCarrito();

         })

      })
   }

   renderizarCarrito();

  

   function importeTotal (){
      carrito.reduce((acc, el)=>{
         return acc + el.precio;
      }, 0);
   }
   
   importeTotal ()

   


 

   frase.innerText="Visitá nuestra tienda física en el Paseo del Jockey "

   footer.append(frase);

    
   for (const pagos of mediosPago) {

      let li = document.createElement("li");
      li.innerText = pagos;
      ul.append(li);
      
   };

   base.addEventListener("mousemove" ,()=>{
      base.style.color="navy"
   });



   cajaDeTexto[0].addEventListener("change" , ()=>{
      console.log("cambio");
   })

   cajaDeTexto[1].addEventListener("change", ()=>{
      console.log("cambio");
   })

   cajaDeTexto[2].addEventListener("change" , ()=>{
      console.log("cambio");
   })


  
    function filtrarArticulos (arr, filtro){
       return arr.filter((el)=>{
          return el.nombre.includes(filtro);
      });
      
    }


    search.addEventListener("click", ()=>{
         let nuevoFiltro = filtrarArticulos (listadoArticulos, input.value);
        console.log(nuevoFiltro);
        containerDiv.innerHTML= ""; 
        
        crearCards(nuevoFiltro); 
        agregarFuncionAlBoton(nuevoFiltro)
      }) ;
    
  //ver porque no me toma la funcion del boton


  
       

   form.addEventListener("submit", (e)=>{

      e.preventDefault()

      let formulario =e.target

      console.log(e.target);
      console.log(formulario.children[0].value);
      console.log(formulario.children[1].value);
      console.log(formulario.children[2].value);
      
      
   }) 


   //cargar el array listadoArticulos

   function cargarArticulos (arr, obj){
      return arr.push(obj);
   };


   // comprar.addEventListener("click", ()=>{

   //    const nuevoArt = new listadoArticulos(id.value, nombre.value )
   //    cargarArticulos (listadoArticulos, )

   //    console.log(nuevoArt);

   //    cargarArticulos(Articulos, nuevoArt);
   // });



   //JSON

   localStorage.setItem("listadoArticulos", JSON.stringify(listadoArticulos))
   console.log(JSON.parse( localStorage.getItem("listadoArticulos")));


   


   function guardar (variable){
      let usuario = {usuario: email.value, password: password.value}
       if(variable=== "sessionStorage"){
         sessionStorage.setItem("usuario", JSON.stringify(usuario));
       }

       if(variable==="localStorage"){
         localStorage.setItem("usuario", JSON.stringify(usuario))
       }

       return usuario;
   }

   function recuperarDatos(datos){
      if(datos){
         email.value= datos.usuario;
         password.value=datos.password;
      }
   }


   recuperarDatos( JSON.parse(localStorage.getItem("usuario")))

   btn.addEventListener("clcik", (e)=>{
      e.preventDefault()
   
   checkbox.checked ? guardar("localStorage"):guardar("sessionStorage")
   });
      // function guardar(valor) {
   //    let user = { username: email.value, password: password.value };
    
   //    if (valor === "sessionStorage") {
   //      sessionStorage.setItem("user", JSON.stringify(user));
   //    }
   //    if (valor === "localStorage") {
   //      localStorage.setItem("user", JSON.stringify(user));
   //    }
   //    return user;
   //  }
    
   //  function recuperarDatos(datos) {
   //    if (datos) {
   //      email.value = datos.username;
   //      password.value = datos.password;
   //    }
   //  }
    
   //  recuperarDatos(JSON.parse(localStorage.getItem("user")));
    
   //  btn.addEventListener("click", (e) => {
   //    e.preventDefault();

   //   

     
        
//libreria

   //   Swal.fire({
   //    icon: 'sucess',
   //    title: 'Registrado exitosamente',
   //    text: 'Ya sos parte de la comunidad albiazul',
   //    footer: '<a href="./index.html">Volver a Inicio</a>'
   //  });
      
      
   

    
    
// fetch('./js/data.json').
// then((response)=>
// response.json()).
// then((datos)=>{
//    console.log(datos);
   

// });

// const respuesta =async ()=>{
//    const response = await fetch('./js/data.json');

//    const data=await response.json();

 
// }
// respuesta ();

