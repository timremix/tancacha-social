const SUPABASE_URL = "https://pdfzefpgxllbiyhytznl.supabase.co";
const SUPABASE_KEY = "sb_publishable_6OgaGfQBUBkHwo2HM6OEFw_fUzCAPcq";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const contenidoInput = document.getElementById("contenido");
const contador = document.getElementById("contador");
const publicarBtn = document.getElementById("publicarBtn");
const publicacionesDiv = document.getElementById("publicaciones");
const ordenSelect = document.getElementById("orden");

// Contador de caracteres
contenidoInput.addEventListener("input", () => {
    contador.textContent = `${contenidoInput.value.length}/1000`;
});

// Escapar HTML para evitar código malicioso en las publicaciones
function escaparHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

// Cargar publicaciones
async function cargarPublicaciones() {
    publicacionesDiv.innerHTML = "<p>Cargando publicaciones...</p>";

    const orden = ordenSelect.value === "antiguas";

    const { data, error } = await supabase
        .from("publicaciones")
        .select("*")
        .order("creado_en", { ascending: orden });

    if (error) {
        console.error(error);
        publicacionesDiv.innerHTML =
            "<p>No se pudieron cargar las publicaciones.</p>";
        return;
    }

    publicacionesDiv.innerHTML = "";

    if (data.length === 0) {
        publicacionesDiv.innerHTML =
            "<p>Todavía no hay publicaciones. ¡Sé el primero!</p>";
        return;
    }

    data.forEach((publicacion) => {
        const article = document.createElement("article");
        article.className = "publicacion";

        article.innerHTML = `
            <p>${escaparHTML(publicacion.contenido)}</p>
            <small>
                Publicado anónimamente ·
                ${new Date(publicacion.creado_en).toLocaleString("es-AR")}
            </small>
        `;

        publicacionesDiv.appendChild(article);
    });
}

// Publicar
publicarBtn.addEventListener("click", async () => {
    const contenido = contenidoInput.value.trim();

    if (!contenido) {
        alert("Escribí algo antes de publicar.");
        return;
    }

    if (contenido.length > 1000) {
        alert("La publicación no puede superar los 1000 caracteres.");
        return;
    }

    publicarBtn.disabled = true;
    publicarBtn.textContent = "PUBLICANDO...";

    const { error } = await supabase
        .from("publicaciones")
        .insert([
            {
                contenido: contenido
            }
        ]);

    if (error) {
        console.error(error);
        alert("No se pudo publicar. Revisá la conexión con Supabase.");
    } else {
        contenidoInput.value = "";
        contador.textContent = "0/1000";
        await cargarPublicaciones();
    }

    publicarBtn.disabled = false;
    publicarBtn.textContent = "PUBLICAR ANÓNIMAMENTE";
});

// Cambiar orden
ordenSelect.addEventListener("change", cargarPublicaciones);

// Cargar al abrir la página
cargarPublicaciones();";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const contenidoInput = document.getElementById("contenido");
const contador = document.getElementById("contador");
const publicarBtn = document.getElementById("publicarBtn");
const publicacionesDiv = document.getElementById("publicaciones");
const ordenSelect = document.getElementById("orden");

// Contador de caracteres
contenidoInput.addEventListener("input", () => {
    contador.textContent = `${contenidoInput.value.length}/1000`;
});

// Escapar HTML para evitar código malicioso en las publicaciones
function escaparHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

// Cargar publicaciones
async function cargarPublicaciones() {
    publicacionesDiv.innerHTML = "<p>Cargando publicaciones...</p>";

    const orden = ordenSelect.value === "antiguas";

    const { data, error } = await supabase
        .from("publicaciones")
        .select("*")
        .order("creado_en", { ascending: orden });

    if (error) {
        console.error(error);
        publicacionesDiv.innerHTML =
            "<p>No se pudieron cargar las publicaciones.</p>";
        return;
    }

    publicacionesDiv.innerHTML = "";

    if (data.length === 0) {
        publicacionesDiv.innerHTML =
            "<p>Todavía no hay publicaciones. ¡Sé el primero!</p>";
        return;
    }

    data.forEach((publicacion) => {
        const article = document.createElement("article");
        article.className = "publicacion";

        article.innerHTML = `
            <p>${escaparHTML(publicacion.contenido)}</p>
            <small>
                Publicado anónimamente ·
                ${new Date(publicacion.creado_en).toLocaleString("es-AR")}
            </small>
        `;

        publicacionesDiv.appendChild(article);
    });
}

// Publicar
publicarBtn.addEventListener("click", async () => {
    const contenido = contenidoInput.value.trim();

    if (!contenido) {
        alert("Escribí algo antes de publicar.");
        return;
    }

    if (contenido.length > 1000) {
        alert("La publicación no puede superar los 1000 caracteres.");
        return;
    }

    publicarBtn.disabled = true;
    publicarBtn.textContent = "PUBLICANDO...";

    const { error } = await supabase
        .from("publicaciones")
        .insert([
            {
                contenido: contenido
            }
        ]);

    if (error) {
        console.error(error);
        alert("No se pudo publicar. Revisá la conexión con Supabase.");
    } else {
        contenidoInput.value = "";
        contador.textContent = "0/1000";
        await cargarPublicaciones();
    }

    publicarBtn.disabled = false;
    publicarBtn.textContent = "PUBLICAR ANÓNIMAMENTE";
});

// Cambiar orden
ordenSelect.addEventListener("change", cargarPublicaciones);

// Cargar al abrir la página
cargarPublicaciones();

    contador.textContent = "0 / 1000";

});
```
