// ../js/cart.js - File untuk halaman cart (VERSI DIPERBAIKI)
document.addEventListener('DOMContentLoaded', function() {
    // Load cart data
    loadCartItems();
    
    // Event Listeners
    setupEventListeners();
    
    // Fungsi untuk setup event listeners
    function setupEventListeners() {
        // Checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', handleCheckout);
        }
        
        // Clear cart button
        const clearCartBtn = document.getElementById('clear-cart-btn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', clearCart);
        }
        
        // Continue shopping button
        const continueShoppingBtn = document.getElementById('continue-shopping');
        if (continueShoppingBtn) {
            continueShoppingBtn.addEventListener('click', function() {
                window.location.href = '../index.html';
            });
        }
    }
    
    // Fungsi untuk handle checkout
    function handleCheckout() {
        const cart = getCart();
        if (cart.length === 0) {
            showNotification('Keranjang belanja kosong!', 'error');
            return;
        }
        
        // Check login
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            if (confirm('Anda harus login untuk melanjutkan pembayaran. Login sekarang?')) {
                window.location.href = 'login.html';
            }
            return;
        }
        
        const subtotal = calculateCartTotal();
        const shipping = cart.length > 0 ? 15000 : 0;
        const total = subtotal + shipping;
        
        alert(`Fitur pembayaran akan diimplementasikan di sini.\n\nDetail Pembayaran:\n- Subtotal: Rp ${subtotal.toLocaleString('id-ID')}\n- Biaya Kirim: Rp ${shipping.toLocaleString('id-ID')}\n- Total: Rp ${total.toLocaleString('id-ID')}\n\nKlik OK untuk simulasi pembayaran berhasil.`);
        
        // Simulasi pembayaran berhasil
        localStorage.removeItem('cart');
        showNotification('Pembayaran berhasil! Terima kasih telah berbelanja.');
        
        // Refresh cart
        setTimeout(() => {
            loadCartItems();
        }, 1000);
    }
    
    // Fungsi untuk clear cart
    function clearCart() {
        const cart = getCart();
        if (cart.length === 0) {
            showNotification('Keranjang sudah kosong!', 'warning');
            return;
        }
        
        if (confirm(`Apakah Anda yakin ingin mengosongkan keranjang belanja?\n\n${cart.length} item akan dihapus.`)) {
            localStorage.removeItem('cart');
            loadCartItems();
            showNotification('Keranjang berhasil dikosongkan!');
        }
    }
    
    // Fungsi untuk memuat item cart
    function loadCartItems() {
        const cart = getCart();
        const cartItemsContainer = document.getElementById('cart-items');
        
        if (!cartItemsContainer) return;
        
        if (cart.length === 0) {
            // Tampilkan pesan keranjang kosong
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <div class="empty-cart-icon">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <h3>Keranjang Belanja Kosong</h3>
                    <p>Belum ada barang di keranjang belanja Anda</p>
                    <div class="empty-cart-actions">
                        <a href="../index.html" class="btn btn-primary">
                            <i class="fas fa-shopping-bag"></i> Lanjutkan Belanja
                        </a>
                    </div>
                </div>
            `;
            
            // Update summary dengan nilai 0
            updateCartSummary([]);
            
            // Sembunyikan tombol clear cart
            const clearCartBtn = document.getElementById('clear-cart-btn');
            if (clearCartBtn) clearCartBtn.style.display = 'none';
            
            return;
        }
        
        // Generate HTML untuk setiap item di cart
        let cartHTML = '';
        cart.forEach(item => {
            const itemTotal = item.price * (item.quantity || 1);
            
            // FUNGSI untuk mendapatkan URL gambar yang valid
            const getValidImageUrl = () => {
                // 1. Jika gambar dari item valid (URL eksternal)
                if (item.image && 
                    (item.image.startsWith('http://') || item.image.startsWith('https://')) &&
                    !item.image.includes('baju.png')) {
                    return item.image;
                }
                
                // 2. Coba cari gambar dari database produk global
                if (window.productDatabase) {
                    const dbProduct = window.productDatabase.find(p => p.id === item.id);
                    if (dbProduct && dbProduct.img) {
                        return dbProduct.img;
                    }
                }
                
                // 3. Gunakan placeholder dengan nama produk
                const productName = item.name || 'Product';
                const shortName = productName.substring(0, 15).replace(/\s+/g, '+');
                return `https://placehold.co/200x200/001f3f/FFFFFF/png?text=${shortName}`;
            };
            
            const imageUrl = getValidImageUrl();
            
            cartHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <div class="item-image">
                        <img src="${imageUrl}" alt="${item.name}" 
                             onerror="this.onerror=null; this.src='https://placehold.co/200x200/001f3f/FFFFFF/png?text=${encodeURIComponent((item.name || 'Product').substring(0, 15))}';">
                    </div>
                    <div class="item-details">
                        <h3 class="item-name">${item.name}</h3>
                        <p class="item-price">Rp ${item.price.toLocaleString('id-ID')}</p>
                        <div class="item-actions">
                            <button class="btn-remove" onclick="removeItemFromCart(${item.id})">
                                <i class="fas fa-trash"></i> Hapus
                            </button>
                        </div>
                    </div>
                    <div class="item-quantity">
                        <button class="qty-btn minus" onclick="updateItemQuantity(${item.id}, ${(item.quantity || 1) - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" class="qty-input" value="${item.quantity || 1}" min="1" 
                               onchange="updateItemQuantity(${item.id}, this.value)">
                        <button class="qty-btn plus" onclick="updateItemQuantity(${item.id}, ${(item.quantity || 1) + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="item-total">
                        <span>Rp ${itemTotal.toLocaleString('id-ID')}</span>
                    </div>
                </div>
            `;
        });
        
        cartItemsContainer.innerHTML = cartHTML;
        updateCartSummary(cart);
        
        // Tampilkan tombol clear cart
        const clearCartBtn = document.getElementById('clear-cart-btn');
        if (clearCartBtn) {
            clearCartBtn.style.display = 'block';
        }
        
        // Debug: log cart data
        console.log('Cart items loaded:', cart);
    }
});

// ======================
// FUNGSI GLOBAL UNTUK CART
// ======================

// Fungsi untuk menghapus item dari cart
function removeItemFromCart(productId) {
    if (!confirm('Hapus item ini dari keranjang?')) return;
    
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id == productId);
    
    if (itemIndex !== -1) {
        const itemName = cart[itemIndex].name;
        cart.splice(itemIndex, 1);
        saveCart(cart);
        
        // Reload cart items
        if (typeof loadCartItems === 'function') {
            loadCartItems();
        }
        
        showNotification(`${itemName} dihapus dari keranjang!`, 'success');
    }
}

// Fungsi untuk mengupdate quantity
function updateItemQuantity(productId, newQuantity) {
    newQuantity = parseInt(newQuantity);
    
    if (isNaN(newQuantity) || newQuantity < 1) {
        removeItemFromCart(productId);
        return;
    }
    
    let cart = getCart();
    const item = cart.find(item => item.id == productId);
    
    if (item) {
        item.quantity = newQuantity;
        saveCart(cart);
        
        // Update tampilan langsung
        const itemElement = document.querySelector(`.cart-item[data-id="${productId}"]`);
        if (itemElement) {
            const itemTotal = item.price * item.quantity;
            const totalSpan = itemElement.querySelector('.item-total span');
            if (totalSpan) {
                totalSpan.textContent = `Rp ${itemTotal.toLocaleString('id-ID')}`;
            }
            
            const qtyInput = itemElement.querySelector('.qty-input');
            if (qtyInput) {
                qtyInput.value = newQuantity;
            }
        }
        
        // Update summary
        if (typeof updateCartSummary === 'function') {
            updateCartSummary(cart);
        }
        
        showNotification('Jumlah item diperbarui!', 'success');
    }
}

// Helper functions
function getCart() {
    const cartData = localStorage.getItem('cart');
    try {
        return cartData ? JSON.parse(cartData) : [];
    } catch (e) {
        console.error('Error parsing cart data:', e);
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

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartCount = document.getElementById('cartCount');
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function calculateCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
}

function updateCartSummary(cart) {
    const subtotal = calculateCartTotal();
    const shipping = cart.length > 0 ? 15000 : 0;
    const total = subtotal + shipping;
    const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    // Update semua elemen
    const elements = {
        'item-count': `${itemCount} ${itemCount === 1 ? 'item' : 'items'}`,
        'subtotal': `Rp ${subtotal.toLocaleString('id-ID')}`,
        'shipping': `Rp ${shipping.toLocaleString('id-ID')}`,
        'summary-total': `Rp ${total.toLocaleString('id-ID')}`,
        'total-price': `Rp ${total.toLocaleString('id-ID')}`
    };
    
    for (const [id, value] of Object.entries(elements)) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }
    
    // Update tombol checkout
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
        checkoutBtn.textContent = cart.length === 0 ? 'Keranjang Kosong' : `Bayar Rp ${total.toLocaleString('id-ID')}`;
    }
}

// Fungsi untuk show notification
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

// Fungsi untuk menambahkan ke cart (untuk demo) - DIPERBAIKI
window.addToCart = function(productId, productName, productPrice, productImage) {
    // Check login status
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        if (confirm('Anda harus login terlebih dahulu. Login sekarang?')) {
            window.location.href = 'login.html';
        }
        return false;
    }
    
    let cart = getCart();
    
    // Validasi dan perbaiki URL gambar
    let validImage = productImage;
    if (!validImage || validImage.includes('baju.png')) {
        const shortName = productName ? productName.substring(0, 15).replace(/\s+/g, '+') : 'Product';
        validImage = `https://placehold.co/200x200/001f3f/FFFFFF/png?text=${shortName}`;
    }
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id == productId);
    
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cart.push({
            id: Number(productId),
            name: productName,
            price: Number(productPrice),
            image: validImage,
            quantity: 1
        });
    }
    
    saveCart(cart);
    
    // Debug log
    console.log('Product added to cart:', {
        id: productId,
        name: productName,
        image: validImage
    });
    
    // Refresh display jika di halaman cart
    if (window.location.pathname.includes('cart.html')) {
        document.dispatchEvent(new Event('DOMContentLoaded'));
    }
    
    showNotification(`${productName} berhasil ditambahkan!`, 'success');
    return true;
}