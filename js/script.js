// ../js/script.js - File utama untuk semua halaman

// Data produk untuk search (Database produk)
const productDatabase = [
    // Clothing products (ID 101-108)
    { id: 101, name: "Kaos Polos Premium", category: "clothing", price: 99000, page: "pages/clothing.html", img: "https://static.desty.app/desty-store/gudanggaram16/product/48adf6a837df4cc3beaaee30e3d02457?x-oss-process=image/format,webp" },
    { id: 102, name: "Kemeja Casual Pria", category: "clothing", price: 159000, page: "pages/clothing.html", img: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/111/MTA-156964476/no-brand_kemeja-pria-kekinian-kemeja-casual-pria-terbaru-kemeja-polos-pria_full12.jpg" },
    { id: 103, name: "Hoodie Oversize Pria", category: "clothing", price: 229000, page: "pages/clothing.html", img: "https://houseofsmith.co.id/wp-content/uploads/2025/10/ginee_20251021112846938_5104647282.jpg" },
    { id: 104, name: "Jaket Denim Pria", category: "clothing", price: 349000, page: "pages/clothing.html", img: "https://konveksidiamond.com/wp-content/uploads/2023/02/Jaket-denim-jogja.jpeg" },
    { id: 105, name: "Celana Chino Pria", category: "clothing", price: 189000, page: "pages/clothing.html", img: "https://down-id.img.susercontent.com/file/0fe1f469e02531b8cb51af722d22e18a" },
    { id: 106, name: "Sweater Rajut Pria", category: "clothing", price: 279000, page: "pages/clothing.html", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_qQJ41TXO4mOqUmu_4adlMGQUhm-oxCI_8g&s" },
    { id: 107, name: "Kaos Polo Pria", category: "clothing", price: 129000, page: "pages/clothing.html", img: "https://img.lazcdn.com/g/p/59c4f590181f34c0f380b00c5ff19370.jpg_720x720q80.jpg" },
    { id: 108, name: "Blazer Formal Pria", category: "clothing", price: 499000, page: "pages/clothing.html", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkAbIUUI-Z4MxxKJOKPZ5bntxpBSL1m5TFg&s" },
    
    // Accessories products (ID 201-206)
    { id: 201, name: "Tas Ransel Premium", category: "accessories", price: 249000, page: "pages/accessoris.html", img: "https://img.lazcdn.com/g/p/50a806e6a21e784d50ffea84df6a4dce.jpg_720x720q80.jpg" },
    { id: 202, name: "Jam Tangan Casual", category: "accessories", price: 189000, page: "pages/accessoris.html", img: "https://down-id.img.susercontent.com/file/id-11134207-7r98w-lyn7xbryitbcc1" },
    { id: 203, name: "Topi Baseball Premium", category: "accessories", price: 89000, page: "pages/accessoris.html", img: "https://down-id.img.susercontent.com/file/id-11134207-7qukx-lf0ua1cfd38t2e" },
    { id: 204, name: "Dompet Kulit Pria", category: "accessories", price: 159000, page: "pages/accessoris.html", img: "https://down-id.img.susercontent.com/file/31676a8a0b186442550b15b282ae6fbf" },
    { id: 205, name: "Kacamata Hitam Premium", category: "accessories", price: 129000, page: "pages/accessoris.html", img: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/103/MTA-153874624/gykaco_gykaco_nira_-_kacamata_hitam_wanita_-premium-_-_fashion_sunglasses_-import-_full08_u0sbzx25.jpg" },
    { id: 206, name: "Gelang Kulit Pria", category: "accessories", price: 69000, page: "pages/accessoris.html", img: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//95/MTA-56837000/jiayiqi_bracelet-men-high-quality-leather-gelang-pria-gelang-kulit-cowok_full02.jpg" },
    { id: 207, name: "Belt Kulit Premium", category: "accessories", price: 119000, page: "pages/accessoris.html", img: "https://down-id.img.susercontent.com/file/id-11134207-7r992-ltc24kum6lq1e1" },
    { id: 208, name: "Kalung Titanium", category: "accessories", price: 100000, page: "pages/accessoris.html", img: "https://bimg.akulaku.net/goods/spu/0d074c52ebb34cfd9db9195fd9dd421e7741.jpg?w=726&q=80&fit=1" },

    // Shoes products (ID 301-308)
    { id: 301, name: "Sneakers Casual Premium", category: "shoes", price: 329000, page: "pages/shoes.html", img: "https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/471a5872c7e24aa0856a04d3a08e357c~tplv-o3syd03w52-resize-webp:800:800.webp?dr=15584&t=555f072d&ps=933b5bde&shp=6ce186a1&shcp=e1be8f53&idc=my&from=1826719393" },
    { id: 302, name: "Sepatu Formal Leather", category: "shoes", price: 489000, page: "pages/shoes.html", img: "https://www.ginomariani.com/cdn/shop/files/id-11134207-7rasg-m2c59rs5jn40f5.jpg?v=1757305113&width=1445" },
    { id: 303, name: "Running Shoes Sport", category: "shoes", price: 429000, page: "pages/shoes.html", img: "https://m.media-amazon.com/images/I/71f3BmjCwtL.jpg" },
    { id: 304, name: "Leather Boots Pria", category: "shoes", price: 659000, page: "pages/shoes.html", img: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/N25135s3.jpg?im=Resize,width=750" },
    { id: 305, name: "Sandal Casual Pria", category: "shoes", price: 129000, page: "pages/shoes.html", img: "https://down-id.img.susercontent.com/file/32f6e5d00d15b461e94c6bf40933942a" },
    { id: 306, name: "Slip On Casual Shoes", category: "shoes", price: 279000, page: "pages/shoes.html", img: "https://image.made-in-china.com/202f0j00QCPfOVcUsWoT/Men-s-Foldable-Flat-Slip-on-Soft-Casual-Denim-Driving-Loafer-Shoes.webp" },
    { id: 307, name: "Canvas Shoes Basic", category: "shoes", price: 199000, page: "pages/shoes.html", img: "https://i.ebayimg.com/images/g/afgAAOSwXKFnA7Ip/s-l1200.jpg" },
    { id: 308, name: "Loafers Premium", category: "shoes", price: 359000, page: "pages/shoes.html", img: "https://dynamic.zacdn.com/xhMWUm1iL0paUfS7XUpYUvy-Jn0=/0x440/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/berrybenka-label-9821-7508215-1.jpg" }
];

// ======================
// 1. INITIALIZATION
// ======================
// ../js/script.js - Perbaikan bagian add-to-cart

// GANTI fungsi setup event listener add-to-cart
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    initializeMobileMenu();
    initializeSearch();
    updateCartCount();
    
    // Setup event listeners untuk semua tombol "Tambah ke Keranjang" - DIPERBAIKI
    setupAddToCartListeners();
    
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

// FUNGSI BARU untuk setup event listeners
function setupAddToCartListeners() {
    // Hapus semua event listener sebelumnya (prevent duplicate)
    document.removeEventListener('click', handleAddToCartClick);
    
    // Tambahkan event listener baru
    document.addEventListener('click', handleAddToCartClick);
}

// FUNGSI BARU untuk setup event listeners dengan data dari parent
function handleAddToCartClick(e) {
    const button = e.target.closest('.add-to-cart-btn');
    if (!button) return;
    
    e.preventDefault();
    
    // Ambil data dari parent element (fashion-card)
    const productCard = button.closest('.fashion-card');
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

// PERBAIKI fungsi addToCart
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
    
    // Debug: Lihat apa yang ada di cart
    console.log('Cart before adding:', cart);
    
    // Check if product already in cart
    const existingItemIndex = cart.findIndex(item => item.id === id);
    
    if (existingItemIndex !== -1) {
        // Update quantity jika sudah ada
        cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
        console.log('Updated existing item:', cart[existingItemIndex]);
    } else {
        // Tambah item baru
        const newItem = {
           id: id,
            name: productName,
            price: productPrice,
            image: finalProductImg, // GUNAKAN finalProductImg
            quantity: 1
        };
        console.log('Adding new item:', newItem);
        cart.push(newItem);
    }
    
    saveCart(cart);
    
    // Debug: Lihat cart setelah ditambah
    console.log('Cart after adding:', cart);
    
    showNotification(`${productName} berhasil ditambahkan ke keranjang!`);
    return true;
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
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

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
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cart.push({
            id: id,
            name: productName,
            price: productPrice,
            image: productImg,
            quantity: 1
        });
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
    }
}

function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    
    if (!searchTerm) {
        showNotification('Silakan masukkan kata kunci pencarian!');
        return;
    }
    
    const results = productDatabase.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    if (results.length === 0) {
        showNotification(`Tidak ditemukan produk dengan kata kunci "${searchTerm}"`, 'error');
        return;
    }
    
    // Simpan hasil pencarian untuk referensi
    localStorage.setItem('lastSearch', searchTerm);
    localStorage.setItem('lastResults', JSON.stringify(results));
    
    // Redirect ke halaman yang sesuai
    if (results.length === 1) {
        const product = results[0];
        window.location.href = `${product.page}#product-${product.id}`;
    } else {
        const categoryCount = {};
        results.forEach(product => {
            categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
        });
        
        const topCategory = Object.keys(categoryCount).reduce((a, b) => 
            categoryCount[a] > categoryCount[b] ? a : b
        );
        
        if (topCategory === 'clothing') {
            window.location.href = 'pages/clothing.html';
        } else if (topCategory === 'accessories') {
            window.location.href = 'pages/accessoris.html';
        } else if (topCategory === 'shoes') {
            window.location.href = 'pages/shoes.html';
        } else {
            window.location.href = 'index.html';
        }
    }
}

// ======================
// 6. UTILITY FUNCTIONS
// ======================
function showNotification(message, type = 'success') {
    // Cek jika sudah ada notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animasi masuk
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hapus setelah 3 detik
    setTimeout(() => {
        notification.classList.remove('show');
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