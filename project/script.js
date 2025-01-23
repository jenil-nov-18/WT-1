 // Theme Toggle Functionality
 const themeToggle = document.getElementById('themeToggle');
 const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
 
 // Set initial theme based on system preference
 if (prefersDarkScheme.matches) {
     document.body.setAttribute('data-theme', 'dark');
     themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
 }

 themeToggle.addEventListener('click', () => {
     const currentTheme = document.body.getAttribute('data-theme');
     if (currentTheme === 'dark') {
         document.body.removeAttribute('data-theme');
         themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
     } else {
         document.body.setAttribute('data-theme', 'dark');
         themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
     }
 });

 // Intersection Observer for scroll animations
 const observerOptions = {
     threshold: 0.1,
     rootMargin: '50px'
 };

 const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.classList.add('animate-fadeUp');
         }
     });
 }, observerOptions);

 document.querySelectorAll('.feature-card, .stat-item').forEach(el => {
     observer.observe(el);
 });

 // Smooth Scrolling
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function (e) {
         e.preventDefault();
         document.querySelector(this.getAttribute('href')).scrollIntoView({
             behavior: 'smooth'
         });
     });
 });

 // Navbar Scroll Effect
 let lastScroll = 0;
 window.addEventListener('scroll', () => {
     const nav = document.querySelector('nav');
     const currentScroll = window.pageYOffset;

     if (currentScroll > lastScroll) {
         nav.style.transform = 'translateY(-100%)';
     } else {
         nav.style.transform = 'translateY(0)';
     }
     lastScroll = currentScroll;
 });

// Mobile Menu Implementation
document.addEventListener('DOMContentLoaded', function() {
// Create mobile menu button if it doesn't exist
let mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navContent = document.querySelector('.nav-content');

if (!mobileMenuBtn) {
 mobileMenuBtn = document.createElement('button');
 mobileMenuBtn.className = 'mobile-menu-btn';
 mobileMenuBtn.setAttribute('aria-label', 'Toggle mobile menu');
 mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
 navContent.appendChild(mobileMenuBtn);
}

const navLinks = document.querySelector('.nav-links');
let isMenuOpen = false;

// Function to toggle menu
function toggleMenu() {
 isMenuOpen = !isMenuOpen;
 navLinks.classList.toggle('active', isMenuOpen);
 mobileMenuBtn.innerHTML = isMenuOpen ? 
     '<i class="fas fa-times"></i>' : 
     '<i class="fas fa-bars"></i>';
 
 // Prevent body scroll when menu is open
 document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

// Function to close menu
function closeMenu() {
 if (isMenuOpen) {
     isMenuOpen = false;
     navLinks.classList.remove('active');
     mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
     document.body.style.overflow = '';
 }
}

// Toggle menu on button click
mobileMenuBtn.addEventListener('click', function(e) {
 e.stopPropagation();
 toggleMenu();
});

// Close menu when clicking nav links
navLinks.querySelectorAll('a').forEach(link => {
 link.addEventListener('click', closeMenu);
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
 if (isMenuOpen && 
     !navLinks.contains(e.target) && 
     !mobileMenuBtn.contains(e.target)) {
     closeMenu();
 }
});

// Close menu on resize if screen becomes larger than mobile breakpoint
let resizeTimer;
window.addEventListener('resize', function() {
 clearTimeout(resizeTimer);
 resizeTimer = setTimeout(function() {
     if (window.innerWidth > 968) {
         closeMenu();
     }
 }, 250);
});

// Handle escape key
document.addEventListener('keydown', function(e) {
 if (e.key === 'Escape' && isMenuOpen) {
     closeMenu();
 }
});
});

// Animated Counter Function
function animateCounter(element, target, duration = 2000) {
let start = 0;
const end = parseInt(target);
const range = end - start;
const increment = end > start ? 1 : -1;
const stepTime = Math.abs(Math.floor(duration / range));
const isFloat = target.toString().includes('.');

const timer = setInterval(() => {
 start += increment;
 if (isFloat) {
     element.textContent = start.toFixed(1) + '%';
 } else {
     element.textContent = start + (element.nextElementSibling?.textContent.includes('K') ? 'K+' : '');
 }
 
 if (start === end) {
     clearInterval(timer);
 }
}, stepTime);
}

// Intersection Observer for Stats Counter
const statsObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
 if (entry.isIntersecting) {
     const statItem = entry.target;
     const countElement = statItem.querySelector('h4');
     const targetValue = countElement.textContent.replace(/[K+%]/g, '');
     
     // Reset the content for animation
     countElement.textContent = '0';
     statItem.classList.add('counting');
     
     // Animate the counter
     animateCounter(countElement, targetValue);
     
     // Unobserve after animation
     statsObserver.unobserve(statItem);
 }
});
}, {
threshold: 0.5
});

// Observe all stat items
document.querySelectorAll('.stat-item').forEach(item => {
statsObserver.observe(item);
});


// for faq section 

const faqData = {
    general: [
        {
            question: "What is mental health journaling and how can it help me?",
            answer: "Mental health journaling is a therapeutic practice of recording thoughts, feelings, and experiences. It can help reduce stress, manage anxiety, track mood patterns, and provide clarity in difficult situations. Regular journaling has been shown to improve emotional awareness and overall mental well-being."
        },
        {
            question: "How do I get started with journaling?",
            answer: "Start with short, regular entries. You can begin with our guided prompts, daily mood tracking, or simply writing about your day. There's no 'right' way to journal – find what works best for you. Our platform offers various templates and exercises to help you develop a comfortable journaling practice."
        },
        {
            question: "What if I miss a day of journaling?",
            answer: "That's completely normal and okay! Journaling should be helpful, not stressful. You can resume whenever you're ready. Our platform allows you to track your journaling streaks while maintaining flexibility for your schedule."
        }
    ],
    privacy: [
        {
            question: "Is my journal information private and secure?",
            answer: "Yes, we take your privacy seriously. All entries are encrypted, and only you can access them. We use bank-level security measures and never share your data with third parties. You can also enable two-factor authentication for additional security."
        },
        {
            question: "Can I export or delete my journal entries?",
            answer: "Yes, you have full control over your data. You can export your entries as PDF or text files for backup, and permanently delete any entries you choose. We also offer a complete account deletion option if needed."
        }
    ],
    journaling: [
        {
            question: "What should I write about?",
            answer: "You can write about anything that matters to you: your daily experiences, emotions, goals, challenges, or reflections. We provide daily prompts, mood tracking, and guided exercises to help inspire your writing. Remember, your journal is a personal space for self-expression."
        },
        {
            question: "How can I make journaling a daily habit?",
            answer: "Start by setting a specific time each day for journaling, even if it's just for 5 minutes. You can use our reminder feature, start with guided prompts, and track your progress. Making it part of your daily routine, like morning coffee or bedtime routine, can help establish the habit."
        }
    ],
    technical: [
        {
            question: "Can I access my journal on multiple devices?",
            answer: "Yes, your journal syncs across all your devices automatically. You can write entries on your phone, tablet, or computer, and they'll always be up-to-date. We also support offline access, so you can write even without an internet connection."
        },
        {
            question: "How do I customize my journal experience?",
            answer: "Our platform offers various customization options: different themes, fonts, and layouts. You can create custom tags, set up personalized prompts, and organize your entries in ways that work best for you. Visit the Settings menu to explore all customization options."
        }
    ]
};

// Initialize FAQ items with accordion behavior
function displayFAQs(category) {
    const container = document.getElementById('faqContainer');
    container.innerHTML = '';
    
    faqData[category].forEach(item => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.innerHTML = `
            <div class="faq-question">
                ${item.question}
                <div class="toggle-icon">+</div>
            </div>
            <div class="faq-answer">${item.answer}</div>
        `;
        container.appendChild(faqItem);
    });
}

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const allQuestions = document.querySelectorAll('.faq-item');
    
    allQuestions.forEach(item => {
        const question = item.querySelector('.faq-question').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});

function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', theme);
}

// // Check saved theme or system preference
// const savedTheme = localStorage.getItem('theme');
// if (savedTheme) {
//     setTheme(savedTheme);
// } else if (prefersDarkScheme.matches) {
//     setTheme('dark');
// }

// themeToggle.addEventListener('click', () => {
//     const currentTheme = document.body.getAttribute('data-theme');
//     setTheme(currentTheme === 'dark' ? 'light' : 'dark');
// });

// Category buttons
const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        displayFAQs(button.dataset.category);
    });
});

// Accordion behavior for FAQ items
document.addEventListener('click', (e) => {
    if (e.target.closest('.faq-question')) {
        const clickedItem = e.target.closest('.faq-item');
        const allItems = document.querySelectorAll('.faq-item');
        
        // Close all other items
        allItems.forEach(item => {
            if (item !== clickedItem && item.classList.contains('active')) {
                item.classList.remove('active');
            }
        });
        
        // Toggle clicked item
        clickedItem.classList.toggle('active');
    }
});

// Initialize with general FAQs
displayFAQs('general');


// footer

document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.getElementById('newsletter-form');
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        
        if (emailInput.value) {
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailRegex.test(emailInput.value)) {
                alert('Thank you for subscribing!');
                emailInput.value = ''; // Clear input
            } else {
                alert('Please enter a valid email address.');
            }
        }
    });
});