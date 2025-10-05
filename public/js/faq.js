// Accordion Functionality
const faqs = document.querySelectorAll(".faq-item");

faqs.forEach(faq => {
    faq.querySelector(".faq-question").addEventListener("click", () => {
    faq.classList.toggle("active");
    });
});

// Scroll to Top Button functionality
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Show/hide button based on scroll position
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) { // Show button after scrolling 300px
    scrollToTopBtn.classList.add('show');
    } else {
    scrollToTopBtn.classList.remove('show');
    }
});

// Smooth scroll to top function
function scrollToTop() {
    window.scrollTo({
    top: 0,
    behavior: 'smooth'
    });
}

// Add keyboard accessibility for scroll to top button
scrollToTopBtn.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    scrollToTop();
    }
});