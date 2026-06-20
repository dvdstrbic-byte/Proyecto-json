let autores = [];
let generos = [];
let libros = [];

function cargarDatos() {
    
    fetch("autores.json")
        .then(resAutores => resAutores.json())
        .then(datosAutores => {
            autores = datosAutores; // Guardamos los autores

            return fetch("generos.json");
        })
        .then(resGeneros => resGeneros.json())
        .then(datosGeneros => {
            generos = datosGeneros; // Guardamos los géneros

            return fetch("libros.json");
        })
        .then(resLibros => resLibros.json())
        .then(datosLibros => {
            libros = datosLibros; // Guardamos los libros

            cargarSelects();
            mostrarAutores();
            mostrarGeneros();
            mostrarLibros();
        })
        .catch(error => {
        
            console.error(error);
            alert("Error al cargar los archivos JSON");
        });
}

window.addEventListener("load", cargarDatos);


// ==========================
// AUTORES
// ==========================

function guardarAutor() {

    autores.push({
        codigo: Number(document.getElementById("codAutor").value),
        nombre: document.getElementById("nomAutor").value,
        apellido: document.getElementById("apeAutor").value
    });

    mostrarAutores();
    cargarSelects();
}

function buscarAutor() {

    const codigo =
        Number(document.getElementById("codAutor").value);

    const autor =
        autores.find(a => a.codigo === codigo);

    if (autor) {

        document.getElementById("nomAutor").value =
            autor.nombre;

        document.getElementById("apeAutor").value =
            autor.apellido;

    } else {

        alert("Autor no encontrado");
    }
}

function editarAutor() {

    const codigo =
        Number(document.getElementById("codAutor").value);

    const autor =
        autores.find(a => a.codigo === codigo);

    if (autor) {

        autor.nombre =
            document.getElementById("nomAutor").value;

        autor.apellido =
            document.getElementById("apeAutor").value;

        mostrarAutores();
        cargarSelects();

        alert("Autor actualizado");

    } else {

        alert("Autor no encontrado");
    }
}

function eliminarAutor() {

    const codigo =
        Number(document.getElementById("codAutor").value);

    autores =
        autores.filter(a => a.codigo !== codigo);

    mostrarAutores();
    cargarSelects();
}


// GENEROS


function guardarGenero() {

    generos.push({
        codigo: Number(document.getElementById("codGenero").value),
        nombre: document.getElementById("nomGenero").value
    });

    mostrarGeneros();
    cargarSelects();
}

function buscarGenero() {

    const codigo =
        Number(document.getElementById("codGenero").value);

    const genero =
        generos.find(g => g.codigo === codigo);

    if (genero) {

        document.getElementById("nomGenero").value =
            genero.nombre;

    } else {

        alert("Género no encontrado");
    }
}

function editarGenero() {

    const codigo =
        Number(document.getElementById("codGenero").value);

    const genero =
        generos.find(g => g.codigo === codigo);

    if (genero) {

        genero.nombre =
            document.getElementById("nomGenero").value;

        mostrarGeneros();
        cargarSelects();

    } else {

        alert("Género no encontrado");
    }
}

function eliminarGenero() {

    const codigo =
        Number(document.getElementById("codGenero").value);

    generos =
        generos.filter(g => g.codigo !== codigo);

    mostrarGeneros();
    cargarSelects();
}


// LIBROS


function guardarLibro() {

    libros.push({

        codigo:
            Number(document.getElementById("codLibro").value),

        titulo:
            document.getElementById("tituloLibro").value,

        fechaPublicacion:
            document.getElementById("fechaLibro").value,

        paginas:
            Number(document.getElementById("paginasLibro").value),

        autor:
            Number(document.getElementById("autorLibro").value),

        genero:
            Number(document.getElementById("generoLibro").value)
    });

    mostrarLibros();
}

function buscarLibro() {

    const codigo =
        Number(document.getElementById("codLibro").value);

    const libro =
        libros.find(l => l.codigo === codigo);

    if (libro) {

        document.getElementById("tituloLibro").value =
            libro.titulo;

        document.getElementById("fechaLibro").value =
            libro.fechaPublicacion;

        document.getElementById("paginasLibro").value =
            libro.paginas;

        document.getElementById("autorLibro").value =
            libro.autor;

        document.getElementById("generoLibro").value =
            libro.genero;

    } else {

        alert("Libro no encontrado");
    }
}

function editarLibro() {

    const codigo =
        Number(document.getElementById("codLibro").value);

    const libro =
        libros.find(l => l.codigo === codigo);

    if (libro) {

        libro.titulo =
            document.getElementById("tituloLibro").value;

        libro.fechaPublicacion =
            document.getElementById("fechaLibro").value;

        libro.paginas =
            Number(document.getElementById("paginasLibro").value);

        libro.autor =
            Number(document.getElementById("autorLibro").value);

        libro.genero =
            Number(document.getElementById("generoLibro").value);

        mostrarLibros();

    } else {

        alert("Libro no encontrado");
    }
}

function eliminarLibro() {

    const codigo =
        Number(document.getElementById("codLibro").value);

    libros =
        libros.filter(l => l.codigo !== codigo);

    mostrarLibros();
}


// TABLAS

function mostrarAutores() {

    let html = "";

    autores.forEach(a => {

        html += `
        <tr>
            <td>${a.codigo}</td>
            <td>${a.nombre}</td>
            <td>${a.apellido}</td>
        </tr>
        `;
    });

    document.querySelector("#tablaAutores tbody").innerHTML =
        html;
}

function mostrarGeneros() {

    let html = "";

    generos.forEach(g => {

        html += `
        <tr>
            <td>${g.codigo}</td>
            <td>${g.nombre}</td>
        </tr>
        `;
    });

    document.querySelector("#tablaGeneros tbody").innerHTML =
        html;
}

function mostrarLibros() {

    let html = "";

    libros.forEach(l => {

        const autor =
            autores.find(a => a.codigo === l.autor);

        const genero =
            generos.find(g => g.codigo === l.genero);

        html += `
        <tr>
            <td>${l.codigo}</td>
            <td>${l.titulo}</td>
            <td>${l.fechaPublicacion}</td>
            <td>${l.paginas}</td>
            <td>${autor ? autor.nombre + " " + autor.apellido : ""}</td>
            <td>${genero ? genero.nombre : ""}</td>
        </tr>
        `;
    });

    document.querySelector("#tablaLibros tbody").innerHTML =
        html;
}


// SELECTS


function cargarSelects() {

    const selectAutor =
        document.getElementById("autorLibro");

    const selectGenero =
        document.getElementById("generoLibro");

    selectAutor.innerHTML =
        '<option value="">Seleccione Autor</option>';

    selectGenero.innerHTML =
        '<option value="">Seleccione Género</option>';

    autores.forEach(a => {

        selectAutor.innerHTML += `
        <option value="${a.codigo}">
            ${a.nombre} ${a.apellido}
        </option>
        `;
    });

    generos.forEach(g => {

        selectGenero.innerHTML += `
        <option value="${g.codigo}">
            ${g.nombre}
        </option>
        `;
    });
}