document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".tab-button");
    const contents = document.querySelectorAll(".tab-content");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            // Quitar "active" de todas las pestañas
            buttons.forEach(btn => btn.classList.remove("active"));
            contents.forEach(content => content.classList.remove("active"));

            // Activar la pestaña seleccionada
            const tab = this.getAttribute("data-tab");
            document.getElementById(tab).classList.add("active");
            this.classList.add("active");
        });
    });
});