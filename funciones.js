// Dropdown productos: click abre productos.html
const menuProductos = document.querySelector('.menu-productos');
const menuLink = menuProductos.querySelector('.menu-link');
const dropdown = menuProductos.querySelector('.dropdown');

menuLink.addEventListener('click', function(e) {
    window.location.href = menuLink.href;
});

// Opcional: cerrar dropdown al hacer click fuera
document.addEventListener('click', function(e){
    if(!menuProductos.contains(e.target)){
        dropdown.classList.remove('active'); // solo si agregas clase 'active'
    }
});
      // Función para alternar preguntas frecuentes-CONTACTO.HTML
        function toggleFaq(element) {
            element.classList.toggle('activo');
        }

        // Manejo del formulario de contacto
        document.getElementById('formularioContacto').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            this.reset();
        });
    // funciones.js - Funciones generales para el sitio ImportMVS

document.addEventListener('DOMContentLoaded', function() {
    // Activar navegación activa según la página actual
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.item-navegacion');
    
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (linkPage.includes(currentPage.replace('.html', '')) && currentPage !== 'index.html')) {
                item.classList.add('activo');
            } else {
                item.classList.remove('activo');
            }
        }
    });

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Validación básica de formularios
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let valid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.style.borderColor = '#dc3545';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!valid) {
                e.preventDefault();
                alert('Por favor, completa todos los campos requeridos.');
            }
        });
    });

    // Animación de números en estadísticas (para página "Por qué")
    const statsElements = document.querySelectorAll('.numero-estadistica');
    if (statsElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stat = entry.target;
                    const target = parseInt(stat.textContent.replace('+', ''));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = stat.textContent.includes('+') ? target + '+' : target;
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
                        }
                    }, 16);
                    
                    observer.unobserve(stat);
                }
            });
        }, { threshold: 0.5 });
        
        statsElements.forEach(stat => observer.observe(stat));
    }
});

// Función para alternar FAQs
function toggleFaq(element) {
    element.classList.toggle('activo');
}

// Función para filtrar productos
function filtrarProductos(categoria) {
    // Actualizar filtros activos
    document.querySelectorAll('.filtro-item').forEach(item => {
        item.classList.remove('activo');
    });
    event.target.classList.add('activo');
    
    // Mostrar/ocultar productos
    const productos = document.querySelectorAll('.tarjeta-catalogo');
    
    productos.forEach(producto => {
        if (categoria === 'todos') {
            producto.style.display = 'block';
        } else {
            const categoriaProducto = producto.getAttribute('data-categoria');
            const etiquetas = producto.getAttribute('data-etiquetas');
            
            if (categoriaProducto === categoria || etiquetas.includes(categoria)) {
                producto.style.display = 'block';
            } else {
                producto.style.display = 'none';
            }
        }
    });
    
    // Desplazarse a la categoría si corresponde
    if (['belleza', 'naturales', 'personales', 'software'].includes(categoria)) {
        document.getElementById(categoria).scrollIntoView({ behavior: 'smooth' });
    }
}