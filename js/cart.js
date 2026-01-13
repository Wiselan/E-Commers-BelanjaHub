// ../js/cart.js - File for cart page (IMPROVED VERSION)
document.addEventListener('DOMContentLoaded', function() {
    // Load cart data
    loadCartItems();
    
    // Event Listeners
    setupEventListeners();
    
    // Function to setup event listeners
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
    
    // Function to handle checkout
    function handleCheckout() {
        const cart = getCart();
        if (cart.length === 0) {
            showNotification('Shopping cart is empty!', 'error');
            return;
        }
        
        // Check login
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            if (confirm('You must login to proceed with payment. Login now?')) {
                window.location.href = 'login.html';
            }
            return;
        }
        
        const subtotal = calculateCartTotal();
        const shipping = cart.length > 0 ? 15000 : 0;
        const total = subtotal + shipping;
        
        alert(`Payment feature will be implemented here.\n\nPayment Details:\n- Subtotal: Rp ${subtotal.toLocaleString('id-ID')}\n- Shipping Cost: Rp ${shipping.toLocaleString('id-ID')}\n- Total: Rp ${total.toLocaleString('id-ID')}\n\nClick OK for successful payment simulation.`);
        
        // Simulate successful payment
        localStorage.removeItem('cart');
        showNotification('Payment successful! Thank you for shopping.');
        
        // Refresh cart
        setTimeout(() => {
            loadCartItems();
        }, 1000);
    }
    
    // Function to clear cart
    function clearCart() {
        const cart = getCart();
        if (cart.length === 0) {
            showNotification('Cart is already empty!', 'warning');
            return;
        }
        
        if (confirm(`Are you sure you want to empty the shopping cart?\n\n${cart.length} items will be removed.`)) {
            localStorage.removeItem('cart');
            loadCartItems();
            showNotification('Cart successfully emptied!');
        }
    }
    
    // Function to load cart items
    function loadCartItems() {
        const cart = getCart();
        const cartItemsContainer = document.getElementById('cart-items');
        
        if (!cartItemsContainer) return;
        
        if (cart.length === 0) {
            // Show empty cart message
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <div class="empty-cart-icon">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <h3>Shopping Cart is Empty</h3>
                    <p>There are no items in your shopping cart yet</p>
                    <div class="empty-cart-actions">
                        <a href="../index.html" class="btn btn-primary">
                            <i class="fas fa-shopping-bag"></i> Continue Shopping
                        </a>
                    </div>
                </div>
            `;
            
            // Update summary with zero values
            updateCartSummary([]);
            
            // Hide clear cart button
            const clearCartBtn = document.getElementById('clear-cart-btn');
            if (clearCartBtn) clearCartBtn.style.display = 'none';
            
            return;
        }
        
        // Generate HTML for each cart item
        let cartHTML = '';
        cart.forEach(item => {
            const itemTotal = item.price * (item.quantity || 1);
            
            // FUNCTION to get valid image URL
            const getValidImageUrl = () => {
                // 1. If item image is valid (external URL)
                if (item.image && 
                    (item.image.startsWith('http://') || item.image.startsWith('https://')) &&
                    !item.image.includes('baju.png')) {
                    return item.image;
                }
                
                // 2. Try to find image from global product database
                if (window.productDatabase) {
                    const dbProduct = window.productDatabase.find(p => p.id === item.id);
                    if (dbProduct && dbProduct.img) {
                        return dbProduct.img;
                    }
                }
                
                // 3. Use placeholder with product name
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
                                <i class="fas fa-trash"></i> Remove
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
        
        // Show clear cart button
        const clearCartBtn = document.getElementById('clear-cart-btn');
        if (clearCartBtn) {
            clearCartBtn.style.display = 'block';
        }
        
        // Debug: log cart data
        console.log('Cart items loaded:', cart);
    }
});

// ======================
// GLOBAL FUNCTIONS FOR CART
// ======================

// Function to remove item from cart
function removeItemFromCart(productId) {
    if (!confirm('Remove this item from cart?')) return;
    
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
        
        showNotification(`${itemName} removed from cart!`, 'success');
    }
}

// Function to update quantity
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
        
        // Update display directly
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
        
        showNotification('Item quantity updated!', 'success');
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
    
    // Update all elements
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
    
    // Update checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
        checkoutBtn.textContent = cart.length === 0 ? 'Cart is Empty' : `Pay Rp ${total.toLocaleString('id-ID')}`;
    }
}

// Function to show notification
function showNotification(message, type = 'success') {
    // Check if notification already exists
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
    
    // Entrance animation
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

// Function to add to cart (for demo) - IMPROVED
window.addToCart = function(productId, productName, productPrice, productImage) {
    // Check login status
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        if (confirm('You must login first. Login now?')) {
            window.location.href = 'login.html';
        }
        return false;
    }
    
    let cart = getCart();
    
    // Validate and fix image URL
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
    
    // Refresh display if on cart page
    if (window.location.pathname.includes('cart.html')) {
        document.dispatchEvent(new Event('DOMContentLoaded'));
    }
    
    showNotification(`${productName} successfully added!`, 'success');
    return true;
}