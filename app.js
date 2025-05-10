
const menu = document.querySelector('.menu');
const menuHamburguesa = document.querySelector('.menu_hamburguesa');
const btnSubir = document.querySelector('.btn_flotante')


document.addEventListener('DOMContentLoaded', () => {
    eventos();
    servicios();
})

// creacion del menu desplegable//

const eventos = () => {
    menuHamburguesa.addEventListener('click', abrirMenu);
};

const abrirMenu = () => {
    menu.classList.remove('ocultar');
    botonCerrar();
}

const botonCerrar = () => {
    const btnCerrar = document.createElement('p');
    btnCerrar.textContent = 'X';
    btnCerrar.classList.add('btn_cerrar');
    menu.appendChild(btnCerrar);

    cerrarMenu(btnCerrar)
}

const cerrarMenu = (boton) => {
    boton.addEventListener('click', () => {
        menu.classList.add('ocultar');
        boton.remove()
    })
}

//creacion del array contenedor//

const servicios = () => {
    let serviciosArray = [];

    const serviciosDOM = document.querySelectorAll('.productos_tienda');

    serviciosDOM.forEach(servicio => serviciosArray = [...serviciosArray, servicio]);

    const tortas = serviciosArray.filter(torta => torta.getAttribute('data-productos') === 'torta');
    const pasteles = serviciosArray.filter(pastel => pastel.getAttribute('data-productos') === 'pasteles');
    const helados = serviciosArray.filter(helado => helado.getAttribute('data-productos') === 'helados');

    mostrarProductos(tortas, pasteles, helados, serviciosArray);
};

const mostrarProductos = (tortas, pasteles, helados, todos) => {
    const btnTortas = document.querySelector('.tortas');
    const btnHelados = document.querySelector('.helados');
    const btnPasteles = document.querySelector('.pasteles');
    const btnTodos = document.querySelector('.todos');
    const contenedorProductos = document.querySelector('.productos_contenedor');

    btnTortas.addEventListener('click', () => {
        contenedorProductos.innerHTML = '';
        tortas.forEach(torta => contenedorProductos.appendChild(torta));
    });

    btnHelados.addEventListener('click', () => {
        contenedorProductos.innerHTML = '';
        helados.forEach(helado => contenedorProductos.appendChild(helado));
    });

    btnPasteles.addEventListener('click', () => {
        contenedorProductos.innerHTML = '';
        pasteles.forEach(pastel => contenedorProductos.appendChild(pastel));
    });

    btnTodos.addEventListener('click', () => {
        contenedorProductos.innerHTML = '';
        todos.forEach(item => contenedorProductos.appendChild(item));
    });
};

// confirmacion de credenciales forrmnulario//

const formularios = document.querySelectorAll(".formulario");

formularios.forEach((formulario) => {
    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = formulario.querySelector("#nombre").value.trim();
        const apellido = formulario.querySelector("#apellido").value.trim();
        const correo = formulario.querySelector("#correo").value.trim();
        const telefono = formulario.querySelector("#telefono").value.trim();
        const mensaje = formulario.querySelector("textarea").value.trim();

        const soloLetras = /^[a-zA-Z\s]+$/;
        const soloNumeros = /^[0-9]+$/;
        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nombre || !soloLetras.test(nombre)) {
            alert("Por favor, ingresa un nombre válido (solo letras).");
            return;
        }

        if (!apellido || !soloLetras.test(apellido)) {
            alert("Por favor, ingresa un apellido válido (solo letras).");
            return;
        }

        if (!correoRegex.test(correo)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        if (!telefono || !telefono.replace(/\D/g, "").match(soloNumeros)) {
            alert("Por favor, ingresa un teléfono válido (solo números).");
            return;
        }

        if (!mensaje || mensaje.length < 10) {
            alert("Por favor, ingresa un mensaje de al menos 10 caracteres.");
            return;
        }


        alert("Formulario enviado correctamente.");
        formulario.reset();
    });
});

// carrito de compras //

// Variables globales//

let carrito = [];
const carritoNumero = document.getElementById('carrito-numero');
const modalCarrito = document.getElementById('modal-carrito');
const modalPago = document.getElementById('modal-pago');
const productosCarrito = document.getElementById('productos-carrito');
const cerrarCarrito = document.getElementById('cerrar-carrito');
const cerrarPago = document.getElementById('cerrar-pago');
const btnPagar = document.getElementById('btn-pagar');

// funciones principales//

function actualizarTotal() {
    const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
    const totalCarrito = document.getElementById('total-carrito');
    totalCarrito.textContent = `$${total.toLocaleString()}`;
}

function actualizarCarrito() {
    carritoNumero.innerText = carrito.length;
}

function mostrarCarrito() {
    productosCarrito.innerHTML = '';
    carrito.forEach((producto, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto-carrito');
        productoDiv.innerHTML = `
            <img src="${producto.img}" alt="${producto.nombre}" width="250">
            <p class= "parrafo-nombre">${producto.nombre}</p>
            <p class="parrafo-precio">$${producto.precio}</p>
            <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        productosCarrito.appendChild(productoDiv);
    });

    actualizarTotal();
}

function agregarAlCarrito(producto) {
    carrito.push(producto);
    actualizarCarrito();
    mostrarCarrito();
}


function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
    mostrarCarrito();
}

// eventos de tipo boton//

document.querySelectorAll('.productos_tienda button').forEach((button) => {
    button.addEventListener('click', (e) => {
        const producto = e.target.closest('.productos_tienda');
        const nombre = producto.querySelector('.nombre-producto').textContent;
        const precioTexto = producto.querySelector('.precio-producto').textContent;
        const precio = parseInt(precioTexto.replace('Valor:', '').replace('$', '').replace('.', '').trim());
        const img = producto.querySelector('img').src;

        agregarAlCarrito({ nombre, precio, img });
    });
});


document.querySelector('.carrito').addEventListener('click', () => {
    modalCarrito.style.display = 'block';
});


cerrarCarrito.onclick = () => {
    modalCarrito.style.display = 'none';
};

btnPagar.addEventListener('click', () => {
    modalCarrito.style.display = 'none';
    modalPago.style.display = 'block';
});


cerrarPago.onclick = () => {
    modalPago.style.display = 'none';
};

document.getElementById('form-pago').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Pago realizado con éxito');
    carrito = [];
    actualizarCarrito();
    actualizarTotal();
    productosCarrito.innerHTML = '';
    modalPago.style.display = 'none';
});

// boton flotante// 

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        btnSubir.classList.add('mostrar');
    } else {
        btnSubir.classList.remove('mostrar');
    }
});

btnSubir.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});








