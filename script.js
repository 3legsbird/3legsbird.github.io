
// Constants
const API_KEY = ""; // This will be handled by Vite injection if we keep Vite, or we'll use a placeholder
const SYSTEM_INSTRUCTION = `
You are "Birdie", the AI assistant for the portfolio of "3legsbird", a Senior Frontend Engineer.
3legsbird is known for:
- Expert level Web Development (HTML, CSS, JavaScript).
- Creating beautiful, geometric, and interactive web experiences.
- Expertise in AI integration.
- A whimsical, artistic approach to code.

Your tone should be witty, professional but slightly playful, and helpful.
Keep responses concise (under 100 words) unless asked for details.
If asked about contact info, refer them to the Contact section at the bottom of the page.
`;

// State
let isChatOpen = false;
let messages = [
    {
        role: "model",
        text: "Hi! I'm Birdie, 3legsbird's AI assistant. Ask me anything about the developer's skills or experience!",
        timestamp: new Date()
    }
];
let chatHistory = [];

// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const chatToggleBtn = document.getElementById('chat-toggle-btn');
const chatWindow = document.getElementById('chat-window');
const closeChatBtn = document.getElementById('close-chat-btn');
const chatMessagesContainer = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendChatBtn = document.getElementById('send-chat-btn');
const contactForm = document.getElementById('contact-form');

// --- Navbar Logic ---
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-bird-dark/90', 'backdrop-blur-md', 'border-b', 'border-slate-800', 'py-3');
        navbar.classList.remove('bg-transparent', 'py-5');
    } else {
        navbar.classList.add('bg-transparent', 'py-5');
        navbar.classList.remove('bg-bird-dark/90', 'backdrop-blur-md', 'border-b', 'border-slate-800', 'py-3');
    }
});

mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu on link click
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// --- AI Chat Logic ---
function toggleChat() {
    isChatOpen = !isChatOpen;
    chatWindow.classList.toggle('hidden');
    if (isChatOpen) {
        renderMessages();
        scrollToBottom();
    }
}

chatToggleBtn?.addEventListener('click', toggleChat);
closeChatBtn?.addEventListener('click', toggleChat);

function renderMessages() {
    chatMessagesContainer.innerHTML = '';
    messages.forEach((msg, idx) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`;
        
        const avatarColor = msg.role === 'user' ? 'bg-slate-700' : 'bg-green-500/20';
        const textColor = msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700';
        
        messageDiv.innerHTML = `
            <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${avatarColor}">
                ${msg.role === 'user' ? '👤' : '🤖'}
            </div>
            <div class="max-w-[75%] p-3 rounded-2xl text-sm ${textColor}">
                ${msg.text}
            </div>
        `;
        chatMessagesContainer.appendChild(messageDiv);
    });
}

function scrollToBottom() {
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
}

async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Add user message
    const userMsg = { role: 'user', text, timestamp: new Date() };
    messages.push(userMsg);
    chatInput.value = '';
    renderMessages();
    scrollToBottom();

    // Show loading
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'flex gap-2';
    loadingDiv.id = 'chat-loading';
    loadingDiv.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">🤖</div>
        <div class="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700">
            <div class="flex gap-1">
                <span class="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                <span class="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                <span class="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
            </div>
        </div>
    `;
    chatMessagesContainer.appendChild(loadingDiv);
    scrollToBottom();

    try {
        // Use global API_KEY injected by system
        const key = window.GEMINI_API_KEY || "";
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    { role: "user", parts: [{ text: SYSTEM_INSTRUCTION }] },
                    ...chatHistory,
                    { role: "user", parts: [{ text }] }
                ]
            })
        });

        const data = await response.json();
        const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to answer that right now.";
        
        chatHistory.push({ role: "user", parts: [{ text }] });
        chatHistory.push({ role: "model", parts: [{ text: aiText }] });

        // Update messages
        const aiMsg = { role: 'model', text: aiText, timestamp: new Date() };
        messages.push(aiMsg);
    } catch (error) {
        console.error("AI Error:", error);
        messages.push({ role: 'model', text: "Sorry, I lost my connection. Please try again!", timestamp: new Date() });
    } finally {
        document.getElementById('chat-loading')?.remove();
        renderMessages();
        scrollToBottom();
    }
}

sendChatBtn?.addEventListener('click', sendMessage);
chatInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// --- Contact Form Logic ---
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent! (Simulation)');
    contactForm.reset();
});

// Lucide replacement check (manual because we use CDN)
// We'll rely on the icons being rendered as SVGs or using a simple version.
