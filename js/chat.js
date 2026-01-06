// chat.js - Fix Double Message Issue
document.addEventListener('DOMContentLoaded', function() {
    // Cek apakah user sudah login
    function isUserLoggedIn() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || 
                          sessionStorage.getItem('isLoggedIn') === 'true';
        
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
    
    // Cek apakah chat sudah diinisialisasi
    if (window.chatInitialized) {
        console.log('Chat sudah diinisialisasi sebelumnya');
        return;
    }
    
    // Inisialisasi Live Chat
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
        let isProcessing = false; // Flag untuk cek jika sedang memproses pesan
        
        // Tampilkan widget chat
        chatWidget.style.display = 'block';
        
        // Hapus semua event listener sebelumnya (jika ada)
        const newToggle = chatToggle.cloneNode(true);
        chatToggle.parentNode.replaceChild(newToggle, chatToggle);
        
        if (sendButton) {
            const newSendButton = sendButton.cloneNode(true);
            sendButton.parentNode.replaceChild(newSendButton, sendButton);
        }
        
        // Event Listeners - hanya satu kali
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
        
        // Quick replies - Hapus event listener lama dulu
        quickReplies.forEach(button => {
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                const question = this.getAttribute('data-question');
                if (question) sendQuickReply(question);
            });
        });
        
        // Close chat jika klik di luar
        document.addEventListener('click', function(e) {
            if (isChatOpen && chatContainer && 
                !chatContainer.contains(e.target) && 
                !newToggle.contains(e.target)) {
                closeChat();
            }
        });
        
        // Load chat history dari sessionStorage
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
                isProcessing = true; // Set flag sedang memproses
                
                // Simpan ke sessionStorage
                saveToChatHistory(message, 'user');
                
                // Tampilkan di chat user
                addMessage(message, 'user');
                chatInput.value = '';
                
                // Auto-reply bot setelah 1 detik
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
                    
                    // Simpan balasan bot ke sessionStorage
                    saveToChatHistory(randomResponse, 'bot');
                    addMessage(randomResponse, 'bot');
                    
                    // Jika chat tertutup, tambah badge
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
            
            // Simpan ke sessionStorage
            saveToChatHistory(question, 'user');
            addMessage(question, 'user');
            
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
                
                // Simpan balasan bot ke sessionStorage
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
            
            // Cek apakah pesan sama sudah ada (untuk mencegah duplikasi)
            const existingMessages = chatMessages.querySelectorAll('.message-text');
            for (let msg of existingMessages) {
                if (msg.textContent === text) {
                    // Pesan sudah ada, skip
                    return;
                }
            }
            
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
            // Gunakan sessionStorage
            const chatHistory = JSON.parse(sessionStorage.getItem('belanjahub_chat') || '[]');
            
            // Cek apakah pesan sudah ada untuk mencegah duplikasi
            const isDuplicate = chatHistory.some(item => 
                item.message === message && item.sender === sender
            );
            
            if (!isDuplicate) {
                chatHistory.push({
                    message: message,
                    sender: sender,
                    timestamp: new Date().toISOString()
                });
                
                // Simpan maks 50 pesan terakhir
                if (chatHistory.length > 50) {
                    chatHistory.splice(0, chatHistory.length - 50);
                }
                
                sessionStorage.setItem('belanjahub_chat', JSON.stringify(chatHistory));
            }
        }
        
        function loadChatHistory() {
            if (!chatMessages) return;
            
            // Load dari sessionStorage
            const chatHistory = JSON.parse(sessionStorage.getItem('belanjahub_chat') || '[]');
            
            // Hapus pesan default jika ada history
            if (chatHistory.length > 0) {
                chatMessages.innerHTML = '';
            }
            
            // Filter untuk menghapus duplikat sebelum menampilkan
            const uniqueHistory = [];
            const seenMessages = new Set();
            
            chatHistory.forEach(item => {
                const messageKey = `${item.sender}-${item.message}`;
                if (!seenMessages.has(messageKey)) {
                    seenMessages.add(messageKey);
                    uniqueHistory.push(item);
                }
            });
            
            // Tampilkan pesan unik
            uniqueHistory.forEach(item => {
                addMessage(item.message, item.sender);
            });
        }
    }
});