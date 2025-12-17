document.addEventListener('DOMContentLoaded', function() {
    // Slider Functionality
    let currentSlide = 0;
    const slideContainer = document.querySelector('.slides-container');
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');

    function updateSlider() {
        if (slideContainer) {
            slideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }
    }

    function nextSlide() {
        if (slides.length > 0) {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }
    }

    function prevSlide() {
        if (slides.length > 0) {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        }
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    // Indicator click handlers
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            goToSlide(slideIndex);
        });
    });

    // Auto-advance slides
    let slideInterval;
    if (slideContainer) {
        slideInterval = setInterval(nextSlide, 5000);

        // Pause auto-advance on hover
        slideContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        slideContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });

        // Initialize slider
        updateSlider();
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);

        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('Thank you! Your quote request has been submitted. We will contact you within 24 hours.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navRight = document.querySelector('.nav-right');
    if (navToggle && navRight) {
        navToggle.addEventListener('click', () => {
            navRight.classList.toggle('open');
            navToggle.classList.toggle('open');
        });

        // Close mobile menu when a link is clicked
        navRight.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navRight.classList.remove('open');
                navToggle.classList.remove('open');
            });
        });
    }

    // Expose controls for inline onclick attributes (prev/next buttons)
    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;
    window.goToSlide = goToSlide;
});

// Restart entrance animations so they play on every page visit (including bfcache restores)
function restartEntranceAnimations() {
    const animated = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-service-box, .hero-service-icon');
    if (!animated || animated.length === 0) return;

    animated.forEach(el => {
        // clear inline animation to restart CSS animation
        el.style.animation = 'none';
        // force reflow
        // eslint-disable-next-line no-unused-expressions
        void el.offsetWidth;
        // remove the override so the CSS animation plays again
        el.style.animation = '';
    });
}

// Run on first load or when DOM is ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    restartEntranceAnimations();
} else {
    document.addEventListener('DOMContentLoaded', restartEntranceAnimations);
}

// Handle pageshow to catch back/forward cache restores
window.addEventListener('pageshow', function (event) {
    // run on both persisted (bfcache) and normal show events
    restartEntranceAnimations();
});
