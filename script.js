document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Stop observing once shown
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- Selene Chatbot Logic ---
    const chatData = {
        greeting: "Hi there! I'm Selene, Ishika's virtual assistant. How can I help you today?",
        options: [
            { id: "who", text: "Who is Ishika?" },
            { id: "skills", text: "What are her skills?" },
            { id: "latest", text: "Latest project?" },
            { id: "contact", text: "How to contact her?" }
        ],
        responses: {
            who: "Ishika is a B.Tech Computer Science student at BML Munjal University, graduating in 2026. She's passionate about building intelligent, scalable solutions using AI and modern web frameworks!",
            skills: "She specializes in Python, Flutter, JavaScript, and HTML/CSS. Her real superpower is AI & Machine Learning, using tools like TensorFlow, CrewAI, and Gemini to build smart applications.",
            latest: "Her latest major project is the 'Disease Diet Generator', an AI-powered web app that creates personalized diet plans using RAG and CrewAI! You can check it out in her Projects section.",
            contact: "You can reach out to her via email at kochharishika@gmail.com, or connect with her on LinkedIn (linkedin.com/in/IshikaKochhar)."
        }
    };

    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const chatMessages = document.getElementById('chatMessages');
    const chatOptions = document.getElementById('chatOptions');

    let chatInitialized = false;

    if (chatToggle && chatWindow) {
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.remove('hidden-chat');
            chatToggle.style.transform = 'scale(0)';
            if (!chatInitialized) {
                initChat();
                chatInitialized = true;
            }
        });

        closeChat.addEventListener('click', () => {
            chatWindow.classList.add('hidden-chat');
            chatToggle.style.transform = 'scale(1)';
        });
    }

    function initChat() {
        addMessage(chatData.greeting, 'bot');
        renderOptions(chatData.options);
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function renderOptions(options) {
        chatOptions.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.classList.add('chat-option-btn');
            btn.textContent = opt.text;
            btn.addEventListener('click', () => handleOptionClick(opt));
            chatOptions.appendChild(btn);
        });
    }

    function handleOptionClick(option) {
        chatOptions.innerHTML = ''; // Hide options while typing
        addMessage(option.text, 'user');

        // Simulate typing delay
        setTimeout(() => {
            addMessage(chatData.responses[option.id], 'bot');
            
            setTimeout(() => {
                renderOptions(chatData.options);
            }, 800);
        }, 600);
    }
});
