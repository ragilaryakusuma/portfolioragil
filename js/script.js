/* ==========================================================================
   Main JavaScript for Portfolio Website
   Author: Ragil Arya
   Description: Handles all interactive features including particles, 
                custom cursor, theme switching, portfolio filtering, 
                lightbox, animations, and form handling
   ========================================================================== */

// ==========================================================================
// AOS (Animate On Scroll) Initialization
// ==========================================================================

AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out',
    disable: false
});

// ==========================================================================
// Particles.js Configuration
// ==========================================================================

// Only initialize particles if the element exists (homepage only)
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#000000' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#000000',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

// Update particles color based on theme
function updateParticlesColor() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const color = isDarkMode ? '#ffffff' : '#000000';
    
    if (window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.particles.color.value = color;
        window.pJSDom[0].pJS.particles.line_linked.color = color;
        window.pJSDom[0].pJS.fn.particlesRefresh();
    }
}

// ==========================================================================
// Custom Cursor
// ==========================================================================

const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && follower) {
    let cursorX = 0, cursorY = 0, followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });
    
    function animate() {
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        followerX += (cursorX - followerX) * 0.15;
        followerY += (cursorY - followerY) * 0.15;
        
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animate);
    }
    animate();
}

// ==========================================================================
// Scroll Progress Bar
// ==========================================================================

window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ==========================================================================
// Theme Toggle (Dark/Light Mode) - IMMEDIATE EXECUTION
// ==========================================================================

// CRITICAL: Load theme IMMEDIATELY before page renders to prevent flash
(function() {
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
    }
})();

// Initialize theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    
    // Set correct icon based on current theme
    if (body.classList.contains('dark-mode') && icon) {
        icon.classList.remove('bi-moon-stars-fill');
        icon.classList.add('bi-sun-fill');
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        document.documentElement.classList.toggle('dark-mode');
        
        const icon = themeToggle.querySelector('i');
        
        if (body.classList.contains('dark-mode')) {
            if (icon) {
                icon.classList.remove('bi-moon-stars-fill');
                icon.classList.add('bi-sun-fill');
            }
            localStorage.setItem('theme', 'dark');
        } else {
            if (icon) {
                icon.classList.remove('bi-sun-fill');
                icon.classList.add('bi-moon-stars-fill');
            }
            localStorage.setItem('theme', 'light');
        }
        
        // Update particles if available
        if (typeof updateParticlesColor === 'function') {
            updateParticlesColor();
        }
    });
    
    // Update particles on load if available
    if (typeof updateParticlesColor === 'function') {
        setTimeout(updateParticlesColor, 100);
    }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
} else {
    initThemeToggle();
}

// ==========================================================================
// Language Switcher (English/Indonesian)
// ==========================================================================

let currentLang = 'en';
const langBtns = document.querySelectorAll('.lang-btn');

if (langBtns.length > 0) {
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            currentLang = btn.dataset.lang;
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update all elements with bilingual data attributes
            document.querySelectorAll('[data-en][data-id]').forEach(el => {
                const newText = el.getAttribute(`data-${currentLang}`);
                if (newText) {
                    el.textContent = newText;
                }
            });
            
            // Store language preference
            localStorage.setItem('preferredLang', currentLang);
        });
    });
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang) {
        const savedBtn = document.querySelector(`.lang-btn[data-lang="${savedLang}"]`);
        if (savedBtn) {
            savedBtn.click();
        }
    }
}

// ==========================================================================
// Navigation Active State
// ==========================================================================

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==========================================================================
// Portfolio Filter System
// ==========================================================================

const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ==========================================================================
// Lightbox Modal System
// ==========================================================================

const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let currentIndex = 0;
const items = Array.from(portfolioItems);

// Open lightbox when clicking portfolio item
portfolioItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index;
        openLightbox(item);
    });
});

function openLightbox(item) {
    const mediaElement = item.querySelector('img, video');
    const clone = mediaElement.cloneNode(true);
    
    // Enable video controls and autoplay
    if (clone.tagName === 'VIDEO') {
        clone.controls = true;
        clone.autoplay = true;
    }
    
    lightboxContent.innerHTML = '';
    lightboxContent.appendChild(clone);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Pause video if playing
    const video = lightboxContent.querySelector('video');
    if (video) video.pause();
}

// Close lightbox events
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Navigation between lightbox items
lightboxPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    openLightbox(items[currentIndex]);
});

lightboxNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length;
    openLightbox(items[currentIndex]);
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
});

// ==========================================================================
// Skills Progress Animation
// ==========================================================================

const skillItems = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.5 });

skillItems.forEach(item => skillObserver.observe(item));

// ==========================================================================
// Counter Animation for Statistics
// ==========================================================================

const counters = document.querySelectorAll('.stat-number');
const speed = 200;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-count');
            const increment = target / speed;
            
            const updateCount = () => {
                const count = +counter.innerText;
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };
            
            updateCount();
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ==========================================================================
// Contact Form Submission
// ==========================================================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show success message based on language
    const message = currentLang === 'en' 
        ? 'Message sent successfully!' 
        : 'Pesan berhasil dikirim!';
    
    alert(message);
    contactForm.reset();
});

// ==========================================================================
// Video Hover Play/Pause
// ==========================================================================

portfolioItems.forEach(item => {
    const video = item.querySelector('video');
    if (video) {
        item.addEventListener('mouseenter', () => video.play());
        item.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    }
});

// ==========================================================================
// Smooth Scroll for Navigation Links with Easing
// ==========================================================================

// Custom smooth scroll with easing function
function smoothScrollTo(target, duration = 1200) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    // Easing function - ease in out cubic for buttery smooth feel
    function easeInOutCubic(t) {
        return t < 0.5 
            ? 4 * t * t * t 
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            smoothScrollTo(target, 1200);
        }
    });
});

// ==========================================================================
// Image Protection - Prevent Download/Save
// ==========================================================================

// Block right-click on all images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.hero-photo, .about-image img');
    
    images.forEach(img => {
        // Prevent right-click
        img.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
        
        // Prevent drag
        img.addEventListener('dragstart', function(e) {
            e.preventDefault();
            return false;
        });
    });
});

// ==========================================================================
// Initialize on Page Load
// ==========================================================================

console.log('Portfolio website loaded successfully!');
console.log('All interactive features initialized.');
