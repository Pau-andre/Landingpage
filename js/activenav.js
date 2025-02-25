
    document.addEventListener("DOMContentLoaded", function () {
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll("nav ul li a");

        function changeActiveSection() {
            let currentSection = "";

            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 100; // Ajuste para header fijo
                const sectionHeight = section.clientHeight;
                const scrollPosition = window.scrollY + 100; // Ajuste para mejor detección

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute("id");
                }
            });

            // Si el usuario llega hasta abajo, forzamos activar "Contacto"
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
                currentSection = "contacto";
            }

            // Aplicamos la clase active
            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href").includes(currentSection)) {
                    link.classList.add("active");
                }
            });
        }

        // Detectar el scroll y actualizar la clase active
        window.addEventListener("scroll", changeActiveSection);

        // Manejar los clics en los enlaces de navegación
        navLinks.forEach(link => {
            link.addEventListener("click", function (event) {
                event.preventDefault(); // Evita el salto automático

                // Remover active de todos los enlaces
                navLinks.forEach(nav => nav.classList.remove("active"));

                // Activar el enlace seleccionado
                this.classList.add("active");

                // Obtener la sección destino y hacer scroll suave
                const sectionId = this.getAttribute("href").substring(1);
                const section = document.getElementById(sectionId);
                
                window.scrollTo({
                    top: section.offsetTop - 80, // Ajuste por el header
                    behavior: "smooth"
                });

                // Asegurar que después del scroll se active correctamente
                setTimeout(changeActiveSection, 600);
            });
        });

        // Asegurar que la sección activa se actualiza al cargar la página
        changeActiveSection();
    });

