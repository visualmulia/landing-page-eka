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

  // --- 3. Portfolio Filter System ---
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
        
        if (filterValue === 'all' || itemCategory === filterValue) {
          // Animate items coming back
          item.style.display = 'block';
          gsap.fromTo(item, 
            { opacity: 0, scale: 0.8 }, 
            { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out', clearProps: 'transform,opacity' }
          );
        } else {
          // Animate items going away
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

  // --- 4. Testimonial Slider System ---
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

  // --- 5. Form Submission Handling ---
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

  // --- 6. GSAP ScrollTrigger Animations ---
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Mouse-move ambient blob light glow effect
    window.addEventListener('mousemove', (e) => {
      const blob1 = document.getElementById('ambient-blob-1');
      const blob2 = document.getElementById('ambient-blob-2');
      if (blob1 && blob2) {
        gsap.to(blob1, {
          x: (e.clientX - window.innerWidth / 2) * 0.08,
          y: (e.clientY - window.innerHeight / 2) * 0.08,
          duration: 1.5,
          ease: 'power1.out'
        });
        gsap.to(blob2, {
          x: (e.clientX - window.innerWidth / 2) * -0.04,
          y: (e.clientY - window.innerHeight / 2) * -0.04,
          duration: 1.5,
          ease: 'power1.out'
        });
      }
    });

    // Hero Section Entrance Timeline (Staggered)
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    
    const heroRevealElements = document.querySelectorAll('.hero-section .reveal-fade');
    if (heroRevealElements.length > 0) {
      heroTl.fromTo(heroRevealElements,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.12, delay: 0.15 }
      );
    }

    // General Scroll reveals for sections, subtitles, and cards (excluding hero)
    const revealElements = document.querySelectorAll('.reveal-fade:not(.hero-section .reveal-fade)');
    revealElements.forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Left slide in scroll reveals
    const revealLeft = document.querySelectorAll('.reveal-fade-left');
    revealLeft.forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Right slide in scroll reveals
    const revealRight = document.querySelectorAll('.reveal-fade-right');
    revealRight.forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Footer Spotlight cursor tracking
    const footer = document.querySelector('footer.site-footer');
    const footerGlow = document.getElementById('footer-spotlight');
    if (footer && footerGlow) {
      footer.addEventListener('mousemove', (e) => {
        const rect = footer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        gsap.to(footerGlow, {
          left: x,
          top: y,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out'
        });
      });

      footer.addEventListener('mouseleave', () => {
        gsap.to(footerGlow, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    }
  }
});
