function openForm() {
  document.getElementById("volunteerModal").style.display = "block";
}

function submitForm() {
  // Get the values entered in the form
  const name = document.getElementById("volName").value;
  const email = document.getElementById("volEmail").value;
  const password = document.getElementById("volPassword").value;

  // Display the entered information in the output section
  document.getElementById("formOutput").style.display = "block";
  document.getElementById("outputName").textContent = name;
  document.getElementById("outputEmail").textContent = email;
  document.getElementById("outputPassword").textContent = password;
  document.getElementById("volunteerModal").querySelector('form').style.display = "none";
  return true;
}

function handleDonation() {
// Redirect to the campaign page and jump to a section
window.location.href = "campaign.html#campaignSection";
}

function togglePartnershipInfo() {
  const info = document.getElementById("partnershipInfo");
  info.style.display = info.style.display === "none" ? "block" : "none";
}

function goToContactUs() {
  if (confirm("Have questions or ideas? We’d love to hear from you!")) {
    window.location.href = "contactUs.html";
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