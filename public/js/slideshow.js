const slides = [ // Array of slides with image path and focus position
    { src: '/images/slideshow/sl1.jpg', position: '50% 30%' }, // Slide 1 - focus slightly above center
    { src: '/images/slideshow/sl2.jpg', position: '50% 20%' }, // Slide 2 - focus near top
    { src: '/images/slideshow/sl3.jpg', position: '50% 50%' }, // Slide 3 - focus center
    { src: '/images/slideshow/sl4.jpg', position: '50% 40%' }, // Slide 4 - focus slightly above center
    { src: '/images/slideshow/sl5.jpg', position: '50% 60%' }  // Slide 5 - focus slightly below center
];

let currentSlide = 0; // Track which slide is currently showing

function showSlide(index) { // Update the image and its focus position
    const img = document.getElementById('slideshow-img'); // Get the slideshow image element
    img.src = slides[index].src; // Set the image source
    img.style.objectPosition = slides[index].position; // Set the focus position
}

function nextSlide() { // Move to the next slide
    currentSlide++; // Increment slide index
    if (currentSlide >= slides.length) { // If we reached the last slide
        currentSlide = 0; // Go back to first slide
    }
    showSlide(currentSlide); // Show the next slide
}

showSlide(0); // Show the first slide when page loads

setInterval(nextSlide, 3000); // Automatically change slide every 3 seconds