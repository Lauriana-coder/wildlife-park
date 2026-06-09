// Array of slides with image path and focus position
const slides = [
    { src: '/images/slideshow/sl1.jpg', position: '50% 30%' },
    { src: '/images/slideshow/sl2.jpg', position: '50% 20%' },
    { src: '/images/slideshow/sl3.jpg', position: '50% 50%' },
    { src: '/images/slideshow/sl4.jpg', position: '50% 40%' },
    { src: '/images/slideshow/sl5.jpg', position: '50% 60%' }
];

// Start at first image
let currentSlide = 0;

// Function to update image and position
function showSlide(index) {
    const img = document.getElementById('slideshow-img');
    img.src = slides[index].src;
    img.style.objectPosition = slides[index].position;
}

// Function to go to next slide
function nextSlide() {
    currentSlide++;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}

// Show first slide
showSlide(0);

// Change image every 3 seconds
setInterval(nextSlide, 3000);