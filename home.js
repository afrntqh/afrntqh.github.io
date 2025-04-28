const now = new Date().getHours();
if (now < 12) {
    alert("Good Morning 🌅! Welcome to HopeHive.");
} else if (now < 18) {
    alert("Good Afternoon 🌄! Glad you're here.");
} else {
    alert("Good Evening 🌆! Let's make a difference together.");
}

function goToAboutUs() {
    if (confirm("Learn more about our values and vision for change 💡.")) {
        window.location.href = "aboutUs.html";
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

// Slideshow & Calendar Code
document.addEventListener('DOMContentLoaded', function() {
    // Slideshow functionality
    let slideIndex = 0; // Start at 0 for array indexing
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    // In the showSlide function:
    function showSlide(n) {
      // Wrap around if at end
      if (n >= slides.length) slideIndex = 0;
      if (n < 0) slideIndex = slides.length - 1;
      
      slides.forEach(slide => slide.style.display = 'none');
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Show current slide
      slides[slideIndex].style.display = 'block';
      // Highlight the corresponding dot (modulo operation for when we have more dots than slides)
      dots[slideIndex % dots.length].classList.add('active');
    }
    
    // Navigation functions
    function nextSlide() {
        slideIndex++;
        showSlide(slideIndex);
    }
    
    function prevSlide() {
        slideIndex--;
        showSlide(slideIndex);
    }
    
    // Button event listeners
    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelector('.prev').addEventListener('click', prevSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slideIndex = index;
            showSlide(slideIndex);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
    
    // Auto-advance every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Initialize
    showSlide(slideIndex);

    // Calendar functionality
  const calendarGrid = document.getElementById('calendar-grid');
  const currentMonthElement = document.getElementById('current-month');
  const prevMonthButton = document.getElementById('prev-month');
  const nextMonthButton = document.getElementById('next-month');
  const eventsTodayList = document.getElementById('events-today');

  if (calendarGrid && currentMonthElement && prevMonthButton && nextMonthButton && eventsTodayList) {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let selectedDayElement = null;

    // Sample events data
    const events = [
      { date: new Date(currentYear, currentMonth, 10), title: 'Food Drive', description: 'Help us collect and distribute food.', time: '10:00 AM - 2:00 PM' },
      { date: new Date(currentYear, currentMonth, 15), title: 'Volunteer Training', description: 'Orientation for new volunteers.', time: '6:00 PM - 8:00 PM' },
      { date: new Date(currentYear, currentMonth, 20), title: 'Community Fundraiser', description: 'Annual gala event.', time: '7:00 PM - 10:00 PM' },
      { date: new Date(currentYear, currentMonth, 25), title: 'School Supplies Distribution', description: 'Backpacks and supplies distribution.', time: '9:00 AM - 4:00 PM' }
    ];

    // Renders the calendar for specified month/year
    const renderCalendar = (month, year) => {
      calendarGrid.innerHTML = '';
      selectedDayElement = null;

      // Set month/year header
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
      currentMonthElement.textContent = `${monthNames[month]} ${year}`;

      // Add day headers (Sun-Sat)
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      dayNames.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day-header';
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
      });

      // Calculate first day and days in month
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      // Add empty cells for days before month starts
      for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day';
        emptyCell.setAttribute('aria-hidden', 'true');
        calendarGrid.appendChild(emptyCell);
      }

      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        dayElement.setAttribute('aria-label', `${monthNames[month]} ${day}, ${year}`);
        dayElement.setAttribute('tabindex', '0');

        // Highlight today's date by default
        const today = new Date();
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayElement.classList.add('today');
            selectedDayElement = dayElement;
            displayTodaysEvents(day, month, year);
        }

        if (events.some(e =>
          e.date.getDate() === day &&
          e.date.getMonth() === month &&
          e.date.getFullYear() === year)) {
            dayElement.classList.add('event-day');
        }

        // Day click handler - adds selection highlight
        dayElement.addEventListener('click', () => selectDay(dayElement, day, month, year));

        dayElement.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectDay(dayElement, day, month, year);
            }
        });

        calendarGrid.appendChild(dayElement);
      }
    };

    // Handles day selection (click/keyboard)
    const selectDay = (dayElement, day, month, year) => {
    // Remove previous selection
    if (selectedDayElement) {
        selectedDayElement.classList.remove('selected');
    }
        
    // Add new selection
    dayElement.classList.add('selected');
    selectedDayElement = dayElement;
        
    // Show events for selected day
    displayTodaysEvents(day, month, year);
};

    // Displays events for selected day
    const displayTodaysEvents = (day, month, year) => {
      const todaysEvents = events.filter(e =>
        e.date.getDate() === day &&
        e.date.getMonth() === month &&
        e.date.getFullYear() === year
      );

      eventsTodayList.innerHTML = todaysEvents.length === 0 
      ? '<li>No events scheduled</li>'
      : todaysEvents.map(event => `
          <li>
              <div class="event-title">${event.title}</div>
              <div class="event-time">${event.time}</div>
              <div class="event-desc">${event.description}</div>
          </li>
      `).join('');
};      

    // Month navigation event listeners
    prevMonthButton.addEventListener('click', () => {
      currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
      if (currentMonth === 11) currentYear--;
      renderCalendar(currentMonth, currentYear);
    });

    nextMonthButton.addEventListener('click', () => {
      currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
      if (currentMonth === 0) currentYear++;
      renderCalendar(currentMonth, currentYear);
    });

    // Initialize calendar
    renderCalendar(currentMonth, currentYear);
  }
});
