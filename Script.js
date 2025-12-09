// Initialisation
gsap.registerPlugin(ScrollTrigger);

// Au chargement
document.addEventListener('DOMContentLoaded', function() {
    // Animations d'entrée
    gsap.from('.logo', {duration: 1, y: -50, opacity: 0, ease: "power3.out"});
    gsap.from('.hero-title', {duration: 1.5, y: 100, opacity: 0, delay: 0.5, ease: "power3.out"});
    gsap.from('.hero-subtitle', {duration: 1.5, y: 50, opacity: 0, delay: 1, ease: "power3.out"});
    gsap.from('.hero-buttons', {duration: 1, y: 50, opacity: 0, delay: 1.5, ease: "power3.out"});
    
    // Initialisation
    initScrollAnimations();
    initCounters();
    initMobileMenu();
});

// Animations au scroll
function initScrollAnimations() {
    gsap.utils.toArray('.product-category').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {trigger: card, start: "top 80%"},
            y: 50, opacity: 0, duration: 1, ease: "power2.out"
        });
    });

    gsap.utils.toArray('.service-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {trigger: card, start: "top 85%"},
            y: 30, opacity: 0, duration: 0.8, ease: "power2.out"
        });
    });

    gsap.from('.about-content', {
        scrollTrigger: {trigger: '.about-section', start: "top 70%"},
        x: -50, opacity: 0, duration: 1, ease: "power2.out"
    });
}

// Compteurs animés
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        ScrollTrigger.create({
            trigger: counter,
            start: "top 90%",
            onEnter: () => updateCounter(),
            once: true
        });
    });
}

// Menu mobile
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    // Navigation active
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

// Effet navbar au scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (scrollY > 100) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '15px 0';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    }
});

// Animation survol cartes
document.querySelectorAll('.product-category, .service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        gsap.to(this, {scale: 1.02, duration: 0.3, ease: "power2.out"});
    });
    
    card.addEventListener('mouseleave', function() {
        gsap.to(this, {scale: 1, duration: 0.3, ease: "power2.out"});
    });
});
