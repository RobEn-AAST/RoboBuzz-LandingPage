// Smooth scroll for nav links and scroll-down button
document.addEventListener('DOMContentLoaded', function() {
    // Add a class to indicate JS is enabled
    document.documentElement.classList.add('js-enabled');
    
    const navLinks = document.querySelectorAll('.navbar-nav a, .btn[href^="#"], .scroll-down');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Enhanced Scroll Reveal Animation using Intersection Observer
    const scrollRevealElements = document.querySelectorAll(
        '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale'
    );
    
    // Check if browser supports Intersection Observer
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // Trigger when 15% of element is visible
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Optional: Stop observing after reveal (comment out to allow re-trigger)
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all scroll reveal elements
        scrollRevealElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        const handleScrollAnimation = () => {
            scrollRevealElements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                const isVisible = rect.top <= windowHeight * 0.85 && rect.bottom >= 0;
                
                if (isVisible && !el.classList.contains('revealed')) {
                    el.classList.add('revealed');
                }
            });
        };
        
        // Throttle function
        const throttle = (fn, delay) => {
            let lastCall = 0;
            return function(...args) {
                const now = new Date().getTime();
                if (now - lastCall < delay) return;
                lastCall = now;
                return fn(...args);
            };
        };
        
        // Initial check
        setTimeout(handleScrollAnimation, 100);
        
        // Add scroll listener with throttling
        window.addEventListener('scroll', throttle(handleScrollAnimation, 100));
        window.addEventListener('resize', throttle(handleScrollAnimation, 200));
    }
    
    // Fallback - reveal all elements after 3 seconds if not revealed
    setTimeout(() => {
        const unrevealed = document.querySelectorAll(
            '.scroll-reveal:not(.revealed), .scroll-reveal-left:not(.revealed), ' +
            '.scroll-reveal-right:not(.revealed), .scroll-reveal-scale:not(.revealed)'
        );
        unrevealed.forEach(el => el.classList.add('revealed'));
    }, 3000);
});

// No extra JS needed for Bootstrap accordion (FAQ toggle)
const countdownDate = new Date("November 11, 2025 00:00:00").getTime();

// Store previous values to detect changes
let prevDays, prevHours, prevMinutes, prevSeconds;

// Function to apply pulse animation when a value changes
function animateChange(element) {
    element.classList.add('pulse-animation');
    setTimeout(() => {
        element.classList.remove('pulse-animation');
    }, 500);
}

// Update the countdown every 1 second
const countdownTimer = setInterval(function() {
    // Get today's date and time
    const now = new Date().getTime();
    
    // Find the distance between now and the countdown date
    const distance = countdownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Format with leading zeros
    const formattedDays = days < 10 ? "0" + days : days;
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    
    // Get elements
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    
    // Update display and animate changes
    if (formattedDays !== prevDays) {
        daysEl.innerHTML = formattedDays;
        animateChange(daysEl);
        prevDays = formattedDays;
    }
    
    if (formattedHours !== prevHours) {
        hoursEl.innerHTML = formattedHours;
        animateChange(hoursEl);
        prevHours = formattedHours;
    }
    
    if (formattedMinutes !== prevMinutes) {
        minutesEl.innerHTML = formattedMinutes;
        animateChange(minutesEl);
        prevMinutes = formattedMinutes;
    }
      // Seconds always change - add pulse animation every 10 seconds
    secondsEl.innerHTML = formattedSeconds;
    if (seconds % 10 === 0) {
        animateChange(secondsEl);
    } else {
        secondsEl.classList.add('seconds-tick');
        setTimeout(() => {
            secondsEl.classList.remove('seconds-tick');
        }, 500);
    }
    prevSeconds = formattedSeconds;
    
    // If the countdown is finished
    if (distance < 0) {
        clearInterval(countdownTimer);
        daysEl.innerHTML = "00";
        hoursEl.innerHTML = "00";
        minutesEl.innerHTML = "00";
        secondsEl.innerHTML = "00";
        
        // Show registration closed message with animation
        const countdownContainer = document.querySelector(".countdown-container");
        if (countdownContainer) {
            countdownContainer.classList.add('fade-out');
            setTimeout(() => {
                countdownContainer.innerHTML = '<div class="alert alert-warning p-4 fs-5 text-center">Registration is now closed.</div>';
                countdownContainer.classList.remove('fade-out');
                countdownContainer.classList.add('fade-in');
            }, 500);
        }
    }
}, 1000);

// Fallback to ensure elements are visible if JavaScript fails
document.addEventListener('DOMContentLoaded', function() {
    // Add a class to indicate JS is working
    document.body.classList.add('js-enabled');
});