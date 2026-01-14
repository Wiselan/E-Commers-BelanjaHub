// ../js/script.js - Main file for all pages

// Product data for search (Product database)
const productDatabase = [
    // Clothing products (ID 101-108)
    { id: 101, name: "Premium Plain T-Shirt", category: "clothing", price: 99000, img: "https://static.desty.app/desty-store/gudanggaram16/product/48adf6a837df4cc3beaaee30e3d02457?x-oss-process=image/format,webp" },
    { id: 102, name: "Men's Casual Shirt", category: "clothing", price: 159000, img: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/111/MTA-156964476/no-brand_kemeja-pria-kekinian-kemeja-casual-pria-terbaru-kemeja-polos-pria_full12.jpg" },
    { id: 103, name: "Men's Oversize Hoodie", category: "clothing", price: 229000, img: "https://houseofsmith.co.id/wp-content/uploads/2025/10/ginee_20251021112846938_5104647282.jpg" },
    { id: 104, name: "Men's Denim Jacket", category: "clothing", price: 349000, img: "https://konveksidiamond.com/wp-content/uploads/2023/02/Jaket-denim-jogja.jpeg" },
    { id: 105, name: "Men's Chino Pants", category: "clothing", price: 189000, img: "https://down-id.img.susercontent.com/file/0fe1f469e02531b8cb51af722d22e18a" },
    { id: 106, name: "Men's Knit Sweater", category: "clothing", price: 279000, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_qQJ41TXO4mOqUmu_4adlMGQUhm-oxCI_8g&s" },
    { id: 107, name: "Men's Polo Shirt", category: "clothing", price: 129000, img: "https://img.lazcdn.com/g/p/59c4f590181f34c0f380b00c5ff19370.jpg_720x720q80.jpg" },
    { id: 108, name: "Men's Formal Blazer", category: "clothing", price: 499000, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkAbIUUI-Z4MxxKJOKPZ5bntxpBSL1m5TFg&s" },

    // Accessories products (ID 201-208)
    { id: 201, name: "Premium Backpack", category: "accessories", price: 249000, img: "https://img.lazcdn.com/g/p/50a806e6a21e784d50ffea84df6a4dce.jpg_720x720q80.jpg" },
    { id: 202, name: "Casual Watch", category: "accessories", price: 189000, img: "https://down-id.img.susercontent.com/file/id-11134207-7r98w-lyn7xbryitbcc1" },
    { id: 203, name: "Premium Baseball Cap", category: "accessories", price: 89000, img: "https://down-id.img.susercontent.com/file/id-11134207-7qukx-lf0ua1cfd38t2e" },
    { id: 204, name: "Men's Leather Wallet", category: "accessories", price: 159000, img: "https://down-id.img.susercontent.com/file/31676a8a0b186442550b15b282ae6fbf" },
    { id: 205, name: "Premium Sunglasses", category: "accessories", price: 129000, img: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/103/MTA-153874624/gykaco_gykaco_nira_-_kacamata_hitam_wanita_-premium-_-_fashion_sunglasses_-import-_full08_u0sbzx25.jpg" },
    { id: 206, name: "Men's Leather Bracelet", category: "accessories", price: 69000, img: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//95/MTA-56837000/jiayiqi_bracelet-men-high-quality-leather-gelang-pria-gelang-kulit-cowok_full02.jpg" },
    { id: 207, name: "Premium Leather Belt", category: "accessories", price: 119000, img: "https://down-id.img.susercontent.com/file/id-11134207-7r992-ltc24kum6lq1e1" },
    { id: 208, name: "Titanium Necklace", category: "accessories", price: 100000, img: "https://bimg.akulaku.net/goods/spu/0d074c52ebb34cfd9db9195fd9dd421e7741.jpg?w=726&q=80&fit=1" },

    // Shoes products (ID 301-308)
    { id: 301, name: "Premium Casual Sneakers", category: "shoes", price: 329000, img: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/471a5872c7e24aa0856a04d3a08e357c~tplv-o3syd03w52-resize-webp:800:800.webp?dr=15584&t=555f072d&ps=933b5bde&shp=6ce186a1&shcp=e1be8f53&idc=my&from=1826719393" },
    { id: 302, name: "Leather Formal Shoes", category: "shoes", price: 489000, img: "https://www.ginomariani.com/cdn/shop/files/id-11134207-7rasg-m2c59rs5jn40f5.jpg?v=1757305113&width=1445" },
    { id: 303, name: "Sport Running Shoes", category: "shoes", price: 429000, img: "https://m.media-amazon.com/images/I/71f3BmjCwtL.jpg" },
    { id: 304, name: "Men's Leather Boots", category: "shoes", price: 659000, img: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/N25135s3.jpg?im=Resize,width=750" },
    { id: 305, name: "Men's Casual Sandals", category: "shoes", price: 129000, img: "https://down-id.img.susercontent.com/file/32f6e5d00d15b461e94c6bf40933942a" },
    { id: 306, name: "Casual Slip On Shoes", category: "shoes", price: 279000, img: "https://image.made-in-china.com/202f0j00QCPfOVcUsWoT/Men-s-Foldable-Flat-Slip-on-Soft-Casual-Denim-Driving-Loafer-Shoes.webp" },
    { id: 307, name: "Basic Canvas Shoes", category: "shoes", price: 199000, img: "https://i.ebayimg.com/images/g/afgAAOSwXKFnA7Ip/s-l1200.jpg" },
    { id: 308, name: "Premium Loafers", category: "shoes", price: 359000, img: "https://dynamic.zacdn.com/xhMWUm1iL0paUfS7XUpYUvy-Jn0=/0x440/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/berrybenka-label-9821-7508215-1.jpg" }
];

// Ensure database is available globally for cart.js
window.productDatabase = productDatabase;

// ======================
// 1. INITIALIZATION
// ======================
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    initializeMobileMenu();
    initializeSearch();
    updateCartCount();
    setupAddToCartListeners();
    
    // Scroll to product if from search
    scrollToProduct();
    
    // Highlight search results if any
    highlightSearchResults();
    
    // Setup event listener for logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');
            
            showNotification('You have logged out!');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }
    
    // DEBUG: Log current page location
    console.log('📍 Current page:', window.location.pathname);
});

// FUNCTION to setup add-to-cart event listeners
function setupAddToCartListeners() {
    // Remove all previous event listeners (prevent duplicate)
    document.removeEventListener('click', handleAddToCartClick);
    
    // Add new event listener
    document.addEventListener('click', handleAddToCartClick);
}

// Handler function for add-to-cart click
function handleAddToCartClick(e) {
    const button = e.target.closest('.add-to-cart-btn');
    if (!button) return;
    
    e.preventDefault();
    
    // Get data from parent element (fashion-card)
    const productCard = button.closest('.fashion-card, .shoe-card, .accessory-card');
    if (!productCard) return;
    
    const productId = productCard.getAttribute('data-id');
    const productName = productCard.getAttribute('data-name');
    const productPrice = parseInt(productCard.getAttribute('data-price'));
    const productImg = productCard.getAttribute('data-img');
    
    // Validate data
    if (!productId || !productName || !productPrice) {
        console.error('Product data missing!', {productId, productName, productPrice, productImg});
        showNotification('Product data incomplete!', 'error');
        return;
    }
    
    console.log('Add to cart clicked:', {
        id: productId,
        name: productName,
        price: productPrice,
        img: productImg
    });
    
    addToCart(productId, productName, productPrice, productImg);
}

// ======================
// 2. USER MANAGEMENT
// ======================
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userName = localStorage.getItem('userName');
    const loginBtn = document.getElementById('loginBtn');
    const userInfo = document.getElementById('userInfo');
    const userNameSpan = document.getElementById('userName');
    
    if (isLoggedIn && userName) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (userInfo) {
            userInfo.style.display = 'flex';
            userInfo.classList.add('logged-in');
        }
        if (userNameSpan) userNameSpan.textContent = `Hello, ${userName}`;
    } else {
        if (loginBtn) loginBtn.style.display = 'inline-block';
        if (userInfo) {
            userInfo.style.display = 'none';
            userInfo.classList.remove('logged-in');
        }
    }
}

// ======================
// 3. CART MANAGEMENT
// ======================
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartCount = document.getElementById('cartCount');
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function getCart() {
    try {
        const cartData = localStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : [];
    } catch (e) {
        console.error('Error parsing cart:', e);
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    } catch (e) {
        console.error('Error saving cart:', e);
    }
}

// ONLY ONE addToCart FUNCTION
function addToCart(productId, productName, productPrice, productImg) {
    // Check login status
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        if (confirm('You must login first to add to cart. Login now?')) {
            window.location.href = 'pages/login.html';
        }
        return false;
    }
    
    let cart = getCart();
    
    // Convert productId to number for consistency
    const id = Number(productId);
    
    // Check if product already in cart
    const existingItemIndex = cart.findIndex(item => item.id === id);
    
    if (existingItemIndex !== -1) {
        // Update quantity if already exists
        cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
        console.log('Updated existing item:', cart[existingItemIndex]);
    } else {
        // Validate and fix image if needed
        let validImage = productImg;
        if (!validImage || validImage.includes('undefined') || validImage.includes('baju.png')) {
            // Find image from database
            const dbProduct = window.productDatabase.find(p => p.id === id);
            if (dbProduct && dbProduct.img) {
                validImage = dbProduct.img;
            } else {
                // Use placeholder
                const shortName = productName.substring(0, 15).replace(/\s+/g, '+');
                validImage = `https://placehold.co/200x200/001f3f/FFFFFF/png?text=${shortName}`;
            }
        }
        
        // Add new item
        cart.push({
            id: id,
            name: productName,
            price: productPrice,
            image: validImage,
            quantity: 1
        });
        console.log('Adding new item to cart');
    }
    
    saveCart(cart);
    showNotification(`${productName} successfully added to cart!`);
    return true;
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    showNotification('Product removed from cart!');
    return cart;
}

function updateCartQuantity(productId, quantity) {
    if (quantity < 1) return removeFromCart(productId);
    
    let cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity = quantity;
        saveCart(cart);
    }
    
    return cart;
}

function calculateCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
}

// ======================
// 4. MOBILE MENU TOGGLE
// ======================
function initializeMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                menuToggle.classList.remove('active');
            }
        });
    }
}

// ======================
// 5. SEARCH FUNCTIONALITY - FIXED VERSION
// ======================
function initializeSearch() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSearch();
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
            }
        });
        
        // Initialize autocomplete
        initializeSearchAutocomplete();
    }
}

// SIMPLIFIED handleSearch FUNCTION - SEMUA FILE DI ROOT
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        showNotification('Please enter search keywords!', 'error');
        return;
    }
    
    // Find matching products
    const results = productDatabase.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    if (results.length === 0) {
        showNotification(`No products found with keyword "${searchTerm}"`, 'error');
        return;
    }
    
    console.log('🔍 Search results found:', results.length, 'products');
    console.log('📋 Results:', results);
    
    // Save search data
    localStorage.setItem('lastSearch', searchTerm);
    localStorage.setItem('searchResults', JSON.stringify(results));
    
    // SIMPLE LOGIC: Determine which page to go to
    let targetPage = 'index.html'; // default
    
    if (results.length === 1) {
        // If only 1 result, go directly to that category page
        const product = results[0];
        localStorage.setItem('scrollToProduct', product.id);
        
        // Get correct page based on category
        targetPage = getCategoryPage(product.category);
        
        console.log('🎯 Single product found, redirecting to:', targetPage);
        
    } else {
        // If multiple results, find category with most results
        const categoryCount = {};
        results.forEach(p => {
            categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
        });
        
        // Find category with highest count
        let topCategory = 'clothing';
        let maxCount = 0;
        
        Object.keys(categoryCount).forEach(category => {
            if (categoryCount[category] > maxCount) {
                maxCount = categoryCount[category];
                topCategory = category;
            }
        });
        
        targetPage = getCategoryPage(topCategory);
        
        console.log('🎯 Multiple products found, top category:', topCategory, '->', targetPage);
    }
    
    // Redirect to target page
    console.log('🚀 Redirecting to:', targetPage);
    window.location.href = targetPage;
}

// SIMPLE HELPER: Get correct page file name based on category
function getCategoryPage(category) {
    switch(category) {
        case 'clothing':
            return 'clothing.html';
        case 'accessories':
            return 'accessoris.html'; // Note: typo in filename
        case 'shoes':
            return 'shoes.html';
        default:
            return 'index.html';
    }
}

// IMPROVED scrollToProduct FUNCTION
function scrollToProduct() {
    const productId = localStorage.getItem('scrollToProduct');
    
    if (!productId) return;
    
    console.log('📍 Trying to scroll to product ID:', productId);
    
    // Try multiple times with increasing delays
    const tryScroll = (attempt) => {
        setTimeout(() => {
            const productElement = document.querySelector(`[data-id="${productId}"]`);
            
            if (productElement) {
                console.log('✅ Product element found!');
                
                // Smooth scroll to product
                productElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Highlight the product
                highlightFoundProduct(productElement);
                
                // Clean up
                localStorage.removeItem('scrollToProduct');
            } else if (attempt < 5) {
                // Try again if not found yet
                console.log(`⏳ Product not found, attempt ${attempt + 1}/5`);
                tryScroll(attempt + 1);
            } else {
                console.log('❌ Product not found after 5 attempts');
            }
        }, attempt === 0 ? 500 : attempt * 1000);
    };
    
    // Start with first attempt
    tryScroll(0);
}

// Helper function to highlight found product
function highlightFoundProduct(element) {
    element.style.transition = 'all 0.5s ease';
    element.style.boxShadow = '0 0 25px rgba(230, 126, 34, 0.7)';
    element.style.border = '3px solid var(--orange)';
    element.style.borderRadius = '12px';
    
    // Add pulsing animation
    element.style.animation = 'productPulse 2s infinite';
    
    // Remove highlight after 5 seconds
    setTimeout(() => {
        element.style.boxShadow = '';
        element.style.border = '';
        element.style.animation = '';
    }, 5000);
}

// IMPROVED highlightSearchResults FUNCTION
function highlightSearchResults() {
    const lastSearch = localStorage.getItem('lastSearch');
    const searchResults = JSON.parse(localStorage.getItem('searchResults') || '[]');
    
    if (!lastSearch || searchResults.length === 0) return;
    
    console.log('🟡 Highlighting search results for:', lastSearch);
    
    // Remove previous highlights
    const existingBadges = document.querySelectorAll('.search-match-badge');
    existingBadges.forEach(badge => badge.remove());
    
    // Highlight each product in results
    searchResults.forEach(product => {
        const productElement = document.querySelector(`[data-id="${product.id}"]`);
        
        if (productElement) {
            // Add border
            productElement.style.border = '2px solid #FFA726';
            productElement.style.borderRadius = '8px';
            
            // Add badge
            const badge = document.createElement('div');
            badge.className = 'search-match-badge';
            badge.innerHTML = '<i class="fas fa-search"></i> Search Match';
            badge.style.cssText = `
                position: absolute;
                top: -8px;
                right: -8px;
                background: linear-gradient(135deg, #FFA726, #FB8C00);
                color: white;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 0.7rem;
                font-weight: bold;
                z-index: 100;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            `;
            
            productElement.style.position = 'relative';
            productElement.appendChild(badge);
        }
    });
    
    // Auto-clean after 30 seconds
    setTimeout(() => {
        removeAllSearchHighlights();
    }, 30000);
}

// UPDATED removeAllSearchHighlights FUNCTION
function removeAllSearchHighlights() {
    // Remove badges
    const badges = document.querySelectorAll('.search-match-badge');
    badges.forEach(badge => badge.remove());
    
    // Remove borders
    const productElements = document.querySelectorAll('.fashion-card, .shoe-card, .accessory-card');
    productElements.forEach(element => {
        element.style.border = '';
        element.style.borderRadius = '';
    });
    
    // Clear localStorage
    localStorage.removeItem('lastSearch');
    localStorage.removeItem('searchResults');
}

// SIMPLIFIED initializeSearchAutocomplete FUNCTION
function initializeSearchAutocomplete() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.id = 'searchSuggestions';
    suggestionsContainer.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        z-index: 1000;
        max-height: 300px;
        overflow-y: auto;
        display: none;
        margin-top: 5px;
    `;
    
    searchInput.parentNode.appendChild(suggestionsContainer);
    
    searchInput.addEventListener('input', function() {
        const term = this.value.trim().toLowerCase();
        
        if (term.length < 2) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        const suggestions = productDatabase.filter(product => 
            product.name.toLowerCase().includes(term)
        ).slice(0, 5);
        
        if (suggestions.length > 0) {
            suggestionsContainer.innerHTML = suggestions.map(product => `
                <div class="search-suggestion" 
                     data-id="${product.id}"
                     data-category="${product.category}"
                     style="padding: 10px 15px; cursor: pointer; border-bottom: 1px solid #f0f0f0; 
                            display: flex; align-items: center; gap: 10px; transition: background 0.2s;">
                    <img src="${product.img}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
                    <div style="flex: 1;">
                        <div style="font-weight: 600; color: var(--navy); font-size: 0.9rem;">${product.name}</div>
                        <div style="font-size: 0.8rem; color: var(--orange);">
                            Rp ${product.price.toLocaleString('id-ID')}
                        </div>
                    </div>
                </div>
            `).join('');
            
            suggestionsContainer.style.display = 'block';
            
            // Add click events
            suggestionsContainer.querySelectorAll('.search-suggestion').forEach(suggestion => {
                suggestion.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    const category = this.getAttribute('data-category');
                    
                    // Save for scrolling
                    localStorage.setItem('scrollToProduct', productId);
                    
                    // Clear input and hide suggestions
                    searchInput.value = '';
                    suggestionsContainer.style.display = 'none';
                    
                    // Redirect to category page
                    const targetPage = getCategoryPage(category);
                    window.location.href = targetPage;
                });
                
                // Hover effects
                suggestion.addEventListener('mouseenter', function() {
                    this.style.background = '#f8f9fa';
                });
                suggestion.addEventListener('mouseleave', function() {
                    this.style.background = '';
                });
            });
        } else {
            suggestionsContainer.style.display = 'none';
        }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });
    
    // Hide on ESC
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            suggestionsContainer.style.display = 'none';
        }
    });
}

// ======================
// 6. UTILITY FUNCTIONS
// ======================
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `cart-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ======================
// 7. GLOBAL FUNCTIONS
// ======================
window.checkLoginStatus = checkLoginStatus;
window.getCart = getCart;
window.saveCart = saveCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.calculateCartTotal = calculateCartTotal;
window.showNotification = showNotification;
window.handleSearch = handleSearch;

// Add CSS animation for pulsing effect
if (!document.querySelector('#pulse-animation-style')) {
    const style = document.createElement('style');
    style.id = 'pulse-animation-style';
    style.textContent = `
        @keyframes productPulse {
            0% { box-shadow: 0 0 0 0 rgba(230, 126, 34, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(230, 126, 34, 0); }
            100% { box-shadow: 0 0 0 0 rgba(230, 126, 34, 0); }
        }
    `;
    document.head.appendChild(style);
}