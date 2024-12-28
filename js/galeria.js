// Datos de la galería de imágenes
const galleryData = [
    { src: "../images/toyota.webp", alt: "Toyota Corolla 2023", description: "Un sedán confiable y eficiente.", width: 600, height: 400 },
    { src: "../images/honda.webp", alt: "Honda Civic 2023", description: "Un coche compacto con gran rendimiento.", width: 600, height: 400 },
    { src: "../images/Sportage.webp", alt: "Kia Sportage 2023", description: "Un SUV moderno y versátil.", width: 600, height: 400 },
    { src: "../images/tahoe.webp", alt: "Chevrolet Tahoe 2023", description: "Un SUV grande y potente.", width: 600, height: 400 },
    { src: "../images/Nissan.webp", alt: "Nissan Altima 2023", description: "Un sedán elegante y cómodo.", width: 600, height: 400 },
    { src: "../images/mustang.webp", alt: "Ford Mustang 2023", description: "Un deportivo icónico y emocionante.", width: 600, height: 400 }
];

// Función para crear un elemento de la galería
function createGalleryItem(item) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `
        <img src="${item.src}" alt="${item.alt}" width="${item.width}" height="${item.height}" aria-describedby="desc-${item.alt}">
        <div class="overlay">
            <p id="desc-${item.alt}">${item.description}</p>
        </div>
    `;
    div.addEventListener('click', () => openPopup(item.src, item.alt));
    return div;
}

// Función para renderizar la galería
function renderGallery() {
    const galleryElement = document.getElementById('gallery');
    const fragment = document.createDocumentFragment();
    galleryData.forEach(item => {
        fragment.appendChild(createGalleryItem(item));
    });
    galleryElement.appendChild(fragment);
}

// Función para abrir el popup de la imagen
function openPopup(src, alt) {
    const popup = document.getElementById('imagePopup');
    const popupImage = document.getElementById('popupImage');
    popup.style.display = 'block';
    requestAnimationFrame(() => popup.classList.add('show'));
    popupImage.src = src;
    popupImage.alt = alt;
}

// Función para cerrar el popup de la imagen
function closePopup() {
    const popup = document.getElementById('imagePopup');
    popup.classList.remove('show');
    setTimeout(() => {
        popup.style.display = 'none';
        document.getElementById('popupImage').src = '';
    }, 300);
}

// Evento que se ejecuta cuando el DOM ha sido completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
    
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', closePopup);

    const popup = document.getElementById('imagePopup');
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });

    // Precarga de imágenes
    galleryData.forEach(item => {
        const img = new Image();
        img.src = item.src;
    });
});
