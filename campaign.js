function showForm(campaignName) {
  // Show the form and set the campaign title
  document.getElementById("donationForm").style.display = "block";
  document.getElementById("campaignTitle").textContent = "Donate to: " + campaignName;
}

document.getElementById("donationSubmitForm").addEventListener("submit", function(e) {
  const name = document.querySelector('input[name="name"]').value.trim();
  const email = document.querySelector('input[name="email"]').value.trim();
  const subject = document.querySelector('input[name="subject"]').value.trim();
  
  if (!name || !email || !subject) {
    alert("Please fill in all required fields.");
    e.preventDefault();
    return;
  }
  
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    e.preventDefault();
    return;
  }
});

function goToGetInvolved() {
  if (confirm("Take the next step. Volunteer, Donate, or Learn More About Partnerships 🤝.")) {
    window.location.href = "getInvolved.html";
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