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
        main_menu: {
            text: "Hi there! I'm Selene, Ishika's virtual assistant. 🌙 How can I help you today?",
            options: [
                { id: "who", text: "Who is Ishika?", next: "main_menu" },
                { id: "skills", text: "What are her skills?", next: "main_menu" },
                { id: "projects", text: "What are her projects?", next: "projects_menu" },
                { id: "contact", text: "How to contact her?", next: "main_menu" }
            ]
        },
        projects_menu: {
            text: "She has built some amazing things! Which project would you like to know more about?",
            options: [
                { id: "diet", text: "Disease Diet Generator", next: "projects_menu" },
                { id: "interview", text: "Interview Buddy", next: "projects_menu" },
                { id: "devmentor", text: "Devmentor", next: "projects_menu" },
                { id: "staycoza", text: "StayCoza App", next: "projects_menu" },
                { id: "back", text: "⬅️ Go Back", next: "main_menu" }
            ]
        }
    };

    const responses = {
        who: "Ishika is a B.Tech Computer Science student at BML Munjal University, graduating in 2026. She's passionate about building intelligent, scalable solutions using AI and modern web frameworks!",
        skills: "She specializes in Python, Flutter, JavaScript, and HTML/CSS. Her real superpower is AI & Machine Learning, using tools like TensorFlow, CrewAI, and Gemini to build smart applications.",
        contact: "You can reach out to her via email at <a href='mailto:kochharishika@gmail.com' style='color:var(--accent-primary); text-decoration:underline;'>kochharishika@gmail.com</a>, or connect with her on LinkedIn <a href='https://linkedin.com/in/IshikaKochhar' target='_blank' style='color:var(--accent-primary); text-decoration:underline;'>(linkedin.com/in/IshikaKochhar)</a>.",
        diet: "The 'Disease Diet Generator' is an AI-powered web app built with CrewAI, Gemini, and RAG to generate personalized, disease-specific diet plans. <br><a href='https://github.com/Ishikakochhar/disease-diet-generator' target='_blank' style='color:var(--accent-primary); text-decoration:underline;'>View on GitHub ↗</a>",
        interview: "The 'Interview Buddy' is an automated pre-interview screening bot for recruiters, orchestrating 19 AI agents across 5 crews! It uses CrewAI and Python.",
        devmentor: "Devmentor is an interactive e-learning platform that helps students build coding and placement skills with daily challenges and mentorship. <br><a href='https://github.com/Ishikakochhar/Online-learning-platform' target='_blank' style='color:var(--accent-primary); text-decoration:underline;'>View on GitHub ↗</a>",
        staycoza: "StayCoza App is an Android travel booking app allowing users to search, compare, and book hotels and flights, built with Java and Firebase! <br><a href='https://github.com/Ishikakochhar/StayCoza-APP' target='_blank' style='color:var(--accent-primary); text-decoration:underline;'>View on GitHub ↗</a>",
        back: "Returning to main menu..."
    };

    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const chatMessages = document.getElementById('chatMessages');
    const chatOptions = document.getElementById('chatOptions');

    let chatInitialized = false;
    let currentNode = 'main_menu';

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
        addMessage(chatData.main_menu.text, 'bot');
        renderOptions(chatData.main_menu.options);
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.innerHTML = text;
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
        chatOptions.innerHTML = ''; 
        addMessage(option.text, 'user');

        setTimeout(() => {
            if (responses[option.id]) {
                addMessage(responses[option.id], 'bot');
            }
            
            setTimeout(() => {
                currentNode = option.next;
                if (option.id === 'projects') {
                    addMessage(chatData[currentNode].text, 'bot');
                }
                renderOptions(chatData[currentNode].options);
            }, 800);
        }, 600);
    }
});
