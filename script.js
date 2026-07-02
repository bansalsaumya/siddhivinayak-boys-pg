/*
   Siddhi Vinayak Boy's PG & Guest House
   Interactive Client-side Logic (script.js)
*/

// --- Smart Chatbot Knowledge Base ---
const pgKnowledge = {
    price: "Hamaare yahan Double Sharing ₹7,000, Triple ₹5,000 aur 4 Sharing ₹4,500 se shuru hai. Deposit ₹5,000 (Non-Refundable) hai.",
    rent: "Hamaare yahan Double Sharing ₹7,000, Triple ₹5,000 aur 4 Sharing ₹4,500 se shuru hai. Deposit ₹5,000 (Non-Refundable) hai.",
    food: "Hamaare yahan Maharaj roz taaza khana banate hain. Week mein ek din kuch naya (Special) banta hai aur ek din Kheer ya Sweet compulsory hoti hai. Baaki din alag-alag sabji-roti, aur kuch din sabji-roti ke saath dal-chawal bhi milta hai. 😋",
    location: "Hum Sohna Road par PNB Bank ke paas hain, opp. Hanuman Mandir. Bus Stand se sirf 2 min door! Map location ke liye neeche button par click karein.",
    owner: "Siddhi Vinayak PG ke owner Neeraj Swami ji hain. Unka number 7016316435 hai.",
    manager: "Hamaare PG manager Vikas ji hain. Aap unhe 9530245604 par call ya WhatsApp kar sakte hain.",
    rules: "Humere yahan entry/exit ki koi strict timing nahi hai, aap kabhi bhi aa-ja sakte hain. Khana waste na karein aur bacha hua khana dustbin mein hi dalein. Visitors ke liye guest charges apply hote hain.",
    wifi: "Haan ji, high-speed Wi-Fi ki suvidha har resident ke liye bilkul free hai.",
    cooler: "Garmi ki chinta mat kijiye, har room mein 'Big Air Coolers' lagaye gaye hain taaki aap aram se reh sakein.",
    security: "Poora PG CCTV surveillance mein hai aur safety ka poora dhyan rakha jata hai.",
    notice: "Agar aap PG chhodna chahte hain, toh 15-day ka notice dena zaroori hai. Deposit non-refundable hai.",
    capacity: "Humare yahan total 23 beds hain. Saath hi ye ek Guest House bhi hai, jahan per night ka charge alag se hota hai.",
    parking: "Haan ji, bike parking ke liye safe aur paryapt (enough) jagah available hai.",
    water: "Pene ke liye 24 ghante thanda aur saaf RO water available hai.",
    laundry: "Washing machine ki suvidha hai aur terrace par kapde sukhane ki achhi jagah hai.",
    cleaning: "Safai (Housekeeping) rozana hoti hai. Hum hygiene ka poora dhyan rakhte hain.",
    gender: "Siddhi Vinayak sirf Boys (Ladkon) ke liye PG aur Guest House hai.",
    docs: "Rehne ke liye aapko apna Aadhar Card ki photo aur ek passport size photo deni hogi.",
    general: "Siddhi Vinayak PG Sohna Road (Dharuhera) mein ek premium Boys PG hai. Yahan aapko thanda RO pani, Wi-Fi, coolers, rozana safai, aur Maharaj ke hath ka swadishth khana milta hai. Aap rent, location ya food ke baare mein puchiye, main sab bata dunga! 😊"
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

    function openLightbox(src, caption) {
        if (lightbox && lightboxImage && lightboxTitle) {
            lightboxImage.src = src;
            lightboxTitle.innerText = caption;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

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
                openLightbox(item.element.src, item.caption);
            });
        }
    });

    // Special fix for Banner Card container click
    const bannerCard = document.querySelector('.footer-banner-card');
    if (bannerCard) {
        bannerCard.addEventListener('click', () => {
            const img = document.getElementById('footer-banner-img');
            if (img) openLightbox(img.src, 'Siddhi Vinayak PG - Banner');
        });
    }

    // --- Video In-Place Logic ---
    const heroCard = document.getElementById('hero-card');
    const playBtn = document.getElementById('play-video-btn');
    const heroVideo = document.getElementById('hero-video');

    if (playBtn && heroCard && heroVideo) {
        playBtn.addEventListener('click', () => {
            heroCard.classList.add('video-playing');
            heroVideo.play().catch(err => {
                console.error("Video error:", err);
            });
        });

        // Optional: Click video to pause/play again
        heroVideo.addEventListener('click', () => {
            if (heroVideo.paused) heroVideo.play();
            else heroVideo.pause();
        });
    }

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

// --- Smart Chatbot Logic ---
function botResponse(type) {
    if (pgKnowledge[type]) addChatMessage(pgKnowledge[type], 'bot');
    else addChatMessage("Namaste! Bataiye main aapki kya madad kar sakta hoon?", 'bot');
}

function handleEnter(e) { if (e.key === 'Enter') handleUserInput(); }

function handleUserInput() {
    const input = document.getElementById('user-input');
    const text = input.value.trim().toLowerCase();
    if (!text) return;

    addChatMessage(input.value, 'user');
    input.value = "";

    let botMsg = "";

    if (text.includes("rent") || text.includes("price") || text.includes("pais") || text.includes("kitna") || text.includes("kiraya") || text.includes("kharch")) {
        botMsg = pgKnowledge.rent;
    } else if (text.includes("khana") || text.includes("food") || text.includes("menu") || text.includes("special") || text.includes("nashta") || text.includes("maharaj")) {
        botMsg = pgKnowledge.food;
    } else if (text.includes("owner") || text.includes("malik") || text.includes("neeraj") || text.includes("number")) {
        botMsg = pgKnowledge.owner;
    } else if (text.includes("manager") || text.includes("vikas")) {
        botMsg = pgKnowledge.manager;
    } else if (text.includes("pata") || text.includes("addres") || text.includes("location") || text.includes("rasta") || text.includes("map") || text.includes("kaha h")) {
        botMsg = pgKnowledge.location;
    } else if (text.includes("rules") || text.includes("niyam") || text.includes("timing") || text.includes("gate") || text.includes("policy")) {
        botMsg = pgKnowledge.rules;
    } else if (text.includes("wifi") || text.includes("internet") || text.includes("net") || text.includes("wi-fi")) {
        botMsg = pgKnowledge.wifi;
    } else if (text.includes("cooler") || text.includes("ac") || text.includes("garmi") || text.includes("hawa")) {
        botMsg = pgKnowledge.cooler;
    } else if (text.includes("parking") || text.includes("bike") || text.includes("gadi") || text.includes("cycle")) {
        botMsg = pgKnowledge.parking;
    } else if (text.includes("ro") || text.includes("water") || text.includes("paani") || text.includes("thanda") || text.includes("drinking")) {
        botMsg = pgKnowledge.water;
    } else if (text.includes("kapde") || text.includes("washing") || text.includes("laundry") || text.includes("dhone") || text.includes("dhobi")) {
        botMsg = pgKnowledge.laundry;
    } else if (text.includes("safai") || text.includes("cleaning") || text.includes("clean") || text.includes("housekeeping")) {
        botMsg = pgKnowledge.cleaning;
    } else if (text.includes("ladke") || text.includes("boys") || text.includes("girls") || text.includes("gender") || text.includes("ladies")) {
        botMsg = pgKnowledge.gender;
    } else if (text.includes("aadhar") || text.includes("id proof") || text.includes("documents") || text.includes("kagaz") || text.includes("photo")) {
        botMsg = pgKnowledge.docs;
    } else if (text.includes("beds") || text.includes("total") || text.includes("log") || text.includes("capacity") || text.includes("jagah")) {
        botMsg = pgKnowledge.capacity;
    } else if (text.includes("thank") || text.includes("shukriya") || text.includes("dhanyawad") || text.includes("ok") || text.includes("accha")) {
        botMsg = "Aapka swagat hai! 😊 Agar kuch aur puchna ho toh zaroor batayein.";
    } else if (text.includes("pg") || text.includes("batao") || text.includes("info") || text.includes("detail") || text.includes("about")) {
        botMsg = pgKnowledge.general;
    } else if (text.includes("hi") || text.includes("hello") || text.includes("namaste") || text.includes("hey")) {
        botMsg = "Namaste! 🙏 Main Kitchen Maharaj hoon. Rent, Khana, ya PG ki suvidhaon ke baare mein kuch bhi puchiye!";
    } else {
        botMsg = "Maafi chahta hoon, ye baat samajh nahi aayi. Aap Rent, Khana, Parking ya WiFi ke baare mein puch sakte hain. Detail mein baat karne ke liye Owner (7016316435) ko call karein.";
    }

    setTimeout(() => addChatMessage(botMsg, 'bot'), 600);
}

function addChatMessage(msg, sender) {
    const chatBody = document.getElementById('chat-body');
    if (!chatBody) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${sender}`;
    chatBody.appendChild(msgDiv);

    if (sender === 'bot') {
        let i = 0;
        msgDiv.innerHTML = "";
        const speed = 25;
        function type() {
            if (i < msg.length) {
                if (msg.charAt(i) === '<') {
                    let tag = "";
                    while (msg.charAt(i) !== '>') { tag += msg.charAt(i); i++; }
                    tag += '>'; msgDiv.innerHTML += tag; i++;
                } else { msgDiv.innerHTML += msg.charAt(i); i++; }
                chatBody.scrollTop = chatBody.scrollHeight;
                setTimeout(type, speed);
            }
        }
        type();
    } else {
        msgDiv.innerHTML = msg;
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

function inquireRoom(roomType) {
    const phoneNumber = "917016316435";
    const message = `Hi Neeraj! I am interested in booking a *${roomType}* room at Siddhi Vinayak Boy's PG in Dharuhera.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}
