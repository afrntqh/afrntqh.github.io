document.getElementById("contactForm").addEventListener("submit", function(e) {
    const name = document.querySelector('input[name="name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const subject = document.querySelector('input[name="subject"]').value.trim();
    const message = document.querySelector('textarea[name="message"]').value.trim();

    // Basic conditional validation
if (!name || !email || !subject || !message) {
    alert("Please fill in all fields.");
    e.preventDefault(); // prevent submission
    return;
}

    // Basic email format check
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        e.preventDefault();
        return;
    }
    
    alert("Form submitted successfully!");
});

function goToHome() {
    if (confirm("Return to where it all begins — explore HopeHive’s journey 🏡.")) {
        window.location.href = "home.html";
    }
}

// Dropdown menu
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    const dropdowns = document.querySelectorAll('.dropdown');
  
    // Toggle mobile menu
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navList.classList.toggle('active');
    });
  
    // Handle dropdowns for mobile view
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
  
        dropbtn.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
  
                // Close other open dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('active');
                    }
                });
            }
        });
    });
  
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                if (window.innerWidth <= 768) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });
  });