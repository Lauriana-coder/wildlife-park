const habitatImages = document.querySelectorAll('.habitat-card img'); // Get all habitat images
const lightbox = document.getElementById('lightbox'); // Get lightbox overlay element
const lightboxImg = document.getElementById('lightbox-img'); // Get lightbox image element
const closeBtn = document.getElementById('lightbox-close'); // Get close button element

habitatImages.forEach(img => { // Loop through each habitat image
    img.style.cursor = 'pointer'; // Show pointer cursor on hover
    img.addEventListener('click', () => { // When image is clicked
        lightboxImg.src = img.src; // Set lightbox image to clicked image
        lightbox.style.display = 'flex'; // Show the lightbox
    });
});

lightbox.addEventListener('click', () => { // Click anywhere on lightbox to close
    lightbox.style.display = 'none'; // Hide the lightbox
});

closeBtn.addEventListener('click', () => { // Click X button to close
    lightbox.style.display = 'none'; // Hide the lightbox
});