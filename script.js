// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for navigation links (only same-page anchors)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.timeline-item, .honor-card, .education-card, .skills-category, .about-content, .contact-content');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Experience accordion toggles
    document.querySelectorAll('.exp-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', String(!expanded));
            const card = btn.closest('.exp-card');
            if (card) {
                card.classList.toggle('open', !expanded);
            }
        });
    });

    // Tilt effect for learning cards
    document.querySelectorAll('.learning-item.tilt').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateY = ((x / rect.width) - 0.5) * 8; // -4deg to 4deg
            const rotateX = -((y / rect.height) - 0.5) * 8;
            card.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Suggest a topic mailto
    const form = document.getElementById('suggest-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = (document.getElementById('s-name')?.value || '').trim();
            const topic = (document.getElementById('s-topic')?.value || '').trim();
            const details = (document.getElementById('s-details')?.value || '').trim();
            const subject = encodeURIComponent(`Learning topic suggestion: ${topic || 'Untitled'}`);
            const bodyLines = [
                name ? `From: ${name}` : null,
                topic ? `Topic: ${topic}` : null,
                '',
                'Details:',
                details || '(no details provided)'
            ].filter(Boolean);
            const body = encodeURIComponent(bodyLines.join('\n'));
            window.location.href = `mailto:jay@miran-ai.com?subject=${subject}&body=${body}`;
        });
    }
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Light parallax on hero decorative dots
window.addEventListener('mousemove', (e) => {
    const dots = document.querySelectorAll('.hero-decor .dot');
    if (!dots.length) return;
    const { innerWidth, innerHeight } = window;
    const offsetX = (e.clientX / innerWidth - 0.5) * 6;
    const offsetY = (e.clientY / innerHeight - 0.5) * 6;
    dots.forEach((dot, idx) => {
        const depth = (idx + 1) * 0.5;
        dot.style.transform = `translate(${offsetX * depth}px, ${offsetY * depth}px)`;
    });
});

