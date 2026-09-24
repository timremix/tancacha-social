const SUPABASE_URL = "https://pdfzefpgxllbiyhytznl.supabase.co";
const SUPABASE_KEY = "sb_publishable_6OgaGfQBUBkHwo2HM6OEFw_fUzCAPcq";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// Elementos de la página
const contenidoInput = document.getElementById("contenido");
const contador = document.getElementById("contador");
const publicarBtn = document.getElementById("publicarBtn");
const publicacionesDiv = document.getElementById("publicaciones");
const ordenSelect = document.getElementById("orden");

// Contador de caracteres
contenidoInput.addEventListener("input", () => {
    contador.textContent = `${contenidoInput.value.length}/1000`;
});

// Cargar publicaciones desde Supabase
async function cargarPublicaciones() {

    publicacionesDiv.innerHTML = "<p>Cargando publicaciones...</p>";

    const ordenAscendente = ordenSelect.value === "antiguas";

    const { data, error } = await supabase
        .from("publicaciones")
        .select("*")
        .order("creado_en", {
            ascending: ordenAscendente
        });

    if (error) {
        console.error("Error al cargar publicaciones:", error);

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

        const texto = document.createElement("p");

        texto.textContent = publicacion.contenido;

        const fecha = document.createElement("small");

        fecha.textContent =
            "Publicado anónimamente · " +
            new Date(publicacion.creado_en)
                .toLocaleString("es-AR");

        article.appendChild(texto);
        article.appendChild(fecha);

        publicacionesDiv.appendChild(article);
    });
}

// Publicar una nueva publicación
publicarBtn.addEventListener("click", async () => {

    const contenido = contenidoInput.value.trim();

    // Comprobar que no esté vacío
    if (!contenido) {

        alert("Escribí algo antes de publicar.");

        return;
    }

    // Máximo 1000 caracteres
    if (contenido.length > 1000) {

        alert("La publicación no puede superar los 1000 caracteres.");

        return;
    }

    // Desactivar botón mientras publica
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

        console.error("Error al publicar:", error);

        alert(
            "No se pudo publicar.\n\n" +
            "Revisá la conexión con Supabase."
        );

    } else {

        // Limpiar campo
        contenidoInput.value = "";

        contador.textContent = "0/1000";

        // Recargar publicaciones
        await cargarPublicaciones();
    }

    // Reactivar botón
    publicarBtn.disabled = false;

    publicarBtn.textContent = "PUBLICAR ANÓNIMAMENTE";
});

// Cambiar orden de publicaciones
ordenSelect.addEventListener("change", () => {

    cargarPublicaciones();

});

// Cargar publicaciones cuando se abre la página
cargarPublicaciones();
