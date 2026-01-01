// ../js/cart.js - File untuk halaman cart
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
        
        // Demo add items button
        const demoBtn = document.getElementById('demo-add-items');
        if (demoBtn) {
            demoBtn.addEventListener('click', addDemoItems);
        }
        
        // Demo product buttons
        document.querySelectorAll('.add-demo-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const productName = this.getAttribute('data-name');
                const productPrice = parseInt(this.getAttribute('data-price'));
                
                addToCart(productId, productName, productPrice, '../img/baju.png');
            });
        });
    }
    
    // Fungsi untuk handle checkout
    function handleCheckout() {
        const cart = getCart();
        if (cart.length === 0) {
            showNotification('Keranjang belanja kosong!');
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
        
        const total = calculateCartTotal() + (cart.length > 0 ? 15000 : 0);
        alert(`Fitur pembayaran akan diimplementasikan di sini.\n\nTotal Pembayaran: Rp ${total.toLocaleString('id-ID')}\n\nKlik OK untuk simulasi pembayaran berhasil.`);
        
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
        if (confirm('Apakah Anda yakin ingin mengosongkan keranjang belanja?')) {
            localStorage.removeItem('cart');
            loadCartItems();
            showNotification('Keranjang berhasil dikosongkan!');
        }
    }
    
    // Fungsi untuk memuat item cart
    function loadCartItems() {
        const cart = getCart();
        const cartItemsContainer = document.getElementById('cart-items');
        
        if (cart.length === 0) {
            // Tampilkan pesan keranjang kosong
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-basket"></i>
                    <p>Keranjang belanja Anda masih kosong</p>
                    <button id="demo-add-items" class="btn demo-btn">Tambahkan Item Demo</button>
                    <a href="index.html" class="btn back-btn">Lanjutkan Belanja</a>
                </div>
            `;
            
            // Re-attach event listener untuk demo button
            document.getElementById('demo-add-items')?.addEventListener('click', addDemoItems);
            
            // Update summary dengan nilai 0
            updateCartSummary([]);
            return;
        }
        
        // Generate HTML untuk setiap item di cart
        let cartHTML = '';
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            cartHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <div class="item-image">
                        <img src="${item.image || '../img/baju.png'}" alt="${item.name}">
                    </div>
                    <div class="item-details">
                        <h3 class="item-name">${item.name}</h3>
                        <p class="item-price">Rp ${item.price.toLocaleString('id-ID')}</p>
                        <div class="item-actions">
                            <button class="btn-remove" onclick="removeItem(${item.id})">
                                <i class="fas fa-trash"></i> Hapus
                            </button>
                        </div>
                    </div>
                    <div class="item-quantity">
                        <button class="qty-btn minus" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="number" class="qty-input" value="${item.quantity}" min="1" 
                               onchange="updateQuantity(${item.id}, this.value)">
                        <button class="qty-btn plus" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
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
        
        // Update tombol clear cart visibility
        const clearCartBtn = document.getElementById('clear-cart-btn');
        if (clearCartBtn) {
            clearCartBtn.style.display = 'block';
        }
    }
    
    // Fungsi untuk menambahkan item demo
    function addDemoItems() {
        const demoItems = [
            {
                id: 101,
                name: "Kaos Polos Premium",
                price: 99000,
                image: "../img/baju.png",
                quantity: 2
            },
            {
                id: 103,
                name: "Hoodie Oversize Pria",
                price: 229000,
                image: "../img/baju.png",
                quantity: 1
            },
            {
                id: 105,
                name: "Celana Chino Pria",
                price: 189000,
                image: "../img/baju.png",
                quantity: 1
            }
        ];
        
        // Ambil cart yang ada
        let cart = getCart();
        
        // Tambahkan demo items jika belum ada
        demoItems.forEach(demoItem => {
            const existingItem = cart.find(item => item.id === demoItem.id);
            if (existingItem) {
                existingItem.quantity += demoItem.quantity;
            } else {
                cart.push(demoItem);
            }
        });
        
        saveCart(cart);
        loadCartItems();
        showNotification('Item demo berhasil ditambahkan ke keranjang!');
    }
});

// ======================
// FUNGSI GLOBAL UNTUK CART
// ======================

// Fungsi untuk menghapus item dari cart
function removeItem(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    
    // Reload cart items
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        // Panggil ulang loadCartItems melalui custom event
        document.dispatchEvent(new Event('DOMContentLoaded'));
    }
    
    showNotification('Item berhasil dihapus dari keranjang!');
}

// Fungsi untuk mengupdate quantity
function updateQuantity(productId, quantity) {
    quantity = parseInt(quantity);
    
    if (isNaN(quantity) || quantity < 1) {
        removeItem(productId);
        return;
    }
    
    let cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity = quantity;
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
                qtyInput.value = quantity;
            }
        }
        
        // Update summary
        updateCartSummary(cart);
        showNotification('Jumlah item diperbarui!');
    }
}

// Helper functions
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count di semua halaman
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function calculateCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCartSummary(cart) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 15000 : 0;
    const total = subtotal + shipping;
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
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
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    
    if (notification && notificationText) {
        notificationText.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Fungsi untuk menambahkan ke cart dari halaman cart
function addToCart(productId, productName, productPrice, productImage = '../img/baju.png') {
    // Check login status
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        if (confirm('Anda harus login terlebih dahulu. Login sekarang?')) {
            window.location.href = 'login.html';
        }
        return false;
    }
    
    let cart = getCart();
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }
    
    saveCart(cart);
    
    // Refresh display
    document.dispatchEvent(new Event('DOMContentLoaded'));
    
    showNotification(`${productName} berhasil ditambahkan!`);
    return true;
}