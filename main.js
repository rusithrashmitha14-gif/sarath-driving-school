// Initialize Lucide icons
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // 2. Sticky Navbar & Back to Top Button
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      if (navbar) navbar.classList.add('scrolled');
    } else {
      if (navbar) navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Scroll Animations (Intersection Observer)
  const animatedElements = document.querySelectorAll('.fade-up, .blur-reveal, .scale-in-image, .luxury-line, .draw-line');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    animationObserver.observe(el);
  });

  // 4. Animated Counters
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = parseInt(target.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const steps = 60;
        const stepValue = finalValue / steps;
        const stepTime = duration / steps;
        
        let currentValue = 0;
        
        const counterInterval = setInterval(() => {
          currentValue += stepValue;
          if (currentValue >= finalValue) {
            target.textContent = finalValue + (finalValue === 100 ? '%' : '+');
            clearInterval(counterInterval);
          } else {
            target.textContent = Math.floor(currentValue) + (finalValue === 100 ? '' : '');
          }
        }, stepTime);
        
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => {
    counterObserver.observe(num);
  });

  // 5. Testimonial Carousel
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');
  let currentTestimonialIndex = 0;

  if (testimonialCards.length > 0 && nextBtn && prevBtn) {
    function showTestimonial(newIndex, direction) {
      const currentCard = testimonialCards[currentTestimonialIndex];
      const nextCard = testimonialCards[newIndex];
      
      testimonialCards.forEach(card => {
        card.classList.remove('active', 'drive-in-right', 'drive-out-left', 'drive-in-left', 'drive-out-right');
      });
      
      // Force DOM reflow to ensure animations restart
      void currentCard.offsetWidth;
      void nextCard.offsetWidth;

      if (direction === 'next') {
        currentCard.classList.add('drive-out-left', 'active');
        nextCard.classList.add('drive-in-right', 'active');
      } else {
        currentCard.classList.add('drive-out-right', 'active');
        nextCard.classList.add('drive-in-left', 'active');
      }
      
      currentTestimonialIndex = newIndex;
    }

    nextBtn.addEventListener('click', () => {
      const newIndex = (currentTestimonialIndex + 1) % testimonialCards.length;
      showTestimonial(newIndex, 'next');
    });

    prevBtn.addEventListener('click', () => {
      const newIndex = (currentTestimonialIndex - 1 + testimonialCards.length) % testimonialCards.length;
      showTestimonial(newIndex, 'prev');
    });
  }
});
