// Main initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slider functionality
    setupSlider();
    
    // Initialize video handling
    setupVideo();
    
    // Setup mobile navigation
    setupMobileNav();
    
    // Setup button event handlers
    setupButtonHandlers();
    
    // Setup metrics animation
    setupMetricsAnimation();
});

// Slider functionality
function setupSlider() {
    const slideItems = document.querySelectorAll('.slide-item');
    const sliderDots = document.querySelectorAll('.slider-dot');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    let currentSlideIndex = 0;
    let slideTimer;

    // Initialize slider
    function initializeSlider() {
        // Show initial slide
        showCurrentSlide(currentSlideIndex);
        
        // Start automatic sliding
        startAutoSlide();
        
        // Add event listeners for controls
        prevButton.addEventListener('click', showPreviousSlide);
        nextButton.addEventListener('click', showNextSlide);
        
        // Add click events to dots
        sliderDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const targetIndex = parseInt(this.getAttribute('data-index'));
                showCurrentSlide(targetIndex);
                resetAutoSlide();
            });
        });
        
        // Pause on hover
        const sliderElement = document.querySelector('.slider-wrapper');
        sliderElement.addEventListener('mouseenter', pauseAutoSlide);
        sliderElement.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Display specific slide
    function showCurrentSlide(index) {
        // Hide all slides
        slideItems.forEach(item => {
            item.classList.remove('slide-active');
        });
        
        // Update dots
        sliderDots.forEach(dot => {
            dot.classList.remove('dot-active');
        });
        
        // Show target slide and activate corresponding dot
        slideItems[index].classList.add('slide-active');
        sliderDots[index].classList.add('dot-active');
        currentSlideIndex = index;
    }
    
    // Show next slide
    function showNextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slideItems.length;
        showCurrentSlide(currentSlideIndex);
        resetAutoSlide();
    }
    
    // Show previous slide
    function showPreviousSlide() {
        currentSlideIndex = (currentSlideIndex - 1 + slideItems.length) % slideItems.length;
        showCurrentSlide(currentSlideIndex);
        resetAutoSlide();
    }
    
    // Start automatic sliding
    function startAutoSlide() {
        slideTimer = setInterval(showNextSlide, 5000);
    }
    
    // Pause automatic sliding
    function pauseAutoSlide() {
        clearInterval(slideTimer);
    }
    
    // Reset automatic sliding
    function resetAutoSlide() {
        pauseAutoSlide();
        startAutoSlide();
    }
    
    // Initialize the slider
    initializeSlider();
}

// Video handling
function setupVideo() {
    const backgroundVideo = document.getElementById('backgroundVideo');
    
    if (backgroundVideo) {
        // Attempt to play video automatically
        const videoPromise = backgroundVideo.play();
        
        if (videoPromise !== undefined) {
            videoPromise.catch(() => {
                // Fallback if autoplay fails
                document.querySelector('.vid-fallback').style.display = 'block';
            });
        }
        
        // Ensure video is muted for autoplay
        backgroundVideo.muted = true;
    }
}

// Mobile navigation setup
function setupMobileNav() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navigationBar = document.querySelector('.navigation-bar');
    
    if (!mobileToggle || !navigationBar) return;
    
    mobileToggle.addEventListener('click', function() {
        navigationBar.classList.toggle('active');
        
        // Toggle icon
        const toggleIcon = this.querySelector('i');
        if (toggleIcon.classList.contains('fa-bars')) {
            toggleIcon.classList.remove('fa-bars');
            toggleIcon.classList.add('fa-times');
        } else {
            toggleIcon.classList.remove('fa-times');
            toggleIcon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking links
    const navLinks = document.querySelectorAll('.navigation-bar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                navigationBar.classList.remove('active');
                mobileToggle.querySelector('i').classList.remove('fa-times');
                mobileToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });
}

// Button event handlers
function setupButtonHandlers() {
    // "Get Started" button in header
    const getStartedBtn = document.querySelector('.header-buttons .button-primary');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            alert('This would navigate to the signup page.');
        });
    }
    
    // "Login" button in header
    const loginBtn = document.querySelector('.header-buttons .button-secondary');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            alert('This would open the login modal/page.');
        });
    }
    
    // CTA buttons in slider
    const ctaButtons = document.querySelectorAll('.slide-buttons .button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const actionText = this.textContent.trim();
            alert(`This would perform action: ${actionText}`);
        });
    });
}

// Metrics animation
function setupMetricsAnimation() {
    const metricNumbers = document.querySelectorAll('.metric-number');
    const metricsSection = document.querySelector('.metrics-section');
    
    function animateMetrics() {
        if (!metricsSection) return;
        
        const sectionTop = metricsSection.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight / 1.3;
        
        if (sectionTop < triggerPoint) {
            metricNumbers.forEach(metric => {
                const targetValue = parseInt(metric.textContent.replace(/[^0-9]/g, ''));
                const suffix = metric.textContent.replace(/[0-9]/g, '');
                let currentValue = 0;
                const increment = targetValue / 60;
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= targetValue) {
                        currentValue = targetValue;
                        clearInterval(counter);
                    }
                    metric.textContent = Math.floor(currentValue).toLocaleString() + suffix;
                }, 16);
            });
            
            // Remove scroll listener after animation
            window.removeEventListener('scroll', animateMetrics);
        }
    }
    
    window.addEventListener('scroll', animateMetrics);
    // Initial check
    animateMetrics();
}

// Handle window resize
window.addEventListener('resize', function() {
    const navigationBar = document.querySelector('.navigation-bar');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    
    if (window.innerWidth > 992 && navigationBar && mobileToggle) {
        navigationBar.classList.remove('active');
        mobileToggle.querySelector('i').classList.remove('fa-times');
        mobileToggle.querySelector('i').classList.add('fa-bars');
    }
});

// Logo usage note
console.log("Note: Make sure to place your logo.png file in the same directory as these files.");
console.log("The logo should be named exactly 'logo.png'");