// document.addEventListener('DOMContentLoaded', function () {
//   const miniaturas = document.querySelectorAll('.miniatura');
//   const imagenPrincipal = document.getElementById('imagen-principal');

//   miniaturas.forEach(function (miniatura) {
//     miniatura.addEventListener('click', function () {
//       const nuevaSrc = this.getAttribute('src');
//       imagenPrincipal.setAttribute('src', nuevaSrc);
//     });
//   });
// });


const productos = {
  "adonis": {
    titulo: "Adonis",
    artista: "Luisa Ovalle",
    precio: "$150.000",
    imagenes: [
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746557378/ceramica-rostro-azul-4_jfc0e6.png",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746556655/ceramica-rostro-azul-3_l1np0o.png",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746556654/ceramica-rostro-azul-2_iloyip.png"
    ]
  },
  "sentipensar": {
    titulo: "Sentipensar",
    artista: "Julian Ramirez",
    precio: "$220.000",
    imagenes: [
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746568965/pintura-oleo-colores-2_shhwwj.png",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746568964/pintura-oleo-colores-3_fzggvc.png",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746568964/pintura-oleo-colores-4_g5jgyi.png"
    ]
  },
  "lastresmarias": {
    titulo: "Las Tres Marias",
    artista: "Rosa Aguilar",
    precio: "$50.000",
    imagenes: [
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746556655/bordado-hilo-amigas-2_biz7qb.png",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746556655/bordado-hilo-amigas-3_wiem20.png",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746556656/bordado-hilo-amigas-4_z9vzlu.png"
    ]
  },
  "atardecercafe": {
    titulo: "Atardecer Café",
    artista: "Carlos Rodriguez",
    precio: "$80.000",
    imagenes: [
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630055/pintura-oleo-cafe-2_af77k1.jpg",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630056/pintura-oleo-cafe-3_ofdrof.jpg",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630059/pintura-oleo-cafe-4_z6tfr5.jpg"
    ]
  },
  "pasion": {
    titulo: "Pasión",
    artista: "Laura Dominguez",
    precio: "$1.150.000",
    imagenes: [
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746628010/pintura-oleo-rojoYNaranja-2_wusrxg.jpg",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746628010/pintura-oleo-rojoYNaranja-3_kgtw4q.jpg",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746628010/pintura-oleo-rojoYNaranja-4_mqglyo.jpg"
    ]
  },
  "floressiendo": {
    titulo: "Flores Siendo",
    artista: "Camila López",
    precio: "$250.000",
    imagenes: [
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746556655/ceramica-jarron-flores_j2iamf.jpg",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746556656/ceramica-jarron-flores-3_rfxeno.png",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746556656/ceramica-jarron-flores-4_q7hguq.png"
    ]
  },
  "floreciendo": {
    titulo: "Floreciendo",
    artista: "Camila López",
    precio: "$319.500",
    imagenes: [
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746568187/ceramica-matera-2_n1aznq.png",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746568188/ceramica-matera-3_mmgbuz.png",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746568186/ceramica-matera-4_xrlyhg.png"
    ]
  },
  "te": {
    titulo: "Té",
    artista: "Ramiro Alvarado",
    precio: "$120.000",
    imagenes: [
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746572135/ceramica-pocillo-azul-2_vyukyc.png",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746572136/ceramica-pocillo-azul-3_fnggfe.png",
      "img/sintitulo3.jpg"
    ]
  },
  "luisajulieta": {
    titulo: "Luisa + Julieta",
    artista: "Luz Torres",
    precio: "$100.000",
    imagenes: [
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630055/bordado-medias-2_mg3o9s.jpg",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630055/bordado-medias-3_vs8zgw.jpg",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630055/bordado-medias-4_rvuwfa.jpg"
    ]
  },
  "macrameblanco": {
    titulo: "Macramé Blanco",
    artista: "Mónica Lizeth",
    precio: "$154.000",
    imagenes: [
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630060/tejido-blanco-pared-2_ogcbsy.jpg",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630060/tejido-blanco-pared-3_ms9ite.jpg",
      "https://res.cloudinary.com/dmkgdtntx/image/upload/v1746630061/tejido-blanco-pared-4_zjyhkd.jpg"
    ]
  },
  // "Key": {
  //   titulo: "",
  //   artista: "Nombre Apellido",
  //   precio: "$",
  //   imagenes: [
  //     "img/sintitulo1.jpg",
  //     "img/sintitulo2.jpg",
  //     "img/sintitulo3.jpg"
  //   ]
  // },

  // Se puede seguir agregando más productos con su ID correspondiente
};



document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productoId = urlParams.get("id");

  // Intentar cargar desde productos hardcodeados
  if (productoId && productos[productoId]) {
    const producto = productos[productoId];

    document.querySelector(".descripcion-box h5").textContent = `Obra: ${producto.titulo}`;
    document.querySelector(".descripcion-box p.text-muted").textContent = `Artista: ${producto.artista}`;
    document.querySelector(".descripcion-box h4").textContent = producto.precio;

    const imagenPrincipal = document.getElementById("imagen-principal");
    imagenPrincipal.src = producto.imagenes[0];
    imagenPrincipal.alt = `Imagen de ${producto.titulo}`;

    const miniaturas = document.querySelectorAll(".miniatura");
    miniaturas.forEach((img, index) => {
      img.src = producto.imagenes[index] || producto.imagenes[0];
      img.alt = `Miniatura ${index + 1} de ${producto.titulo}`;
      img.classList.remove("seleccionada");
      if (index === 0) img.classList.add("seleccionada");

      img.addEventListener("click", () => {
        imagenPrincipal.src = img.src;
        miniaturas.forEach(m => m.classList.remove("seleccionada"));
        img.classList.add("seleccionada");
      });
    });

    return;
  }

  // Si no está hardcodeado, buscar en productos del localStorage
  const productList = JSON.parse(localStorage.getItem("productList")) || [];
  const producto = productList.find(p => p.id === productoId);

  if (!producto) {
    alert("Producto no encontrado.");
    return;
  }

  document.querySelector(".descripcion-box h5").textContent = `Obra: ${producto.artName}`;
  document.querySelector(".descripcion-box p.text-muted").textContent = `Artista: ${producto.artistName}`;
  document.querySelector(".descripcion-box p:nth-of-type(3)").textContent = producto.artDescription;
  document.querySelector(".descripcion-box h4").textContent = `$${producto.price.toLocaleString("es-CO")}`;

  const imagenPrincipal = document.getElementById("imagen-principal");
  imagenPrincipal.src = producto.thumbnails[0];
  imagenPrincipal.alt = producto.artName;

  const miniaturas = document.querySelectorAll(".miniatura");
  miniaturas.forEach((img, index) => {
    img.src = producto.thumbnails?.[index] || producto.urlImg;
    img.alt = `${producto.artName} ${index + 1}`;
    img.classList.remove("seleccionada");
    if (index === 0) img.classList.add("seleccionada");

    img.addEventListener("click", () => {
      imagenPrincipal.src = img.src;
      miniaturas.forEach(m => m.classList.remove("seleccionada"));
      img.classList.add("seleccionada");
    });
  });

});

  // ../js/producto.js Fragmento de codigo para el carrito

document.addEventListener('DOMContentLoaded', () => {
  const btnAnadir = document.getElementById('btn-anadir-carrito');

  if (btnAnadir) {
    btnAnadir.addEventListener('click', () => {
      const urlParams = new URLSearchParams(window.location.search);
      const productoId = urlParams.get("id");
      
      // Obtener producto de los datos hardcodeados o del localStorage
      const producto = productos[productoId] || 
        JSON.parse(localStorage.getItem("productList")).find(p => p.id === productoId);

      if (!producto) {
        alert("Producto no encontrado.");
        return;
      }

      // Crear objeto producto para el carrito
      const nuevoProducto = {
        id: productoId,
        nombre: producto.titulo || producto.artName,
        artista: producto.artista || producto.artistName,
        tipo: producto.tipo || producto.artDescription || "Pintura, Técnica mixta",
        tamano: producto.tamano || "45.5 W x 39 H x 0.3 D cm",
        imagen: producto.imagenes?.[0] || producto.thumbnails?.[0] || producto.urlImg || "ruta/a/imagen.jpg",
        precio: parseFloat((producto.precio || producto.price || "150000").replace(/[^\d]/g, '')) || 150000,
        cantidad: 1
      };

      // Obtener carrito actual o crear uno nuevo
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      
      // Verificar si el producto ya está en el carrito
      const productoExistente = carrito.find(item => item.id === productoId);
      
      if (productoExistente) {
        // Incrementar cantidad si ya existe
        productoExistente.cantidad += 1;
      } else {
        // Agregar nuevo producto al carrito
        carrito.push(nuevoProducto);
      }

      // Guardar carrito actualizado
      localStorage.setItem('carrito', JSON.stringify(carrito));
      
      // Notificar al usuario
      alert(`"${nuevoProducto.nombre}" ha sido añadido al carrito`);
      
      // Opcional: Redirigir al carrito
      // window.location.href = 'carrito.html';
    });
  }
});