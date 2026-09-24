const SUPABASE_URL = "https://pdfzefpgxllbiyhytznl.supabase.co";
const SUPABASE_KEY = "sb_publishable_6OgaGfQBUBkHwo2HM6OEFw_fUzCAPcq";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const contenidoInput = document.getElementById("contenido");
const contador = document.getElementById("contador");
const publicarBtn = document.getElementById("publicarBtn");
const publicacionesDiv = document.getElementById("publicaciones");
const ordenSelect = document.getElementById("orden");

contenidoInput.addEventListener("input", () => {
    contador.textContent = `${contenidoInput.value.length}/1000`;
});

async function cargarPublicaciones() {

    publicacionesDiv.innerHTML = "<p>Cargando publicaciones...</p>";

    const ordenAscendente = ordenSelect.value === "antiguas";

    const { data, error } = await supabaseClient
        .from("publicaciones")
        .select("*")
        .order("creado_en", {
            ascending: ordenAscendente
        });

    if (error) {
        console.error("Error al cargar:", error);
        publicacionesDiv.innerHTML =
            "<p>Error al cargar las publicaciones.</p>";
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
            new Date(publicacion.creado_en).toLocaleString("es-AR");

        article.appendChild(texto);
        article.appendChild(fecha);

        publicacionesDiv.appendChild(article);
    });
}

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

    const { error } = await supabaseClient
        .from("publicaciones")
        .insert([
            {
                contenido: contenido
            }
        ]);

    if (error) {

        console.error("Error al publicar:", error);

        alert("No se pudo publicar. Revisá la consola para ver el error.");

    } else {

        contenidoInput.value = "";
        contador.textContent = "0/1000";

        await cargarPublicaciones();
    }

    publicarBtn.disabled = false;
    publicarBtn.textContent = "PUBLICAR ANÓNIMAMENTE";
});

ordenSelect.addEventListener("change", cargarPublicaciones);

cargarPublicaciones();
