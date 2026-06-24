/*
   Siddhi Vinayak Boy's PG & Guest House
   Interactive Client-side Logic (script.js)
*/

// --- Smart Chatbot Knowledge Base ---
const pgKnowledge = {
    price: "Hamaare yahan Double Sharing ₹6,000, Triple ₹5,000 aur 4 Sharing ₹4,500 se shuru hai. Deposit ₹5,000 (Non-Refundable) hai.",
    rent: "Hamaare yahan Double Sharing ₹6,000, Triple ₹5,000 aur 4 Sharing ₹4,500 se shuru hai. Deposit ₹5,000 (Non-Refundable) hai.",
    food: "Maharaj taaza Lunch aur Dinner dete hain. Ghar jaisa swadisht khana Dal, Sabzi, Roti rehta hai.",
    location: "Hum Sohna Road par PNB Bank ke paas hain, opp. Hanuman Mandir. Bus Stand se sirf 2 min door!",
    owner: "Siddhi Vinayak PG ke owner Neeraj Swami ji hain (7016316435).",
    manager: "Hamaare PG manager Vikas ji hain. Aap unhe 9530245604 par sampark kar sakte hain.",
    rules: "Humere yahan entry/exit ki koi strict timing nahi hai, aap kabhi bhi aa-ja sakte hain. Khana waste na karein aur bacha hua khana dustbin mein hi dalein. Visitors ke liye guest charges apply hote hain.",
    wifi: "Haan ji, high-speed Wi-Fi ki suvidha har resident ke liye free hai.",
    cooler: "Garmi ke liye har room mein Big Air Coolers lagaye gaye hain.",
    security: "24/7 CCTV surveillance aur guard security available hai.",
    notice: "PG chhodne ke liye 15-day ka notice period dena zaroori hai."
};

document.addEventListener('DOMContentLoaded', () => {
    // --- Sticky Header & Scroll Highlight ---
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const mobileToggle = document.getElementById('mobile-toggle');
    const backToTopBtn = document.getElementById('scroll-to-top');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section, footer');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');

        if (window.scrollY > 400) backToTopBtn.classList.add('visible');
        else backToTopBtn.classList.remove('visible');

        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) link.classList.add('active');
            });
        }
    });

    // --- Mobile Menu Toggle ---
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            icon.className = navMenu.classList.contains('active') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }

    // --- Lightbox Modal ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxClose = document.getElementById('lightbox-close');

    const zoomableImages = [
        { element: document.getElementById('nav-logo'), caption: 'Siddhi Vinayak PG - Official Logo' },
        { element: document.getElementById('about-logo'), caption: 'Siddhi Vinayak PG - Ganesha Logo' },
        { element: document.getElementById('hero-img'), caption: 'Siddhi Vinayak PG - Main Building' },
        { element: document.getElementById('terrace-img'), caption: 'Siddhi Vinayak PG - Rooftop' },
        { element: document.getElementById('footer-banner-img'), caption: 'Siddhi Vinayak PG - Banner' }
    ];

    document.querySelectorAll('.room-card img, .facility-img-preview img').forEach(img => {
        zoomableImages.push({ element: img, caption: 'Siddhi Vinayak PG View' });
    });

    zoomableImages.forEach(item => {
        if (item.element) {
            item.element.addEventListener('click', () => {
                lightboxImage.src = item.element.src;
                lightboxTitle.innerText = item.caption;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });

    if (lightboxClose) {
        const closeModal = () => { lightbox.classList.remove('active'); document.body.style.overflow = 'auto'; };
        lightboxClose.addEventListener('click', closeModal);
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeModal(); });
    }

    // --- Chatbot Toggle ---
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');

    if (chatToggle && chatWindow && closeChat) {
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
            const badge = chatToggle.querySelector('.chat-badge');
            if (badge) badge.style.display = 'none';
        });
        closeChat.addEventListener('click', () => chatWindow.classList.remove('active'));
    }
});

// --- Chatbot Functions ---
function botResponse(type) {
    if (pgKnowledge[type]) {
        addChatMessage(pgKnowledge[type], 'bot');
    } else {
        addChatMessage("Ji, is baare mein main check karke batata hoon. Aap Owner ko call kar sakte hain.", 'bot');
    }
}

function handleEnter(e) {
    if (e.key === 'Enter') handleUserInput();
}

function handleUserInput() {
    const input = document.getElementById('user-input');
    const text = input.value.trim().toLowerCase();
    if (!text) return;

    addChatMessage(input.value, 'user');
    input.value = "";

    let botMsg = "";

    // Keyword matching logic
    if (text.includes("rent") || text.includes("price") || text.includes("pais") || text.includes("kitna") || text.includes("kiraya")) {
        botMsg = pgKnowledge.rent;
    } else if (text.includes("khana") || text.includes("food") || text.includes("dinner") || text.includes("lunch") || text.includes("meal")) {
        botMsg = pgKnowledge.food;
    } else if (text.includes("owner") || text.includes("malik") || text.includes("neeraj")) {
        botMsg = pgKnowledge.owner;
    } else if (text.includes("manager") || text.includes("vikas")) {
        botMsg = pgKnowledge.manager;
    } else if (text.includes("pata") || text.includes("addres") || text.includes("location") || text.includes("kahan") || text.includes("rasta") || text.includes("map")) {
        botMsg = pgKnowledge.location;
    } else if (text.includes("rules") || text.includes("niyam") || text.includes("timing") || text.includes("gate")) {
        botMsg = pgKnowledge.rules;
    } else if (text.includes("wifi") || text.includes("net") || text.includes("internet")) {
        botMsg = pgKnowledge.wifi;
    } else if (text.includes("cooler") || text.includes("ac") || text.includes("garmi")) {
        botMsg = pgKnowledge.cooler;
    } else if (text.includes("security") || text.includes("safe") || text.includes("cctv")) {
        botMsg = pgKnowledge.security;
    } else if (text.includes("hi") || text.includes("hello") || text.includes("namaste") || text.includes("hey")) {
        botMsg = "Namaste! 🙏 Main Kitchen Maharaj hoon. Rent, Khana, ya Location ke baare mein kuch bhi puchiye!";
    } else {
        botMsg = "Maafi chahta hoon, ye baat samajh nahi aayi. Aap Rent, Khana, ya Rules ke baare mein puch sakte hain.";
    }

    setTimeout(() => addChatMessage(botMsg, 'bot'), 600);
}

function addChatMessage(msg, sender) {
    const chatBody = document.getElementById('chat-body');
    if (!chatBody) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${sender}`;
    msgDiv.innerHTML = msg;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

function inquireRoom(roomType) {
    const phoneNumber = "917016316435";
    const message = `Hi Neeraj! I am interested in booking a *${roomType}* room at Siddhi Vinayak Boy's PG in Dharuhera.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}
