const searchInput = document.getElementById('search-input'); // Get the search input field
const searchBtn = document.getElementById('search-btn'); // Get the search button
const searchResults = document.getElementById('search-results'); // Get the results container
const searchStatus = document.getElementById('search-status'); // Get the status message element

let debounceTimer; // Timer used to delay the search while the user is still typing

searchBtn.addEventListener('click', () => { // Run search when button is clicked
    performSearch(searchInput.value.trim());
});

searchInput.addEventListener('input', () => { // Run search as the user types
    clearTimeout(debounceTimer); // Clear the previous timer
    debounceTimer = setTimeout(() => { // Wait 400ms after user stops typing before sending request
        performSearch(searchInput.value.trim());
    }, 400);
});

searchInput.addEventListener('keydown', (e) => { // Allow pressing Enter to trigger search
    if (e.key === 'Enter') {
        clearTimeout(debounceTimer);
        performSearch(searchInput.value.trim());
    }
});

function performSearch(query) {
    if (!query) { // If search box is empty, clear results
        searchResults.innerHTML = '';
        searchStatus.textContent = '';
        return;
    }

    searchStatus.textContent = 'Searching...'; // Show searching message
    searchResults.innerHTML = ''; // Clear previous results

    // AJAX request - fetches matching results from the server without reloading the page
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then(response => response.json()) // Parse the JSON response from the server
        .then(data => {
            displayResults(data, query); // Display the results on the page
        })
        .catch(err => {
            searchStatus.textContent = 'Something went wrong. Please try again.'; // Show error message
            console.error('Search error:', err); // Log error to console
        });
}

function displayResults(data, query) {
    const totalResults = data.habitats.length + data.exhibits.length; // Count total results

    if (totalResults === 0) { // If no results found
        searchStatus.textContent = `No results found for "${query}".`;
        searchResults.innerHTML = '';
        return;
    }

    searchStatus.textContent = `Found ${totalResults} result${totalResults !== 1 ? 's' : ''} for "${query}".`; // Show result count

    let html = '';

    if (data.habitats.length > 0) { // If there are matching habitats
        html += '<h2>Habitats</h2>';
        data.habitats.forEach(habitat => {
            html += `
                <div class="search-result-card">
                    <h3>${habitat.name}</h3>
                    <p>${habitat.description}</p>
                    <a href="/habitats" class="result-link">View Habitat →</a>
                </div>`;
        });
    }

    if (data.exhibits.length > 0) { // If there are matching animals
        html += '<h2>Animals</h2>';
        data.exhibits.forEach(exhibit => {
            html += `
                <div class="search-result-card">
                    <h3>${exhibit.animal}</h3>
                    <p>${exhibit.description}</p>
                    <p class="result-habitat">Found in: <strong>${exhibit.habitat_name}</strong></p>
                    <a href="/habitats" class="result-link">View Habitat →</a>
                </div>`;
        });
    }

    searchResults.innerHTML = html; // Inject the results into the page
}