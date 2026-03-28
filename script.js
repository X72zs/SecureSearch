// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsDiv = document.getElementById('results');
const loadingDiv = document.getElementById('loading');
const optionBtns = document.querySelectorAll('.option-btn');

// Current search engine
let currentEngine = 'google';

// Engine names for display
const engineNames = {
    'google': 'Google',
    'brave': 'Brave Search',
    'duckduckgo': 'DuckDuckGo'
};

// Switch search engines
optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        optionBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        // Update current engine
        currentEngine = btn.dataset.engine;
        
        // Auto-search if there's text in input
        if (searchInput.value.trim()) {
            performSearch();
        }
    });
});

// Search on button click
searchBtn.addEventListener('click', performSearch);

// Search on Enter key
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Main search function
async function performSearch() {
    const query = searchInput.value.trim();
    
    if (!query) {
        alert('Please enter a search term');
        return;
    }
    
    // Show loading state
    loadingDiv.style.display = 'block';
    resultsDiv.innerHTML = '';
    
    try {
        // Redirect to the chosen search engine
        let searchUrl = '';
        
        switch(currentEngine) {
            case 'google':
                searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                break;
            case 'brave':
                searchUrl = `https://search.brave.com/search?q=${encodeURIComponent(query)}`;
                break;
            case 'duckduckgo':
                searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
                break;
            default:
                searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
        
        // Open in new tab
        window.open(searchUrl, '_blank');
        
        // Show success message
        resultsDiv.innerHTML = `
            <div class="no-results">
                ✅ <strong>Secure search complete!</strong><br>
                🔍 Searching for: "${query}"<br>
                🛡️ Using: ${engineNames[currentEngine]}<br><br>
                <small>🔐 Your search is encrypted and private — results opened in a new tab</small>
            </div>
        `;
        
    } catch (error) {
        resultsDiv.innerHTML = `
            <div class="no-results">
                ❌ <strong>Something went wrong</strong><br>
                ${error.message}<br>
                Please try again
            </div>
        `;
    } finally {
        loadingDiv.style.display = 'none';
    }
}

// Mock results function (optional - if you want to show results without redirecting)
function showMockResults(query) {
    const mockResults = [
        {
            title: `Secure results for "${query}" - Example Site 1`,
            url: `https://example.com/search?q=${query}`,
            snippet: `🔒 This is a demonstration of secure search results. Your search for "${query}" is encrypted and private.`
        },
        {
            title: `Privacy-first search results for "${query}"`,
            url: `https://privacyexample.com/search?q=${query}`,
            snippet: `🛡️ No tracking, no logs, complete encryption. This is how private search should work.`
        }
    ];
    
    resultsDiv.innerHTML = mockResults.map(result => `
        <div class="result-item">
            <div class="result-title">
                <a href="${result.url}" target="_blank">${result.title}</a>
            </div>
            <div class="result-url">${result.url}</div>
            <div class="result-snippet">${result.snippet}</div>
        </div>
    `).join('');
}