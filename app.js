// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const header = document.querySelector('header');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const scrollTopBtn = document.getElementById('scroll-top');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    const contactForm = document.getElementById('contact-form');
    const sections = document.querySelectorAll('section');

    // Variables
    let currentSlide = 0;

    // Functions
    // Header scroll effect
    function headerScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Show/hide scroll to top button
    function scrollToTopButton() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }

    // Mobile navigation toggle
    function toggleMobileNav() {
        mobileNavToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll'); // Prevent scrolling when nav is open
    }

    // Close mobile nav when a link is clicked
    function closeMobileNav() {
        mobileNavToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    // Smooth scroll to section
    function smoothScroll(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetPosition = document.querySelector(targetId).offsetTop - 80; // Adjust for header height
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        closeMobileNav();
    }

    // Testimonial slider
    function showSlide(n) {
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide and activate current dot
        testimonialSlides[n].classList.add('active');
        dots[n].classList.add('active');
    }

    function nextSlide() {
        currentSlide++;
        if (currentSlide >= testimonialSlides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = testimonialSlides.length - 1;
        }
        showSlide(currentSlide);
    }

    // Set up automatic testimonial rotation
    let slideInterval = setInterval(nextSlide, 5000);

    // Stop auto rotation when user interacts with slider
    function pauseSlideInterval() {
        clearInterval(slideInterval);
        // Restart after 10 seconds of inactivity
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Form validation and submission
    function validateForm(e) {
        e.preventDefault();
        
        // Get form inputs
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const interest = document.getElementById('interest').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // In a real implementation, you would send the form data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! We will contact you soon.');
        contactForm.reset();
    }

    // Scroll to top function
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    function observerCallback(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections for fade-in effect
    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });

    // Parallax effect for hero section
    function parallax() {
        const hero = document.querySelector('.hero');
        const scrollPosition = window.pageYOffset;
        
        if (scrollPosition <= hero.offsetHeight) {
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    }

    // Event Listeners
    window.addEventListener('scroll', () => {
        headerScroll();
        scrollToTopButton();
        parallax();
    });
    
    mobileNavToggle.addEventListener('click', toggleMobileNav);
    
    navLinksItems.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        pauseSlideInterval();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        pauseSlideInterval();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            pauseSlideInterval();
        });
    });
    
    scrollTopBtn.addEventListener('click', scrollToTop);
    
    contactForm.addEventListener('submit', validateForm);

    // Initialize
    headerScroll(); // Check initial scroll position
    scrollToTopButton(); // Check initial scroll position
    showSlide(currentSlide); // Show first testimonial slide
});
