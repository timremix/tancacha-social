```javascript
const textarea = document.getElementById("contenido");
const contador = document.getElementById("contador");
const publicarBtn = document.getElementById("publicarBtn");


// CONTADOR DE CARACTERES

textarea.addEventListener("input", () => {

    const cantidad = textarea.value.length;

    contador.textContent = `${cantidad} / 1000`;

});


// PUBLICAR

publicarBtn.addEventListener("click", () => {

    const contenido = textarea.value.trim();

    if (contenido.length === 0) {

        alert("Escribí algo antes de publicar.");

        return;

    }

    alert(
        "La publicación está lista. " +
        "En el próximo paso la conectaremos con Supabase."
    );

    textarea.value = "";

    contador.textContent = "0 / 1000";

});
```
