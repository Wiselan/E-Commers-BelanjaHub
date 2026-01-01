// chat.js
document.addEventListener('DOMContentLoaded', function() {
    // Cek apakah user sudah login
    function isUserLoggedIn() {
        // Cek dari localStorage atau sessionStorage
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || 
                          sessionStorage.getItem('isLoggedIn') === 'true';
        
        // Cek juga jika ada user data
        const userData = JSON.parse(localStorage.getItem('userData') || sessionStorage.getItem('userData') || '{}');
        
        return isLoggedIn || (userData && userData.isLoggedIn);
    }
    
    // Cek jika di halaman login/signup
    function isAuthPage() {
        const currentPath = window.location.pathname;
        return currentPath.includes('login.html') || currentPath.includes('signup.html');
    }
    
    // Jika user belum login atau di halaman auth, sembunyikan chat
    if (!isUserLoggedIn() || isAuthPage()) {
        return;
    }
    
    // Inisialisasi Live Chat
    initializeLiveChat();
    
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
        
        let isChatOpen = false;
        let unreadMessages = 0;
        
        // Tampilkan widget chat
        chatWidget.style.display = 'block';
        
        // Event Listeners
        chatToggle.addEventListener('click', toggleChat);
        chatClose.addEventListener('click', closeChat);
        sendButton.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });
        
        // Quick replies
        quickReplies.forEach(button => {
            button.addEventListener('click', function() {
                const question = this.getAttribute('data-question');
                sendQuickReply(question);
            });
        });
        
        // Close chat jika klik di luar
        document.addEventListener('click', function(e) {
            if (isChatOpen && 
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
            chatContainer.classList.add('active');
            chatToggle.style.transform = 'rotate(360deg)';
            chatInput.focus();
            
            // Reset badge
            unreadMessages = 0;
            updateBadge();
        }
        
        function closeChat() {
            isChatOpen = false;
            chatContainer.classList.remove('active');
            chatToggle.style.transform = 'rotate(0deg)';
        }
        
        function sendMessage() {
            const message = chatInput.value.trim();
            
            if (message) {
                addMessage(message, 'user');
                chatInput.value = '';
                saveToHistory(message, 'user');
                
                // Auto-reply bot
                setTimeout(() => {
                    const responses = [
                        "Terima kasih pesannya! Tim kami akan membalas secepatnya.",
                        "Pertanyaan Anda telah tercatat. Mohon tunggu balasan dari CS kami.",
                        "Untuk informasi produk, silakan cek halaman detail produk ya!",
                        "Diskon sedang berlangsung hingga 60% untuk produk pilihan!",
                        "Pengiriman biasanya 2-5 hari kerja untuk Jabodetabek."
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    addMessage(randomResponse, 'bot');
                    saveToHistory(randomResponse, 'bot');
                    
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
            saveToHistory(question, 'user');
            
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
                saveToHistory(response, 'bot');
                
                if (!isChatOpen) {
                    unreadMessages++;
                    updateBadge();
                }
            }, 800);
        }
        
        function addMessage(text, sender) {
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
            if (unreadMessages > 0) {
                chatBadge.textContent = unreadMessages;
                chatBadge.style.display = 'flex';
            } else {
                chatBadge.style.display = 'none';
            }
        }
        
        function saveToHistory(message, sender) {
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
});