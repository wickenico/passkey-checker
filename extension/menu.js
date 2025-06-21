document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("menuToggle");
    const menu = document.getElementById("menu");

    toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
        if (!menu.contains(e.target)) {
            menu.classList.add("hidden");
        }
    });
});
