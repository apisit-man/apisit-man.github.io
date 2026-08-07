// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Theme Switcher Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');

function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
if (themeToggleMobileBtn) themeToggleMobileBtn.addEventListener('click', toggleTheme);

// Filter tabs (if any exist)
function showTab(tab) {
    const allLists = document.querySelectorAll('[id^="showcase-"]');
    allLists.forEach(list => list.classList.add('hidden'));

    const allBtns = document.querySelectorAll('[id^="filter-"]');
    allBtns.forEach(btn => {
        btn.className = "px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-brand-500/50 shadow-sm whitespace-nowrap focus:outline-none";
    });

    const selectedList = document.getElementById(`showcase-${tab}`);
    if (selectedList) selectedList.classList.remove('hidden');

    const activeBtn = document.getElementById(`filter-${tab}-btn`);
    if (activeBtn) {
        activeBtn.className = "px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 bg-brand-600 text-white shadow-sm whitespace-nowrap focus:outline-none";
    }
}

// Search Logic
document.addEventListener('DOMContentLoaded', () => {
    const searchModal = document.getElementById('search-modal');
    const searchBackdrop = document.getElementById('search-backdrop');
    const searchModalContent = document.getElementById('search-modal-content');
    const searchInput = document.getElementById('search-input');
    const searchClose = document.getElementById('search-close');
    const searchToggleDesktop = document.getElementById('search-toggle-desktop');
    const searchToggleMobile = document.getElementById('search-toggle-mobile');
    const searchResults = document.getElementById('search-results');
    const searchEmpty = document.getElementById('search-empty');
    const searchInitial = document.getElementById('search-initial');

    // Default to 'th' or read from lang attribute if needed
    const currentLang = document.documentElement.lang || 'th';

    function openSearch() {
        if (!searchModal) return;
        searchModal.classList.remove('hidden');
        setTimeout(() => {
            searchBackdrop.classList.remove('opacity-0');
            searchBackdrop.classList.add('opacity-100');
            searchModalContent.classList.remove('opacity-0', 'scale-95');
            searchModalContent.classList.add('opacity-100', 'scale-100');
            searchInput.focus();
        }, 10);
    }

    function closeSearch() {
        if (!searchModal) return;
        searchBackdrop.classList.remove('opacity-100');
        searchBackdrop.classList.add('opacity-0');
        searchModalContent.classList.remove('opacity-100', 'scale-100');
        searchModalContent.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            searchModal.classList.add('hidden');
        }, 300);
    }

    if (searchToggleDesktop) searchToggleDesktop.addEventListener('click', openSearch);
    if (searchToggleMobile) searchToggleMobile.addEventListener('click', openSearch);
    if (searchClose) searchClose.addEventListener('click', closeSearch);
    if (searchBackdrop) searchBackdrop.addEventListener('click', closeSearch);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal && !searchModal.classList.contains('hidden')) {
            closeSearch();
        }
    });

    document.querySelectorAll('.search-suggest').forEach(btn => {
        btn.addEventListener('click', () => {
            searchInput.value = btn.textContent;
            performSearch(btn.textContent);
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });
    }

    function performSearch(query) {
        query = query.toLowerCase().trim();
        if (!query) {
            searchResults.classList.add('hidden');
            searchEmpty.classList.add('hidden');
            searchInitial.classList.remove('hidden');
            return;
        }

        searchInitial.classList.add('hidden');
        const data = typeof searchData !== 'undefined' ? (searchData[currentLang] || []) : [];
        
        const results = data.filter(item => {
            return item.title.toLowerCase().includes(query) || 
                   item.description.toLowerCase().includes(query) ||
                   (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)));
        });

        if (results.length === 0) {
            searchResults.classList.add('hidden');
            searchEmpty.classList.remove('hidden');
        } else {
            searchEmpty.classList.add('hidden');
            searchResults.classList.remove('hidden');
            renderResults(results);
        }
    }

    function renderResults(results) {
        searchResults.innerHTML = results.map(item => `
            <a href="${item.url}" class="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-xl shadow-sm border border-brand-100 dark:border-brand-900/50">
                    ${item.icon || '🔍'}
                </div>
                <div>
                    <h4 class="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors flex items-center gap-2">
                        ${item.title}
                        <span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-600">${item.type || 'Result'}</span>
                    </h4>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">${item.description}</p>
                </div>
            </a>
        `).join('');
    }
});


// Filtering Logic for Innovations Section
window.filterCategory = function(category) {
    // Scroll to the innovations section if not already there
    const section = document.getElementById('innovations');
    if (section) {
        // Only scroll if we're not currently looking at it
        const rect = section.getBoundingClientRect();
        if (rect.top < 0 || rect.bottom > window.innerHeight) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Update filter buttons UI
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        if(btn.dataset.filter === category) {
            btn.classList.add('active', 'bg-brand-600', 'text-white', 'shadow-md', 'shadow-brand-500/20');
            btn.classList.remove('bg-white', 'dark:bg-slate-900', 'text-slate-600', 'dark:text-slate-300', 'border');
        } else {
            btn.classList.remove('active', 'bg-brand-600', 'text-white', 'shadow-md', 'shadow-brand-500/20');
            btn.classList.add('bg-white', 'dark:bg-slate-900', 'text-slate-600', 'dark:text-slate-300', 'border');
        }
    });

    // Filter cards
    const grid = document.getElementById('games-grid');
    if (!grid) return;
    
    // We add a tiny delay to allow the DOM to prepare for animation, but simple display toggle is fine for now
    const cards = grid.children;
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        // Ensure card has data-category
        if (card.hasAttribute('data-category')) {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'flex';
                card.style.opacity = '0';
                setTimeout(() => { card.style.transition = 'opacity 0.3s ease'; card.style.opacity = '1'; }, 50);
            } else {
                card.style.display = 'none';
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
        setTimeout(() => {
            if (window.filterCategory) window.filterCategory(category);
        }, 300);
    }
});
