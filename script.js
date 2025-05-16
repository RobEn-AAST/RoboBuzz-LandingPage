// Smooth scroll for nav links and scroll-down button
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Scroll reveal animation
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    // Function to check if element is in view
    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        // Element is considered in viewport when it's 20% visible
        const threshold = 0.2;
        return (
            rect.top <= windowHeight * (1 - threshold) && 
            rect.bottom >= windowHeight * threshold
        );
    };
    
    // Function to handle scroll and reveal elements
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (isElementInViewport(el) && !el.classList.contains('revealed')) {
                el.classList.add('revealed');
            }
        });
    };
    
    // Throttle function to limit how often the scroll handler runs
    const throttle = (fn, delay) => {
        let lastCall = 0;
        return function(...args) {
            const now = new Date().getTime();
            if (now - lastCall < delay) {
                return;
            }
            lastCall = now;
            return fn(...args);
        };
    };
    
    // Initial check on page load
    setTimeout(handleScrollAnimation, 100);
    
    // Add scroll event listener with throttling
    window.addEventListener('scroll', throttle(() => {
        handleScrollAnimation();
    }, 100));
});

// No extra JS needed for Bootstrap accordion (FAQ toggle)
const countdownDate = new Date("May 29, 2025 00:00:00").getTime();

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