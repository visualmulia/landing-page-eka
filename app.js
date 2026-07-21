document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Mobile Menu Toggle ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-nav-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !expanded);
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
  }

  // --- 2. Header Scroll Effect ---
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- 3. Dark/Light Theme Switcher ---
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const themeIcon = document.getElementById('theme-icon');
  
  const getTheme = () => localStorage.getItem('theme') || 'light';
  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update Icons
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'fa-solid fa-sun';
      } else {
        themeIcon.className = 'fa-solid fa-moon';
      }
    }
  };

  // Initialize Theme
  setTheme(getTheme());

  const toggleThemeHandler = () => {
    const currentTheme = getTheme();
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  if (themeToggle) themeToggle.addEventListener('click', toggleThemeHandler);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleThemeHandler);

  // --- 4. Portfolio Filter System ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        // Custom scale/fade out and in transition
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          gsap.fromTo(item, 
            { opacity: 0, scale: 0.8 }, 
            { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out', clearProps: 'all' }
          );
        } else {
          gsap.to(item, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
              item.style.display = 'none';
            }
          });
        }
      });
    });
  });

  // --- 5. Testimonial Slider System ---
  const testimonials = [
    {
      quote: "Kualitas pengerjaan kusen pintu dari Eka Karya benar-benar presisi. Sudut-sudut sambungan kayu sangat rapi, dan finishing serat kayunya menonjolkan kemewahan jati alami. Sangat direkomendasikan untuk proyek arsitektur kelas atas.",
      author: "Ar. Baskoro Hadi",
      title: "Principal Architect, Studio Arch-D"
    },
    {
      quote: "Pooldeck kayu ulin yang dipasang di kolam renang villa kami di Ubud sampai sekarang tetap kokoh dan warnanya makin eksotis setelah di-coating berkala oleh Eka Karya. Kerja mereka cepat, bersih, dan profesional.",
      author: "Ibu Kadek Wulandari",
      title: "Owner, Wulan Tropical Villas Bali"
    },
    {
      quote: "Sangat puas dengan pemasangan lambersering kayu kamper untuk langit-langit penthouse kami. Ruangan terasa jauh lebih hangat dan mewah. Pelayanannya prima, dari awal konsultasi hingga akhir pemasangan.",
      author: "Bapak Hendra Wijaya",
      title: "Direktur PT Mahakarya Land"
    }
  ];

  let currentTestimonialIndex = 0;
  const quoteText = document.getElementById('testimonial-quote-text');
  const authorName = document.getElementById('testimonial-author-name');
  const authorTitle = document.getElementById('testimonial-author-title');
  const prevBtn = document.getElementById('prev-testi-btn');
  const nextBtn = document.getElementById('next-testi-btn');

  const updateTestimonial = (index) => {
    const card = document.getElementById('active-testimonial');
    if (!card) return;

    gsap.to(card, {
      opacity: 0,
      y: -10,
      duration: 0.3,
      onComplete: () => {
        quoteText.textContent = `"${testimonials[index].quote}"`;
        authorName.textContent = testimonials[index].author;
        authorTitle.textContent = testimonials[index].title;
        
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    });
  };

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
      updateTestimonial(currentTestimonialIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
      updateTestimonial(currentTestimonialIndex);
    });
  }

  // --- 6. Form Submission Handling ---
  const contactForm = document.getElementById('quote-request-form');
  const successMessage = document.getElementById('form-success-message');

  if (contactForm && successMessage) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate form submission
      gsap.to(contactForm, {
        opacity: 0,
        y: 10,
        duration: 0.4,
        onComplete: () => {
          contactForm.style.display = 'none';
          successMessage.style.display = 'block';
          gsap.fromTo(successMessage, 
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
          );
        }
      });
    });
  }

  // --- 7. GSAP ScrollTrigger Animations ---
  // Ensure GSAP and ScrollTrigger are loaded
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Dynamic ambient light cursor effect
    window.addEventListener('mousemove', (e) => {
      const blob1 = document.getElementById('ambient-blob-1');
      const blob2 = document.getElementById('ambient-blob-2');
      if (blob1 && blob2) {
        gsap.to(blob1, {
          x: (e.clientX - window.innerWidth / 2) * 0.1,
          y: (e.clientY - window.innerHeight / 2) * 0.1,
          duration: 2,
          ease: 'power1.out'
        });
        gsap.to(blob2, {
          x: (e.clientX - window.innerWidth / 2) * -0.05,
          y: (e.clientY - window.innerHeight / 2) * -0.05,
          duration: 2,
          ease: 'power1.out'
        });
      }
    });

    // Hero Section Animations
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });
    
    heroTl.fromTo('.reveal-fade-left', 
      { opacity: 0, x: -30 }, 
      { opacity: 1, x: 0, stagger: 0.15, delay: 0.2 }
    );
    
    heroTl.fromTo('.reveal-fade-right', 
      { opacity: 0, x: 30, scale: 0.95 }, 
      { opacity: 1, x: 0, scale: 1, duration: 1 }, 
      '-=0.8'
    );

    // Scroll Reveal for sections and cards
    const revealElements = document.querySelectorAll('.reveal-fade');
    revealElements.forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Scroll Reveal for elements coming from left
    const revealLeft = document.querySelectorAll('.reveal-fade-left-scroll');
    revealLeft.forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }
});
