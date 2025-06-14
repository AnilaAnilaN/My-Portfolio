document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.navbar-toggler');
  const navbarNav = document.querySelector('.navbar-collapse');

  if (menuToggle && navbarNav) {
    menuToggle.addEventListener('click', () => {
      navbarNav.classList.toggle('show');
    });
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Close mobile menu if open
      if (navbarNav) {
        navbarNav.classList.remove('show');
      }
      
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Update active nav link
        navLinks.forEach(navLink => {
          navLink.classList.remove('active');
        });
        link.classList.add('active');
      }
    });
  });

  // Active section detection for navigation
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Code animation for Hero section
  const codeLines = document.querySelectorAll('.code-animation .code-line');
  codeLines.forEach((line, index) => {
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateX(0)';
    }, index * 500);
  });

  // Flip card interaction
  const flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach(card => {
    // Only add click handler for mobile devices
    if (window.innerWidth <= 768) {
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });
    } else {
      // Desktop hover effect
      card.addEventListener('mouseenter', () => {
        card.querySelector('.flip-card-inner').style.transform = 'rotateY(180deg)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.querySelector('.flip-card-inner').style.transform = 'rotateY(0deg)';
      });
    }
  });

  // Initialize first nav link as active
  if (navLinks.length > 0) {
    navLinks[0].classList.add('active');
  }

  // Skill cards animation on scroll
  const skillCards = document.querySelectorAll('.mern-card');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 150);
      }
    });
  }, { threshold: 0.1 });

  skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    skillObserver.observe(card);
  });
});
