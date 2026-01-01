// ../js/script.js - File utama untuk semua halaman

// Data produk untuk search (Database produk)
const productDatabase = [
    // Clothing products (ID 101-108)
    { id: 101, name: "Kaos Polos Premium", category: "clothing", price: 99000, page: "clothing.html" },
    { id: 102, name: "Kemeja Casual Pria", category: "clothing", price: 159000, page: "clothing.html" },
    { id: 103, name: "Hoodie Oversize Pria", category: "clothing", price: 229000, page: "clothing.html" },
    { id: 104, name: "Jaket Denim Pria", category: "clothing", price: 349000, page: "clothing.html" },
    { id: 105, name: "Celana Chino Pria", category: "clothing", price: 189000, page: "clothing.html" },
    { id: 106, name: "Sweater Rajut Pria", category: "clothing", price: 279000, page: "clothing.html" },
    { id: 107, name: "Kaos Polo Pria", category: "clothing", price: 129000, page: "clothing.html" },
    { id: 108, name: "Blazer Formal Pria", category: "clothing", price: 499000, page: "clothing.html" },
    
    // Accessories products (ID 201-206)
    { id: 201, name: "Tas Ransel Premium", category: "accessories", price: 249000, page: "accessoris.html" },
    { id: 202, name: "Jam Tangan Casual", category: "accessories", price: 189000, page: "accessoris.html" },
    { id: 203, name: "Topi Baseball Premium", category: "accessories", price: 89000, page: "accessoris.html" },
    { id: 204, name: "Dompet Kulit Pria", category: "accessories", price: 159000, page: "accessoris.html" },
    { id: 205, name: "Kacamata Hitam Premium", category: "accessories", price: 129000, page: "accessoris.html" },
    { id: 206, name: "Gelang Kulit Pria", category: "accessories", price: 69000, page: "accessoris.html" },
    
    // Shoes products (ID 301-308)
    { id: 301, name: "Sneakers Casual Premium", category: "shoes", price: 329000, page: "shoes.html" },
    { id: 302, name: "Sepatu Formal Leather", category: "shoes", price: 489000, page: "shoes.html" },
    { id: 303, name: "Running Shoes Sport", category: "shoes", price: 429000, page: "shoes.html" },
    { id: 304, name: "Leather Boots Pria", category: "shoes", price: 659000, page: "shoes.html" },
    { id: 305, name: "Sandal Casual Pria", category: "shoes", price: 129000, page: "shoes.html" },
    { id: 306, name: "Slip On Casual Shoes", category: "shoes", price: 279000, page: "shoes.html" },
    { id: 307, name: "Canvas Shoes Basic", category: "shoes", price: 199000, page: "shoes.html" },
    { id: 308, name: "Loafers Premium", category: "shoes", price: 359000, page: "shoes.html" }
];

// ======================
// 1. USER MANAGEMENT
// ======================
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    initializeMobileMenu();
    checkScrollbar();
    initializeSearch();
    
    // Periksa apakah ada user yang login
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userName = localStorage.getItem('userName');
        const loginBtn = document.getElementById('loginBtn');
        const userInfo = document.getElementById('userInfo');
        const userNameSpan = document.getElementById('userName');
        
        if (isLoggedIn && userName) {
            // User sudah login
            if (loginBtn) loginBtn.style.display = 'none';
            if (userInfo) {
                userInfo.style.display = 'flex';
                userInfo.classList.add('logged-in');
            }
            if (userNameSpan) userNameSpan.textContent = `Halo, ${userName}`;
            
            // Initialize live chat setelah login
            setTimeout(initializeLiveChat, 500);
        } else {
            // User belum login
            if (loginBtn) loginBtn.style.display = 'inline-block';
            if (userInfo) {
                userInfo.style.display = 'none';
                userInfo.classList.remove('logged-in');
            }
            
            // Sembunyikan live chat jika ada
            const chatWidget = document.getElementById('liveChatWidget');
            if (chatWidget) {
                chatWidget.style.display = 'none';
            }
        }
    }
    
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Clear user data
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');
            
            // Sembunyikan live chat
            const chatWidget = document.getElementById('liveChatWidget');
            if (chatWidget) {
                chatWidget.style.display = 'none';
            }
            
            // Clear chat history jika ingin
            // localStorage.removeItem('belanjahub_chat');
            
            showNotification('Anda telah logout!');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }
    
    // ======================
    // 2. CART MANAGEMENT
    // ======================
    updateCartCount();
    
    // Fungsi untuk update cart count di semua halaman
    function updateCartCount() {
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.getElementById('cartCount');
        
        if (cartCount) {
            cartCount.textContent = totalItems;
            if (totalItems > 0) {
                cartCount.classList.add('show');
            } else {
                cartCount.classList.remove('show');
            }
        }
    }
    
    // Fungsi untuk mendapatkan cart dari localStorage
    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }
    
    // Fungsi untuk menyimpan cart ke localStorage
    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }
    
    // Fungsi untuk menambahkan item ke cart
    window.addToCart = function(productId, productName, productPrice, productImage = '../img/baju.png') {
        // Check login status
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        if (!isLoggedIn) {
            if (confirm('Anda harus login terlebih dahulu untuk menambahkan ke keranjang. Login sekarang?')) {
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
        showNotification(`${productName} berhasil ditambahkan ke keranjang!`);
        return true;
    }
    
    // Fungsi untuk menghapus item dari cart
    window.removeFromCart = function(productId) {
        let cart = getCart();
        cart = cart.filter(item => item.id !== productId);
        saveCart(cart);
        return cart;
    }
    
    // Fungsi untuk mengupdate quantity
    window.updateCartQuantity = function(productId, quantity) {
        if (quantity < 1) return removeFromCart(productId);
        
        let cart = getCart();
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            item.quantity = quantity;
            saveCart(cart);
        }
        
        return cart;
    }
    
    // Fungsi untuk menghitung total harga
    window.calculateCartTotal = function() {
        const cart = getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    // ======================
    // 3. LIVE CHAT SYSTEM
    // ======================
    function initializeLiveChat() {
        // Cek apakah user sudah login
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) return;
        
        // Cek jika di halaman login/signup
        const currentPath = window.location.pathname;
        const isAuthPage = currentPath.includes('login.html') || currentPath.includes('signup.html');
        if (isAuthPage) return;
        
        // Tunggu sebentar untuk memastikan DOM siap
        setTimeout(() => {
            const chatWidget = document.getElementById('liveChatWidget');
            if (!chatWidget) return;
            
            // Tampilkan chat widget
            chatWidget.style.display = 'block';
            
            // Setup chat functionality jika belum ada di halaman
            if (!window.liveChatInitialized) {
                setupChatFunctionality();
                window.liveChatInitialized = true;
            }
        }, 1000);
    }
    
    function setupChatFunctionality() {
        const chatWidget = document.getElementById('liveChatWidget');
        const chatToggle = document.getElementById('chatToggle');
        const chatContainer = document.getElementById('chatContainer');
        const chatClose = document.getElementById('chatClose');
        const chatMessages = document.getElementById('chatMessages');
        const chatInput = document.getElementById('chatInput');
        const sendButton = document.getElementById('sendMessage');
        const chatBadge = document.getElementById('chatBadge');
        const quickReplies = document.querySelectorAll('.quick-reply');
        
        if (!chatWidget || !chatToggle) return;
        
        let isChatOpen = false;
        let unreadMessages = 0;
        
        // Event Listeners
        chatToggle.addEventListener('click', toggleChat);
        if (chatClose) chatClose.addEventListener('click', closeChat);
        if (sendButton) sendButton.addEventListener('click', sendMessage);
        if (chatInput) chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });
        
        // Quick replies
        if (quickReplies.length > 0) {
            quickReplies.forEach(button => {
                button.addEventListener('click', function() {
                    const question = this.getAttribute('data-question');
                    if (question) sendQuickReply(question);
                });
            });
        }
        
        // Close chat jika klik di luar
        document.addEventListener('click', function(e) {
            if (isChatOpen && chatContainer && 
                !chatContainer.contains(e.target) && 
                !chatToggle.contains(e.target)) {
                closeChat();
            }
        });
        
        // Load chat history
        loadChatHistory();
        
        function toggleChat() {
            if (isChatOpen) {
                closeChat();
            } else {
                openChat();
            }
        }
        
        function openChat() {
            isChatOpen = true;
            if (chatContainer) {
                chatContainer.classList.add('active');
                chatToggle.style.transform = 'rotate(360deg)';
                if (chatInput) chatInput.focus();
                
                // Reset badge
                unreadMessages = 0;
                updateBadge();
            }
        }
        
        function closeChat() {
            isChatOpen = false;
            if (chatContainer) {
                chatContainer.classList.remove('active');
                chatToggle.style.transform = 'rotate(0deg)';
            }
        }
        
        function sendMessage() {
            if (!chatInput) return;
            
            const message = chatInput.value.trim();
            
            if (message) {
                addMessage(message, 'user');
                chatInput.value = '';
                saveToChatHistory(message, 'user');
                
                // Auto-reply bot
                setTimeout(() => {
                    const responses = [
                        "Terima kasih pesannya! Tim kami akan membalas secepatnya.",
                        "Pertanyaan Anda telah tercatat. Mohon tunggu balasan dari CS kami.",
                        "Untuk informasi produk, silakan cek halaman detail produk ya!",
                        "Diskon sedang berlangsung hingga 60% untuk produk pilihan!",
                        "Pengiriman biasanya 2-5 hari kerja untuk Jabodetabek.",
                        "Apakah ada hal lain yang bisa saya bantu?"
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    addMessage(randomResponse, 'bot');
                    saveToChatHistory(randomResponse, 'bot');
                    
                    // Jika chat tertutup, tambah badge
                    if (!isChatOpen) {
                        unreadMessages++;
                        updateBadge();
                    }
                }, 1000);
            }
        }
        
        function sendQuickReply(question) {
            addMessage(question, 'user');
            saveToChatHistory(question, 'user');
            
            setTimeout(() => {
                let response;
                
                if (question.includes('diskon')) {
                    response = "Ya! Saat ini ada diskon hingga 60% untuk koleksi musiman. Cek halaman produk untuk detailnya!";
                } else if (question.includes('pengiriman')) {
                    response = "Pengiriman memakan waktu 2-5 hari kerja untuk Jabodetabek dan 3-7 hari untuk luar kota. Gratis ongkir untuk pembelian di atas Rp 300.000!";
                } else if (question.includes('bayar')) {
                    response = "Kami menerima: Transfer Bank (BCA, Mandiri, BNI), E-Wallet (OVO, Gopay, Dana), dan COD (Cash on Delivery).";
                } else {
                    response = "Terima kasih! CS kami akan segera menghubungi Anda.";
                }
                
                addMessage(response, 'bot');
                saveToChatHistory(response, 'bot');
                
                if (!isChatOpen) {
                    unreadMessages++;
                    updateBadge();
                }
            }, 800);
        }
        
        function addMessage(text, sender) {
            if (!chatMessages) return;
            
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            
            const now = new Date();
            const time = now.toLocaleTimeString('id-ID', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            let senderName = sender === 'user' ? 'Anda' : 'BelanjaHub Bot';
            let senderIcon = sender === 'user' ? 'fas fa-user' : 'fas fa-robot';
            
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-sender">
                        <i class="${senderIcon}"></i> ${senderName}
                    </div>
                    <div class="message-text">${text}</div>
                    <div class="message-time">${time}</div>
                </div>
            `;
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        function updateBadge() {
            if (!chatBadge) return;
            
            if (unreadMessages > 0) {
                chatBadge.textContent = unreadMessages;
                chatBadge.style.display = 'flex';
            } else {
                chatBadge.style.display = 'none';
            }
        }
        
        function saveToChatHistory(message, sender) {
            const chatHistory = JSON.parse(localStorage.getItem('belanjahub_chat') || '[]');
            
            chatHistory.push({
                message: message,
                sender: sender,
                timestamp: new Date().toISOString()
            });
            
            // Simpan maks 50 pesan terakhir
            if (chatHistory.length > 50) {
                chatHistory.splice(0, chatHistory.length - 50);
            }
            
            localStorage.setItem('belanjahub_chat', JSON.stringify(chatHistory));
        }
        
        function loadChatHistory() {
            if (!chatMessages) return;
            
            const chatHistory = JSON.parse(localStorage.getItem('belanjahub_chat') || '[]');
            
            // Hapus pesan default jika ada history
            if (chatHistory.length > 0) {
                chatMessages.innerHTML = '';
            }
            
            chatHistory.forEach(item => {
                addMessage(item.message, item.sender);
            });
        }
    }
    
    // ======================
    // 4. MOBILE MENU TOGGLE
    // ======================
    function initializeMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                navLinks.classList.toggle('open');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    navLinks.classList.remove('open');
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
            
            const previousSearch = localStorage.getItem('searchTerm');
            if (previousSearch) {
                searchInput.value = previousSearch;
            }
        }
    }
    
    // ======================
    // 6. SCROLLBAR DETECTION
    // ======================
    function checkScrollbar() {
        const navbarContainer = document.querySelector('.navbar .container');
        const hasVerticalScrollbar = document.body.scrollHeight > window.innerHeight;
        
        if (navbarContainer && hasVerticalScrollbar) {
            navbarContainer.classList.add('has-scrollbar');
        } else if (navbarContainer) {
            navbarContainer.classList.remove('has-scrollbar');
        }
    }
    
    window.addEventListener('resize', checkScrollbar);
    
    // Expose functions to global scope
    window.getCart = getCart;
    window.saveCart = saveCart;
    window.checkScrollbar = checkScrollbar;
    window.handleSearch = handleSearch;
});

// ======================
// SEARCH FUNCTIONS (GLOBAL)
// ======================

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
        showNotification(`Tidak ditemukan produk dengan kata kunci "${searchTerm}"`);
        return;
    }
    
    localStorage.setItem('lastSearch', searchTerm);
    localStorage.setItem('lastResults', JSON.stringify(results));
    
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
            window.location.href = 'clothing.html';
        } else if (topCategory === 'accessories') {
            window.location.href = 'accessoris.html';
        } else if (topCategory === 'shoes') {
            window.location.href = 'shoes.html';
        } else {
            window.location.href = 'index.html';
        }
    }
}

// ======================
// GLOBAL FUNCTIONS
// ======================

// Fungsi untuk menampilkan notifikasi global
window.showNotification = function(message, type = 'success') {
    // Cek jika sudah ada notification
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `cart-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
};

// Fungsi untuk check login status global
window.checkLoginStatus = function() {
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
};

// Fungsi untuk mendapatkan cart (global)
window.getCart = function() {
    return JSON.parse(localStorage.getItem('cart')) || [];
};

// Fungsi untuk menyimpan cart (global)
window.saveCart = function(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = totalItems;
        if (totalItems > 0) {
            cartCount.classList.add('show');
        } else {
            cartCount.classList.remove('show');
        }
    }
};

// ======================
// ADDITIONAL CHAT FUNCTIONS
// ======================

// Fungsi untuk toggle chat secara manual (bisa dipanggil dari console)
window.toggleChat = function() {
    const chatWidget = document.getElementById('liveChatWidget');
    const chatToggle = document.getElementById('chatToggle');
    
    if (chatWidget && chatToggle) {
        if (chatWidget.style.display === 'none' || !chatWidget.style.display) {
            chatWidget.style.display = 'block';
            chatToggle.click();
        } else {
            chatToggle.click();
        }
    }
};

// Fungsi untuk cek apakah chat tersedia
window.isChatAvailable = function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentPath = window.location.pathname;
    const isAuthPage = currentPath.includes('login.html') || currentPath.includes('signup.html');
    
    return isLoggedIn && !isAuthPage;
};