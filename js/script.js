// ../js/script.js - File utama untuk semua halaman

// Data produk untuk search (Database produk)
const productDatabase = [
    // Clothing products (ID 101-108)
    { id: 101, name: "Kaos Polos Premium", category: "clothing", price: 99000, page: "clothing.html", img: "https://static.desty.app/desty-store/gudanggaram16/product/48adf6a837df4cc3beaaee30e3d02457?x-oss-process=image/format,webp" },
    { id: 102, name: "Kemeja Casual Pria", category: "clothing", price: 159000, page: "clothing.html", img: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/111/MTA-156964476/no-brand_kemeja-pria-kekinian-kemeja-casual-pria-terbaru-kemeja-polos-pria_full12.jpg" },
    { id: 103, name: "Hoodie Oversize Pria", category: "clothing", price: 229000, page: "clothing.html", img: "https://houseofsmith.co.id/wp-content/uploads/2025/10/ginee_20251021112846938_5104647282.jpg" },
    { id: 104, name: "Jaket Denim Pria", category: "clothing", price: 349000, page: "clothing.html", img: "https://konveksidiamond.com/wp-content/uploads/2023/02/Jaket-denim-jogja.jpeg" },
    { id: 105, name: "Celana Chino Pria", category: "clothing", price: 189000, page: "clothing.html", img: "https://down-id.img.susercontent.com/file/0fe1f469e02531b8cb51af722d22e18a" },
    { id: 106, name: "Sweater Rajut Pria", category: "clothing", price: 279000, page: "clothing.html", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_qQJ41TXO4mOqUmu_4adlMGQUhm-oxCI_8g&s" },
    { id: 107, name: "Kaos Polo Pria", category: "clothing", price: 129000, page: "clothing.html", img: "https://img.lazcdn.com/g/p/59c4f590181f34c0f380b00c5ff19370.jpg_720x720q80.jpg" },
    { id: 108, name: "Blazer Formal Pria", category: "clothing", price: 499000, page: "clothing.html", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkAbIUUI-Z4MxxKJOKPZ5bntxpBSL1m5TFg&s" },

    // Accessories products (ID 201-208)
    { id: 201, name: "Tas Ransel Premium", category: "accessories", price: 249000, page: "accessoris.html", img: "https://img.lazcdn.com/g/p/50a806e6a21e784d50ffea84df6a4dce.jpg_720x720q80.jpg" },
    { id: 202, name: "Jam Tangan Casual", category: "accessories", price: 189000, page: "accessoris.html", img: "https://down-id.img.susercontent.com/file/id-11134207-7r98w-lyn7xbryitbcc1" },
    { id: 203, name: "Topi Baseball Premium", category: "accessories", price: 89000, page: "accessoris.html", img: "https://down-id.img.susercontent.com/file/id-11134207-7qukx-lf0ua1cfd38t2e" },
    { id: 204, name: "Dompet Kulit Pria", category: "accessories", price: 159000, page: "accessoris.html", img: "https://down-id.img.susercontent.com/file/31676a8a0b186442550b15b282ae6fbf" },
    { id: 205, name: "Kacamata Hitam Premium", category: "accessories", price: 129000, page: "accessoris.html", img: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/103/MTA-153874624/gykaco_gykaco_nira_-_kacamata_hitam_wanita_-premium-_-_fashion_sunglasses_-import-_full08_u0sbzx25.jpg" },
    { id: 206, name: "Gelang Kulit Pria", category: "accessories", price: 69000, page: "accessoris.html", img: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//95/MTA-56837000/jiayiqi_bracelet-men-high-quality-leather-gelang-pria-gelang-kulit-cowok_full02.jpg" },
    { id: 207, name: "Belt Kulit Premium", category: "accessories", price: 119000, page: "accessoris.html", img: "https://down-id.img.susercontent.com/file/id-11134207-7r992-ltc24kum6lq1e1" },
    { id: 208, name: "Kalung Titanium", category: "accessories", price: 100000, page: "accessoris.html", img: "https://bimg.akulaku.net/goods/spu/0d074c52ebb34cfd9db9195fd9dd421e7741.jpg?w=726&q=80&fit=1" },

    // Shoes products (ID 301-308)
    { id: 301, name: "Sneakers Casual Premium", category: "shoes", price: 329000, page: "shoes.html", img: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/471a5872c7e24aa0856a04d3a08e357c~tplv-o3syd03w52-resize-webp:800:800.webp?dr=15584&t=555f072d&ps=933b5bde&shp=6ce186a1&shcp=e1be8f53&idc=my&from=1826719393" },
    { id: 302, name: "Sepatu Formal Leather", category: "shoes", price: 489000, page: "shoes.html", img: "https://www.ginomariani.com/cdn/shop/files/id-11134207-7rasg-m2c59rs5jn40f5.jpg?v=1757305113&width=1445" },
    { id: 303, name: "Running Shoes Sport", category: "shoes", price: 429000, page: "shoes.html", img: "https://m.media-amazon.com/images/I/71f3BmjCwtL.jpg" },
    { id: 304, name: "Leather Boots Pria", category: "shoes", price: 659000, page: "shoes.html", img: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/N25135s3.jpg?im=Resize,width=750" },
    { id: 305, name: "Sandal Casual Pria", category: "shoes", price: 129000, page: "shoes.html", img: "https://down-id.img.susercontent.com/file/32f6e5d00d15b461e94c6bf40933942a" },
    { id: 306, name: "Slip On Casual Shoes", category: "shoes", price: 279000, page: "shoes.html", img: "https://image.made-in-china.com/202f0j00QCPfOVcUsWoT/Men-s-Foldable-Flat-Slip-on-Soft-Casual-Denim-Driving-Loafer-Shoes.webp" },
    { id: 307, name: "Canvas Shoes Basic", category: "shoes", price: 199000, page: "shoes.html", img: "https://i.ebayimg.com/images/g/afgAAOSwXKFnA7Ip/s-l1200.jpg" },
    { id: 308, name: "Loafers Premium", category: "shoes", price: 359000, page: "shoes.html", img: "https://dynamic.zacdn.com/xhMWUm1iL0paUfS7XUpYUvy-Jn0=/0x440/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/berrybenka-label-9821-7508215-1.jpg" }
];

// Pastikan database tersedia global untuk cart.js
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
    
    // Scroll ke produk jika ada dari search
    scrollToProduct();
    
    // Highlight search results jika ada
    highlightSearchResults();
    
    // Setup event listener untuk logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');
            
            showNotification('Anda telah logout!');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }
});

// FUNGSI untuk setup event listeners add-to-cart
function setupAddToCartListeners() {
    // Hapus semua event listener sebelumnya (prevent duplicate)
    document.removeEventListener('click', handleAddToCartClick);
    
    // Tambahkan event listener baru
    document.addEventListener('click', handleAddToCartClick);
}

// Fungsi handler untuk klik add-to-cart
function handleAddToCartClick(e) {
    const button = e.target.closest('.add-to-cart-btn');
    if (!button) return;
    
    e.preventDefault();
    
    // Ambil data dari parent element (fashion-card)
    const productCard = button.closest('.fashion-card, .shoe-card, .accessory-card');
    if (!productCard) return;
    
    const productId = productCard.getAttribute('data-id');
    const productName = productCard.getAttribute('data-name');
    const productPrice = parseInt(productCard.getAttribute('data-price'));
    const productImg = productCard.getAttribute('data-img');
    
    // Validasi data
    if (!productId || !productName || !productPrice) {
        console.error('Product data missing!', {productId, productName, productPrice, productImg});
        showNotification('Data produk tidak lengkap!', 'error');
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
        if (userNameSpan) userNameSpan.textContent = `Halo, ${userName}`;
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

// HANYA SATU FUNGSI addToCart
function addToCart(productId, productName, productPrice, productImg) {
    // Check login status
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        if (confirm('Anda harus login terlebih dahulu untuk menambahkan ke keranjang. Login sekarang?')) {
            window.location.href = 'pages/login.html';
        }
        return false;
    }
    
    let cart = getCart();
    
    // Convert productId ke number untuk konsistensi
    const id = Number(productId);
    
    // Check if product already in cart
    const existingItemIndex = cart.findIndex(item => item.id === id);
    
    if (existingItemIndex !== -1) {
        // Update quantity jika sudah ada
        cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
        console.log('Updated existing item:', cart[existingItemIndex]);
    } else {
        // Validasi dan perbaiki gambar jika perlu
        let validImage = productImg;
        if (!validImage || validImage.includes('undefined') || validImage.includes('baju.png')) {
            // Cari gambar dari database
            const dbProduct = window.productDatabase.find(p => p.id === id);
            if (dbProduct && dbProduct.img) {
                validImage = dbProduct.img;
            } else {
                // Gunakan placeholder
                const shortName = productName.substring(0, 15).replace(/\s+/g, '+');
                validImage = `https://placehold.co/200x200/001f3f/FFFFFF/png?text=${shortName}`;
            }
        }
        
        // Tambah item baru
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
    showNotification(`${productName} berhasil ditambahkan ke keranjang!`);
    return true;
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    showNotification('Produk dihapus dari keranjang!');
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
// 5. SEARCH FUNCTIONALITY
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

// GANTI fungsi handleSearch dengan versi ini:

// GANTI fungsi handleSearch dengan versi ini yang lebih sederhana:
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        showNotification('Silakan masukkan kata kunci pencarian!', 'error');
        return;
    }
    
    // Cari produk yang cocok
    const results = productDatabase.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    if (results.length === 0) {
        showNotification(`Tidak ditemukan produk dengan kata kunci "${searchTerm}"`, 'error');
        return;
    }
    
    console.log('Search results found:', results.length);
    
    // Simpan hasil pencarian untuk penggunaan nanti
    localStorage.setItem('lastSearch', searchTerm);
    localStorage.setItem('searchResults', JSON.stringify(results));
    
    // Tentukan halaman tujuan berdasarkan kategori
    let targetPage = '';
    
    if (results.length === 1) {
        // Jika hanya 1 hasil, langsung ke halaman produk tersebut
        const product = results[0];
        
        // Tentukan path berdasarkan lokasi saat ini
        const currentPath = window.location.pathname;
        const isInPages = currentPath.includes('/pages/');
        
        switch(product.category) {
            case 'clothing':
                targetPage = isInPages ? 'clothing.html' : '../pages/clothing.html';
                break;
            case 'accessories':
                targetPage = isInPages ? 'accessoris.html' : '../pages/accessoris.html';
                break;
            case 'shoes':
                targetPage = isInPages ? 'shoes.html' : '../pages/shoes.html';
                break;
            default:
                targetPage = isInPages ? 'index.html' : '../index.html';
        }
        
        // Simpan ID produk untuk scroll nanti
        localStorage.setItem('scrollToProduct', product.id);
        
    } else {
        // Jika banyak hasil, cari kategori dengan hasil terbanyak
        const categoryCount = {};
        results.forEach(p => {
            categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
        });
        
        // Cari kategori dengan jumlah terbanyak
        let topCategory = 'clothing';
        let maxCount = 0;
        
        Object.keys(categoryCount).forEach(category => {
            if (categoryCount[category] > maxCount) {
                maxCount = categoryCount[category];
                topCategory = category;
            }
        });
        
        // Tentukan path berdasarkan lokasi saat ini
        const currentPath = window.location.pathname;
        const isInPages = currentPath.includes('/pages/');
        
        switch(topCategory) {
            case 'clothing':
                targetPage = isInPages ? 'clothing.html' : '../pages/clothing.html';
                break;
            case 'accessories':
                targetPage = isInPages ? 'accessoris.html' : '../pages/accessoris.html';
                break;
            case 'shoes':
                targetPage = isInPages ? 'shoes.html' : '../pages/shoes.html';
                break;
            default:
                targetPage = isInPages ? 'index.html' : '../index.html';
        }
    }
    
    console.log('Redirecting to:', targetPage);
    
    // Redirect ke halaman tujuan
    window.location.href = targetPage;
}

function getCorrectPagePath(targetPageFromDB) {
    // targetPageFromDB contoh: "pages/clothing.html"
    const currentPath = window.location.pathname;
    const isInPagesFolder = currentPath.includes('/pages/');
    
    console.log('📍 Current path:', currentPath);
    console.log('📁 Is in pages folder?', isInPagesFolder);
    console.log('🎯 Target from DB:', targetPageFromDB);
    
    // Jika target dari DB sudah ada "pages/"
    if (targetPageFromDB.startsWith('pages/')) {
        if (isInPagesFolder) {
            // Jika sudah di folder pages, hapus "pages/" dari awal
            return targetPageFromDB.replace('pages/', '');
        } else {
            // Jika di root (index.html), tetap pakai "pages/"
            return targetPageFromDB;
        }
    } else {
        // Jika target dari DB TIDAK ada "pages/" (misal: "clothing.html")
        if (isInPagesFolder) {
            // Jika sudah di folder pages, langsung pakai
            return targetPageFromDB;
        } else {
            // Jika di root, tambahkan "pages/"
            return 'pages/' + targetPageFromDB;
        }
    }
}

// FUNGSI BARU: Dapatkan URL target yang benar
function getTargetUrl(category) {
    const baseUrl = window.location.origin;
    const currentPath = window.location.pathname;
    
    console.log('📍 Current path for URL building:', currentPath);
    
    let pageName;
    switch(category) {
        case 'clothing':
            pageName = 'clothing.html';
            break;
        case 'accessories':
            pageName = 'accessoris.html';
            break;
        case 'shoes':
            pageName = 'shoes.html';
            break;
        default:
            pageName = 'index.html';
    }
    
    // Cek apakah kita sudah di folder pages atau di root
    if (currentPath.includes('/pages/')) {
        // Jika sudah di pages/, langsung ke file
        return `${baseUrl}/pages/${pageName}`;
    } else {
        // Jika di root (index.html), tambahkan pages/
        // TAPI jika ke index.html, jangan tambah pages/
        if (pageName === 'index.html') {
            return `${baseUrl}/${pageName}`;
        } else {
            return `${baseUrl}/pages/${pageName}`;
        }
    }
}

// Update juga fungsi redirectByCategory
function redirectByCategory(category) {
    const targetUrl = getTargetUrl(category);
    console.log('🎯 Category redirect to:', targetUrl);
    
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 100);
}

// Update juga fungsi redirectToBestCategory
function redirectToBestCategory(results) {
    const categoryCount = {};
    
    results.forEach(product => {
        categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
    });
    
    console.log('Category counts:', categoryCount);
    
    let topCategory = 'clothing';
    let maxCount = 0;
    
    for (const [category, count] of Object.entries(categoryCount)) {
        if (count > maxCount) {
            maxCount = count;
            topCategory = category;
        }
    }
    
    console.log('Top category:', topCategory);
    
    // Simpan hasil untuk highlight
    localStorage.setItem('searchResults', JSON.stringify(results));
    
    // Redirect ke kategori teratas
    redirectByCategory(topCategory);
}

function scrollToProduct() {
    const productId = localStorage.getItem('scrollToProduct');
    
    if (!productId) return;
    
    console.log('Trying to scroll to product ID:', productId);
    
    // Coba beberapa kali dengan delay berbeda
    const attempts = [
        { delay: 500 },
        { delay: 1000 },
        { delay: 1500 }
    ];
    
    attempts.forEach(attempt => {
        setTimeout(() => {
            const productElement = document.querySelector(`[data-id="${productId}"]`);
            
            if (productElement) {
                console.log('Product element found!', productElement);
                
                // Scroll ke produk
                productElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Highlight produk (TANPA BADGE)
                productElement.style.transition = 'all 0.5s ease';
                productElement.style.boxShadow = '0 0 20px rgba(230, 126, 34, 0.5)';
                productElement.style.borderRadius = '15px';
                productElement.style.zIndex = '100';
                
                // Tambah animasi pulsing
                productElement.style.animation = 'pulse 2s infinite';
                
                // Hapus highlight setelah 3 detik
                setTimeout(() => {
                    productElement.style.boxShadow = '';
                    productElement.style.borderRadius = '';
                    productElement.style.animation = '';
                }, 3000);
                
                // Hapus ID dari localStorage
                localStorage.removeItem('scrollToProduct');
            }
        }, attempt.delay);
    });
}

function highlightSearchResults() {
    const lastSearch = localStorage.getItem('lastSearch');
    const searchResults = JSON.parse(localStorage.getItem('searchResults') || '[]');
    
    if (!lastSearch || searchResults.length === 0) return;
    
    console.log('Highlighting search results for:', lastSearch);
    
    // HAPUS SEMUA BADGE SEBELUMNYA TERLEBIH DAHULU
    const existingBadges = document.querySelectorAll('.search-highlight-badge');
    existingBadges.forEach(badge => badge.remove());
    
    // Hapus highlight sebelumnya
    searchResults.forEach(product => {
        const productElement = document.querySelector(`[data-id="${product.id}"]`);
        if (productElement) {
            productElement.style.border = '';
            productElement.style.borderRadius = '';
        }
    });
    
    // Tunggu sebentar untuk memastikan DOM siap
    setTimeout(() => {
        let hasHighlighted = false;
        
        searchResults.forEach(product => {
            // Cari elemen produk
            const productElement = document.querySelector(`[data-id="${product.id}"]`);
            
            if (productElement) {
                // Tambah border highlight
                productElement.style.border = '3px solid var(--orange)';
                productElement.style.borderRadius = '10px';
                productElement.style.position = 'relative';
                productElement.style.overflow = 'visible';
                
                // Tambah badge hasil pencarian
                const badge = document.createElement('div');
                badge.className = 'search-highlight-badge';
                badge.innerHTML = `
                    <i class="fas fa-search"></i> Hasil Pencarian
                `;
                badge.style.cssText = `
                    position: absolute;
                    top: -10px;
                    right: -10px;
                    background: linear-gradient(135deg, var(--orange), #e74c3c);
                    color: white;
                    padding: 8px 15px;
                    border-radius: 25px;
                    font-size: 0.8rem;
                    font-weight: bold;
                    z-index: 1000;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                    animation: badgeFadeIn 0.5s ease;
                    white-space: nowrap;
                `;
                
                // Tambah event untuk menghapus badge saat diklik
                badge.addEventListener('click', function(e) {
                    e.stopPropagation();
                    this.remove();
                    localStorage.removeItem('lastSearch');
                    localStorage.removeItem('searchResults');
                });
                
                productElement.appendChild(badge);
                hasHighlighted = true;
                
                console.log('Highlighted product:', product.name);
            }
        });
        
        // Tambah CSS untuk animasi
        if (!document.querySelector('#highlight-animation')) {
            const style = document.createElement('style');
            style.id = 'highlight-animation';
            style.textContent = `
                @keyframes badgeFadeIn {
                    from { opacity: 0; transform: scale(0.5) rotate(-5deg); }
                    to { opacity: 1; transform: scale(1) rotate(0); }
                }
                
                @keyframes badgePulse {
                    0% { box-shadow: 0 4px 12px rgba(230, 126, 34, 0.4); }
                    50% { box-shadow: 0 6px 20px rgba(230, 126, 34, 0.7); }
                    100% { box-shadow: 0 4px 12px rgba(230, 126, 34, 0.4); }
                }
                
                .search-highlight-badge {
                    animation: badgeFadeIn 0.5s ease, badgePulse 2s infinite;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .search-highlight-badge:hover {
                    transform: scale(1.05);
                    background: linear-gradient(135deg, #e74c3c, var(--orange));
                }
            `;
            document.head.appendChild(style);
        }
        
        // Hapus highlight setelah 10 detik OTOMATIS
        if (hasHighlighted) {
            setTimeout(() => {
                removeAllSearchHighlights();
            }, 10000);
        }
        
    }, 1000);
}

// FUNGSI BARU: Hapus semua highlight dan badge
function removeAllSearchHighlights() {
    console.log('Removing all search highlights...');
    
    // Hapus semua badge
    const badges = document.querySelectorAll('.search-highlight-badge');
    badges.forEach(badge => badge.remove());
    
    // Hapus border dari semua produk
    const allProducts = document.querySelectorAll('.fashion-card, .shoe-card, .accessory-card');
    allProducts.forEach(product => {
        product.style.border = '';
        product.style.borderRadius = '';
    });
    
    // Hapus data pencarian dari localStorage
    localStorage.removeItem('lastSearch');
    localStorage.removeItem('searchResults');
    localStorage.removeItem('scrollToProduct');
    
    // Hapus animasi CSS jika ada
    const highlightStyle = document.querySelector('#highlight-animation');
    if (highlightStyle) highlightStyle.remove();
}

// TAMBAHKAN JUGÀ FUNGSI UNTUK MEMBERSIHKAN PADA HALAMAN LAIN
function checkAndCleanSearchData() {
    // Hapus data search jika pengguna pindah ke halaman lain
    const currentPath = window.location.pathname;
    const isSearchPage = currentPath.includes('search') || 
                        currentPath.includes('clothing') || 
                        currentPath.includes('shoes') || 
                        currentPath.includes('accessoris');
    
    if (!isSearchPage) {
        removeAllSearchHighlights();
    }
}

function redirectByCategory(category) {
    let targetPage = 'index.html';
    
    // Cek halaman saat ini untuk menentukan path yang benar
    const currentPath = window.location.pathname;
    const isInPagesFolder = currentPath.includes('/pages/');
    
    switch(category) {
        case 'clothing':
            targetPage = isInPagesFolder ? 'clothing.html' : 'pages/clothing.html';
            break;
        case 'accessories':
            targetPage = isInPagesFolder ? 'accessoris.html' : 'pages/accessoris.html';
            break;
        case 'shoes':
            targetPage = isInPagesFolder ? 'shoes.html' : 'pages/shoes.html';
            break;
    }
    
    console.log('Redirecting to:', targetPage);
    window.location.href = targetPage;
}

function redirectToBestCategory(results) {
    const categoryCount = {};
    
    results.forEach(product => {
        categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
    });
    
    console.log('Category counts:', categoryCount);
    
    // Cari kategori dengan hasil terbanyak
    let topCategory = 'clothing';
    let maxCount = 0;
    
    for (const [category, count] of Object.entries(categoryCount)) {
        if (count > maxCount) {
            maxCount = count;
            topCategory = category;
        }
    }
    
    // Simpan hasil pencarian untuk ditampilkan
    localStorage.setItem('searchResults', JSON.stringify(results));
    
    // Redirect ke halaman kategori
    redirectByCategory(topCategory);
}

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
        border-radius: 10px;
        box-shadow: var(--shadow);
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
            product.name.toLowerCase().includes(term) ||
            product.category.toLowerCase().includes(term)
        ).slice(0, 5); // Limit 5 suggestions
        
        if (suggestions.length > 0) {
            suggestionsContainer.innerHTML = suggestions.map(product => `
                <div class="search-suggestion" 
                     data-id="${product.id}"
                     style="padding: 10px 15px; cursor: pointer; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-${getCategoryIcon(product.category)}" style="color: var(--orange);"></i>
                    <div>
                        <div style="font-weight: 600; color: var(--navy);">${product.name}</div>
                        <div style="font-size: 0.8rem; color: var(--gray-medium);">
                            Rp ${product.price.toLocaleString('id-ID')} • ${getCategoryName(product.category)}
                        </div>
                    </div>
                </div>
            `).join('');
            
            suggestionsContainer.style.display = 'block';
            
            // Add click event to suggestions
            suggestionsContainer.querySelectorAll('.search-suggestion').forEach(suggestion => {
                suggestion.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    const product = productDatabase.find(p => p.id == productId);
                    
                    if (product) {
                        // Simpan untuk scroll
                        localStorage.setItem('scrollToProduct', productId);
                        
                        // Redirect ke halaman produk
                        window.location.href = product.page || redirectByCategory(product.category);
                    }
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
    
    // Hide suggestions on ESC key
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            suggestionsContainer.style.display = 'none';
        }
    });
}

// Helper functions
function getCategoryIcon(category) {
    switch(category) {
        case 'clothing': return 'tshirt';
        case 'shoes': return 'shoe-prints';
        case 'accessories': return 'glasses';
        default: return 'search';
    }
}

function getCategoryName(category) {
    switch(category) {
        case 'clothing': return 'Pakaian';
        case 'shoes': return 'Sepatu';
        case 'accessories': return 'Aksesoris';
        default: return category;
    }
}

// ======================
// 6. UTILITY FUNCTIONS
// ======================
function showNotification(message, type = 'success') {
    // Cek jika sudah ada notification
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
    
    // Animasi masuk
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Hapus setelah 3 detik
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
// Export fungsi-fungsi penting ke global scope
window.checkLoginStatus = checkLoginStatus;
window.getCart = getCart;
window.saveCart = saveCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.calculateCartTotal = calculateCartTotal;
window.showNotification = showNotification;
window.handleSearch = handleSearch;