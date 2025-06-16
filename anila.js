document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile menu toggle ---
    // REMOVED custom JavaScript to toggle 'show' class.
    // Bootstrap's data attributes (data-bs-toggle="collapse", data-bs-target="#navbarNav")
    // on the .navbar-toggler button will handle the toggling of the .show class
    // on the .navbar-collapse element automatically.
    const navbarNav = document.querySelector('.navbar-collapse'); // Still need this for closing on nav link click

    // --- Smooth scrolling for navigation links & Active section detection ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    const setActiveNavLink = () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Adjust offset to trigger active state a bit before the section fully enters view
            if (window.pageYOffset >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Close mobile menu if open
            // This part is still needed as it's custom behavior for clicking a nav link
            if (navbarNav && navbarNav.classList.contains('show')) {
                // Use Bootstrap's native method to hide the collapse, if you have Bootstrap JS loaded
                // Otherwise, toggling the class directly here is fine for *this* specific action (nav link click)
                // as it's not conflicting with the toggler button itself.
                const bsCollapse = new bootstrap.Collapse(navbarNav, { toggle: false });
                bsCollapse.hide();
            }

            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Offset for fixed navbar
                    behavior: 'smooth'
                });

                // Update active nav link immediately on click
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Initial check and scroll event for active nav links
    setActiveNavLink(); // Set initial active link on load
    window.addEventListener('scroll', setActiveNavLink);

    // --- Code animation for Hero section ---
    const codeLines = document.querySelectorAll('.code-animation .code-line');
    codeLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, index * 500);
    });

    // --- Flip card interaction ---
    const flipCards = document.querySelectorAll('.flip-card');

    // Helper function to determine if it's a mobile device based on Bootstrap's md breakpoint
    const isMobileDevice = () => window.matchMedia("(max-width: 767.98px)").matches;

    // Unified function to set up event listeners for a single card
    const setupFlipCardListeners = (card) => {
        const innerCard = card.querySelector('.flip-card-inner');

        // Remove any existing listeners to prevent duplicates
        card.removeEventListener('click', toggleFlippedClass);
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);

        // Reset flipped state
        card.classList.remove('flipped');
        innerCard.style.transform = ''; // Clear inline style that might conflict

        if (isMobileDevice()) {
            // Mobile: Click to toggle 'flipped' class
            card.addEventListener('click', toggleFlippedClass);
        } else {
            // Desktop: Hover to transform
            card.addEventListener('mouseenter', handleMouseEnter);
            card.addEventListener('mouseleave', handleMouseLeave);
        }
    };

    // Event handler for click (mobile)
    function toggleFlippedClass() {
        this.classList.toggle('flipped');
    }

    // Event handler for mouseenter (desktop)
    function handleMouseEnter() {
        this.querySelector('.flip-card-inner').style.transform = 'rotateY(180deg)';
    }

    // Event handler for mouseleave (desktop)
    function handleMouseLeave() {
        this.querySelector('.flip-card-inner').style.transform = 'rotateY(0deg)';
    }

    // Initial setup for all flip cards
    flipCards.forEach(setupFlipCardListeners);

    // Re-evaluate flip card listeners on window resize
    let lastIsMobile = isMobileDevice();
    window.addEventListener('resize', () => {
        const currentIsMobile = isMobileDevice();
        if (currentIsMobile !== lastIsMobile) {
            flipCards.forEach(setupFlipCardListeners); // Re-setup all cards
            lastIsMobile = currentIsMobile;
        }
    });

    // --- Initialize first nav link as active (if not already set by scroll) ---
    if (navLinks.length > 0 && !document.querySelector('.nav-link.active')) {
        // Find the "Home" link or the first actual section link and make it active
        const homeLink = document.querySelector('.nav-link[href="#home"]');
        if (homeLink) {
            homeLink.classList.add('active');
        } else {
            // Fallback to first link if no #home
            navLinks[0].classList.add('active');
        }
    }

    // --- Skill cards animation on scroll ---
    const skillCards = document.querySelectorAll('.mern-card');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Use a short delay for a staggered effect
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                skillObserver.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the card is visible

    skillCards.forEach(card => {
        card.style.opacity = '0'; // Initial hidden state
        card.style.transform = 'translateY(20px)'; // Initial position for animation
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease'; // Animation properties
        skillObserver.observe(card);
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // Soft Skills Animation
    const softSkillCards = document.querySelectorAll('.soft-skill-card');
    const softSkillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                softSkillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    softSkillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        softSkillObserver.observe(card);
    });
});
