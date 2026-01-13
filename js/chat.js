// chat.js - Fix Double Message Issue
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    function isUserLoggedIn() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || 
                          sessionStorage.getItem('isLoggedIn') === 'true';
        
        const userData = JSON.parse(localStorage.getItem('userData') || sessionStorage.getItem('userData') || '{}');
        
        return isLoggedIn || (userData && userData.isLoggedIn);
    }
    
    // Check if on login/signup page
    function isAuthPage() {
        const currentPath = window.location.pathname;
        return currentPath.includes('login.html') || currentPath.includes('signup.html');
    }
    
    // If user not logged in or on auth page, hide chat
    if (!isUserLoggedIn() || isAuthPage()) {
        return;
    }
    
    // Check if chat is already initialized
    if (window.chatInitialized) {
        console.log('Chat already initialized previously');
        return;
    }
    
    // Initialize Live Chat
    initializeLiveChat();
    window.chatInitialized = true;
    
    function initializeLiveChat() {
        const chatWidget = document.getElementById('liveChatWidget');
        const chatToggle = document.getElementById('chatToggle');
        const chatContainer = document.getElementById('chatContainer');
        const chatClose = document.getElementById('chatClose');
        const chatMessages = document.getElementById('chatMessages');
        const chatInput = document.getElementById('chatInput');
        const sendButton = document.getElementById('sendMessage');
        const chatBadge = document.getElementById('chatBadge');
        const quickReplies = document.querySelectorAll('.quick-reply');
        
        if (!chatWidget) return;
        
        let isChatOpen = false;
        let unreadMessages = 0;
        let isProcessing = false; // Flag to check if processing message
        
        // Show chat widget
        chatWidget.style.display = 'block';
        
        // Remove all previous event listeners (if any)
        const newToggle = chatToggle.cloneNode(true);
        chatToggle.parentNode.replaceChild(newToggle, chatToggle);
        
        if (sendButton) {
            const newSendButton = sendButton.cloneNode(true);
            sendButton.parentNode.replaceChild(newSendButton, sendButton);
        }
        
        // Event Listeners - only once
        newToggle.addEventListener('click', toggleChat);
        
        if (chatClose) {
            chatClose.addEventListener('click', closeChat);
        }
        
        if (sendButton) {
            sendButton.addEventListener('click', function(e) {
                e.preventDefault();
                sendMessage();
            });
        }
        
        if (chatInput) {
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    sendMessage();
                }
            });
        }
        
        // Quick replies - Remove old event listeners first
        quickReplies.forEach(button => {
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                const question = this.getAttribute('data-question');
                if (question) sendQuickReply(question);
            });
        });
        
        // Close chat if click outside
        document.addEventListener('click', function(e) {
            if (isChatOpen && chatContainer && 
                !chatContainer.contains(e.target) && 
                !newToggle.contains(e.target)) {
                closeChat();
            }
        });
        
        // Load chat history from sessionStorage
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
                newToggle.style.transform = 'rotate(360deg)';
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
                newToggle.style.transform = 'rotate(0deg)';
            }
        }
        
        function sendMessage() {
            if (!chatInput || isProcessing) return;
            
            const message = chatInput.value.trim();
            
            if (message) {
                isProcessing = true; // Set processing flag
                
                // Save to sessionStorage
                saveToChatHistory(message, 'user');
                
                // Display in user chat
                addMessage(message, 'user');
                chatInput.value = '';
                
                // Auto-reply bot after 1 second
                setTimeout(() => {
                    const responses = [
                        "Thank you for your message! Our team will reply as soon as possible.",
                        "Your question has been recorded. Please wait for a reply from our CS.",
                        "For product information, please check the product details page!",
                        "Discounts are ongoing up to 60% for selected products!",
                        "Shipping usually takes 2-5 business days for Jabodetabek area.",
                        "Is there anything else I can help you with?"
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    
                    // Save bot reply to sessionStorage
                    saveToChatHistory(randomResponse, 'bot');
                    addMessage(randomResponse, 'bot');
                    
                    // If chat is closed, add badge
                    if (!isChatOpen) {
                        unreadMessages++;
                        updateBadge();
                    }
                    
                    isProcessing = false; // Reset flag
                }, 1000);
            }
        }
        
        function sendQuickReply(question) {
            if (isProcessing) return;
            
            isProcessing = true;
            
            // Save to sessionStorage
            saveToChatHistory(question, 'user');
            addMessage(question, 'user');
            
            setTimeout(() => {
                let response;
                
                if (question.includes('discount')) {
                    response = "Yes! Currently there are discounts up to 60% for seasonal collections. Check the product page for details!";
                } else if (question.includes('shipping')) {
                    response = "Shipping takes 2-5 business days for Jabodetabek and 3-7 days for other cities. Free shipping for purchases above Rp 300,000!";
                } else if (question.includes('payment')) {
                    response = "We accept: Bank Transfer (BCA, Mandiri, BNI), E-Wallet (OVO, Gopay, Dana), and COD (Cash on Delivery).";
                } else {
                    response = "Thank you! Our CS team will contact you shortly.";
                }
                
                // Save bot reply to sessionStorage
                saveToChatHistory(response, 'bot');
                addMessage(response, 'bot');
                
                if (!isChatOpen) {
                    unreadMessages++;
                    updateBadge();
                }
                
                isProcessing = false;
            }, 800);
        }
        
        function addMessage(text, sender) {
            if (!chatMessages) return;
            
            // Check if same message already exists (to prevent duplication)
            const existingMessages = chatMessages.querySelectorAll('.message-text');
            for (let msg of existingMessages) {
                if (msg.textContent === text) {
                    // Message already exists, skip
                    return;
                }
            }
            
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            
            const now = new Date();
            const time = now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            let senderName = sender === 'user' ? 'You' : 'BelanjaHub Bot';
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
            // Use sessionStorage
            const chatHistory = JSON.parse(sessionStorage.getItem('belanjahub_chat') || '[]');
            
            // Check if message already exists to prevent duplication
            const isDuplicate = chatHistory.some(item => 
                item.message === message && item.sender === sender
            );
            
            if (!isDuplicate) {
                chatHistory.push({
                    message: message,
                    sender: sender,
                    timestamp: new Date().toISOString()
                });
                
                // Save only last 50 messages
                if (chatHistory.length > 50) {
                    chatHistory.splice(0, chatHistory.length - 50);
                }
                
                sessionStorage.setItem('belanjahub_chat', JSON.stringify(chatHistory));
            }
        }
        
        function loadChatHistory() {
            if (!chatMessages) return;
            
            // Load from sessionStorage
            const chatHistory = JSON.parse(sessionStorage.getItem('belanjahub_chat') || '[]');
            
            // Remove default message if there is history
            if (chatHistory.length > 0) {
                chatMessages.innerHTML = '';
            }
            
            // Filter to remove duplicates before displaying
            const uniqueHistory = [];
            const seenMessages = new Set();
            
            chatHistory.forEach(item => {
                const messageKey = `${item.sender}-${item.message}`;
                if (!seenMessages.has(messageKey)) {
                    seenMessages.add(messageKey);
                    uniqueHistory.push(item);
                }
            });
            
            // Display unique messages
            uniqueHistory.forEach(item => {
                addMessage(item.message, item.sender);
            });
        }
    }
});