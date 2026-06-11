// Get all habitat images
const habitatImages = document.querySelectorAll('.habitat-card img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

// Add click event to each habitat image
habitatImages.forEach(img => {
    img.style.cursor = 'pointer'; // Show pointer cursor on hover
    img.addEventListener('click', () => {
        lightboxImg.src = img.src; // Set lightbox image to clicked image
        lightbox.style.display = 'flex'; // Show the lightbox
    });
});

// Click anywhere on lightbox to close it
lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none'; // Hide the lightbox
});