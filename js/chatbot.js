// EcoPure Cleaning Services - Chatbot JavaScript
// FAQ Chatbot functionality with keyword-based responses

document.addEventListener('DOMContentLoaded', function() {
    // Chatbot elements
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const quickButtons = document.querySelectorAll('.quick-button');
    
    // Chatbot state
    let isOpen = false;
    let isTyping = false;
    
    // Predefined responses based on keywords
    const responses = {
        // Services related
        'services': {
            keywords: ['services', 'service', 'cleaning', 'what do you offer', 'what services'],
            response: '🌱 We offer comprehensive eco-friendly cleaning services including:\n\n• Residential Cleaning (homes, apartments)\n• Commercial Cleaning (offices, retail)\n• Deep Cleaning & Sanitization\n• Move-In/Move-Out Cleaning\n• Post-Construction Cleaning\n• Green Disinfection Services\n• Event Cleanup\n• Allergy-Safe Cleaning\n\nWould you like more details about any specific service?'
        },
        
        // Safety related
        'safe': {
            keywords: ['safe', 'safety', 'toxic', 'chemicals', 'pets', 'children', 'baby', 'allergy'],
            response: '🛡️ Yes, our products are completely safe! Here\'s why:\n\n✅ 100% non-toxic and plant-based\n✅ Safe for children and pets\n✅ No harsh chemicals or fumes\n✅ Hypoallergenic and fragrance-free options\n✅ EPA Safer Choice certified\n✅ Never tested on animals\n\nOur eco-friendly products create a healthier indoor environment while delivering professional cleaning results.'
        },
        
        // Booking related
        'booking': {
            keywords: ['booking', 'book', 'schedule', 'appointment', 'how to book', 'reserve'],
            response: '📅 Booking is easy! Here are your options:\n\n1️⃣ **Online**: Fill out our booking form on the website\n2️⃣ **Phone**: Call us at (555) 123-4567\n3️⃣ **Email**: Send your request to info@ecopurecleaning.com\n\nWe\'ll discuss your needs, provide a quote, and schedule a convenient time. The process takes less than 10 minutes!\n\nWould you like me to direct you to the booking page?'
        },
        
        // Pricing related
        'pricing': {
            keywords: ['price', 'pricing', 'cost', 'how much', 'rates', 'fees', 'expensive'],
            response: '💰 Our pricing is transparent and competitive:\n\n**Residential Services:**\n• Basic Clean: $149+\n• Standard Clean: $249+\n• Deep Clean: $399+\n\n**Commercial Services:**\n• Small Office: $299+\n• Medium Office: $499+\n• Large Facility: Custom quote\n\nPrices vary based on size, condition, and frequency. Regular clients enjoy discounts! For a precise quote, we\'ll need to know your specific requirements.\n\nWould you like a custom quote?'
        },
        
        // Products related
        'products': {
            keywords: ['products', 'cleaners', 'supplies', 'ingredients', 'what do you use'],
            response: '🌿 We use premium eco-friendly products:\n\n**Categories:**\n• All-Purpose Eco Cleaners\n• Bathroom & Kitchen Cleaners\n• Floor & Surface Cleaners\n• Chemical-Free Disinfectants\n\n**Key Ingredients:**\n• Plant-derived surfactants\n• Natural citric acids\n• Essential oils (citrus, tea tree)\n• Plant-based enzymes\n• Mineral-based cleaners\n\nAll products are EPA Safer Choice certified, biodegradable, and completely safe for your family and pets.'
        },
        
        // Contact related
        'contact': {
            keywords: ['contact', 'call', 'phone', 'email', 'address', 'location', 'hours'],
            response: '📞 Here\'s how to reach us:\n\n**Phone:** (555) 123-4567\n**Email:** info@ecopurecleaning.com\n**Hours:** Mon-Fri: 8AM-6PM, Sat: 9AM-4PM\n**Service Area:** California Bay Area\n\n**Emergency Service:** Available 24/7 for urgent cleaning needs\n\nWe respond to all inquiries within 24 hours. For immediate assistance, please call us directly!'
        },
        
        // Areas served
        'areas': {
            keywords: ['areas', 'location', 'serve', 'bay area', 'san francisco', 'oakland'],
            response: '🗺️ We serve the entire California Bay Area:\n\n**Major Areas:**\n• San Francisco (all neighborhoods)\n• East Bay (Oakland, Berkeley, Alameda)\n• Peninsula (San Mateo, Palo Alto)\n• South Bay (San Jose, Santa Clara)\n• Marin County (San Rafael, Novato)\n• North Bay (Napa, Sonoma)\n\nDon\'t see your area listed? Contact us - we\'re always expanding our service area!'
        },
        
        // Effectiveness
        'effective': {
            keywords: ['effective', 'work', 'results', 'good', 'clean', 'powerful'],
            response: '✨ Absolutely! Our eco-cleaning is highly effective:\n\n• Professional-grade results\n• Eliminates 99.9% of germs and bacteria\n• Removes tough stains and grime\n• Improves indoor air quality\n• Reduces allergens significantly\n\nOur plant-based products use natural enzymes and surfactants that are scientifically proven to match or exceed traditional cleaning power - without the toxic side effects!'
        },
        
        // Experience/About
        'experience': {
            keywords: ['experience', 'how long', 'years', 'about', 'company', 'history'],
            response: '🏆 We\'ve been providing eco-friendly cleaning since 2016:\n\n• 8+ years of green cleaning expertise\n• 50,000+ eco-cleanings completed\n• 98% customer satisfaction rate\n• EPA Safer Choice certified\n• Fully insured and bonded\n• Trained eco-cleaning specialists\n\nOur team combines extensive experience with continuous training in the latest green cleaning techniques.'
        }
    };
    
    // Toggle chatbot window
    function toggleChatbot() {
        isOpen = !isOpen;
        
        if (isOpen) {
            chatbotWindow.classList.add('active');
            chatbotToggle.style.display = 'none';
            chatbotInput.focus();
            
            // Add welcome message if first time opening
            if (chatbotMessages.children.length === 1) {
                setTimeout(() => {
                    addBotMessage('🌱 Welcome! I\'m your EcoPure assistant. How can I help you with our eco-friendly cleaning services today?');
                }, 500);
            }
        } else {
            chatbotWindow.classList.remove('active');
            chatbotToggle.style.display = 'block';
        }
    }
    
    // Close chatbot
    function closeChatbot() {
        isOpen = false;
        chatbotWindow.classList.remove('active');
        chatbotToggle.style.display = 'block';
    }
    
    // Add bot message
    function addBotMessage(message) {
        if (isTyping) return;
        
        isTyping = true;
        
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message bot typing';
        typingIndicator.innerHTML = '<div class="message-bubble">🌱 Typing...</div>';
        chatbotMessages.appendChild(typingIndicator);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Simulate typing delay
        setTimeout(() => {
            // Remove typing indicator
            typingIndicator.remove();
            
            // Add actual message
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message bot';
            
            const bubble = document.createElement('div');
            bubble.className = 'message-bubble';
            bubble.innerHTML = message.replace(/\n/g, '<br>');
            
            messageDiv.appendChild(bubble);
            chatbotMessages.appendChild(messageDiv);
            
            // Scroll to bottom
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            
            isTyping = false;
        }, 1000 + Math.random() * 1000);
    }
    
    // Add user message
    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.textContent = message;
        
        messageDiv.appendChild(bubble);
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Process user input and generate response
    function processUserInput(input) {
        const lowerInput = input.toLowerCase();
        
        // Check for keyword matches
        for (const [key, response] of Object.entries(responses)) {
            for (const keyword of response.keywords) {
                if (lowerInput.includes(keyword)) {
                    return response.response;
                }
            }
        }
        
        // Check for specific patterns
        if (lowerInput.includes('thank') || lowerInput.includes('thanks')) {
            return '😊 You\'re welcome! Is there anything else I can help you with regarding our eco-friendly cleaning services?';
        }
        
        if (lowerInput.includes('bye') || lowerInput.includes('goodbye')) {
            return '👋 Thank you for chatting with EcoPure! Feel free to contact us anytime at (555) 123-4567 or info@ecopurecleaning.com. Have a wonderful day!';
        }
        
        if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
            return '🌱 Hello! Welcome to EcoPure Cleaning Services! How can I assist you with our eco-friendly cleaning solutions today?';
        }
        
        // Default response
        return '🌱 I\'m here to help with questions about our eco-friendly cleaning services! You can ask me about:\n\n• Our cleaning services\n• Product safety\n• Booking appointments\n• Pricing information\n• Service areas\n• Product details\n\nOr choose one of the quick questions below. What would you like to know?';
    }
    
    // Handle user message submission
    function handleUserMessage() {
        const message = chatbotInput.value.trim();
        
        if (!message || isTyping) return;
        
        // Add user message
        addUserMessage(message);
        
        // Clear input
        chatbotInput.value = '';
        
        // Generate and add bot response
        setTimeout(() => {
            const response = processUserInput(message);
            addBotMessage(response);
        }, 500);
    }
    
    // Handle quick button clicks
    function handleQuickButton(question) {
        if (isTyping) return;
        
        // Add user message based on button
        let userMessage = '';
        
        switch(question) {
            case 'services':
                userMessage = 'What services do you offer?';
                break;
            case 'safe':
                userMessage = 'Are your products safe?';
                break;
            case 'booking':
                userMessage = 'How do I book a service?';
                break;
            case 'pricing':
                userMessage = 'What are your prices?';
                break;
            default:
                userMessage = question;
        }
        
        addUserMessage(userMessage);
        
        // Generate response
        setTimeout(() => {
            const response = processUserInput(userMessage);
            addBotMessage(response);
        }, 500);
    }
    
    // Event listeners
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', toggleChatbot);
    }
    
    if (chatbotClose) {
        chatbotClose.addEventListener('click', closeChatbot);
    }
    
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleUserMessage();
            }
        });
    }
    
    // Quick button event listeners
    quickButtons.forEach(button => {
        button.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            handleQuickButton(question);
        });
    });
    
    // Close chatbot when clicking outside
    document.addEventListener('click', function(e) {
        if (isOpen && 
            !chatbotWindow.contains(e.target) && 
            !chatbotToggle.contains(e.target)) {
            closeChatbot();
        }
    });
    
    // Add chatbot-specific CSS
    const chatbotStyles = document.createElement('style');
    chatbotStyles.textContent = `
        .typing .message-bubble {
            background: var(--light-gray);
            color: var(--dark-gray);
            font-style: italic;
        }
        
        .message-bubble {
            word-wrap: break-word;
            line-height: 1.4;
        }
        
        .message-bubble br {
            margin-bottom: 0.5rem;
            display: block;
        }
        
        @media (max-width: 768px) {
            .chatbot-window {
                width: 300px;
                height: 400px;
                right: -20px;
                bottom: 80px;
            }
        }
        
        /* Add emoji animation */
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            60% {
                transform: translateY(-5px);
            }
        }
        
        .message-bubble {
            animation: fadeIn 0.3s ease;
        }
        
        /* Enhanced scrollbar for chat messages */
        .chatbot-messages::-webkit-scrollbar {
            width: 6px;
        }
        
        .chatbot-messages::-webkit-scrollbar-track {
            background: var(--light-gray);
            border-radius: 3px;
        }
        
        .chatbot-messages::-webkit-scrollbar-thumb {
            background: var(--primary-green);
            border-radius: 3px;
        }
        
        .chatbot-messages::-webkit-scrollbar-thumb:hover {
            background: var(--dark-green);
        }
    `;
    document.head.appendChild(chatbotStyles);
    
    // Auto-open chatbot after delay (optional - remove if not wanted)
    // setTimeout(() => {
    //     if (!isOpen) {
    //         toggleChatbot();
    //         setTimeout(() => {
    //             addBotMessage('🌱 Hi! Welcome to EcoPure Cleaning Services! I\'m here to answer any questions about our eco-friendly cleaning services. How can I help you today?');
    //         }, 1000);
    //     }
    // }, 30000); // Auto-open after 30 seconds
});

// Chatbot utility functions
window.EcoPureChatbot = {
    // Open chatbot programmatically
    open: function() {
        const chatbotToggle = document.getElementById('chatbotToggle');
        if (chatbotToggle) {
            chatbotToggle.click();
        }
    },
    
    // Close chatbot programmatically
    close: function() {
        const chatbotClose = document.getElementById('chatbotClose');
        if (chatbotClose) {
            chatbotClose.click();
        }
    },
    
    // Send message programmatically
    sendMessage: function(message) {
        const chatbotInput = document.getElementById('chatbotInput');
        if (chatbotInput) {
            chatbotInput.value = message;
            chatbotInput.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
        }
    },
    
    // Add custom response
    addResponse: function(keywords, response) {
        // This would need to be integrated with the main responses object
        console.log('Custom response added:', keywords, response);
    }
};
