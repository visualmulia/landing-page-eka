document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Mobile Menu Toggle ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-nav-menu');
  const mobileMenuLinks = document.querySelectorAll('#mobile-nav-menu a');

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
  const filterButtons = document.querySelectorAll('.portfolio-filters .filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (filterValue === 'all' || itemCategory.split(' ').includes(filterValue)) {
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
      quote: "Kualitas pengerjaan kusen pintu dari Pak Eka benar-benar presisi. Sudut-sudut sambungan kayu sangat rapi, dan finishing serat kayunya menonjolkan kemewahan jati alami. Sangat direkomendasikan untuk proyek arsitektur kelas atas.",
      author: "Ar. Baskoro Hadi",
      title: "Principal Architect, Studio Arch-D"
    },
    {
      quote: "Pooldeck kayu ulin yang dipasang di kolam renang villa kami di Ubud sampai sekarang tetap kokoh dan warnanya makin eksotis setelah di-coating berkala oleh Pak Eka. Kerja tim beliau cepat, bersih, dan profesional.",
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
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
      updateTestimonial(currentTestimonialIndex);
    });

    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
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

    // Mouse-move ambient blob light glow effect (Desktop fine pointers only)
    if (window.matchMedia('(pointer: fine)').matches) {
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
    }

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

    // Hero background slider cycle logic
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
      let currentSlide = 0;
      setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
      }, 5000);
    }
    // --- 7. Portfolio Lightbox Modal (popup & slider) ---
    const portfolioData = {
      'portfolio-item-1': {
        title: 'Villa Alaya - Petitenget, Bali',
        category: 'Pooldeck, Lambersering & Pintu',
        year: '2026',
        images: [
          'assets/alaya_pool.jpg',
          'assets/alaya_living.png',
          'assets/alaya_dining.png',
          'assets/alaya_bedroom.png',
          'assets/alaya_room.png'
        ],
        desc: 'Proyek prestisius di Villa Alaya, Petitenget, Bali yang menggabungkan kekuatan struktur konstruksi dengan keindahan kayu premium. Pekerjaan komprehensif ini meliputi pemasangan ceiling lambersering kayu ulin pada area plafon interior dan semi-terbuka, pemasangan lantai pooldeck eksterior berbahan ulin Kalimantan tahan cuaca ekstrem di sekitar kolam renang, serta pabrikasi dan instalasi pintu kayu solid kustom dengan presisi tinggi.',
        metricVal1: '2026',
        metricLbl1: 'Tahun Proyek',
        metricVal2: 'Ulin & Jati',
        metricLbl2: 'Material Utama'
      },
      'portfolio-item-2': {
        title: 'Villa Wisnu - Kerobokan, Bali',
        category: 'Facade, Pooldeck & Pintu',
        year: '2026',
        images: [
          'assets/wisnu_pool_night.jpg',
          'assets/wisnu_pool_day.jpg',
          'assets/wisnu_pergola.jpg'
        ],
        desc: 'Proyek pembangunan eksterior dan interior premium di Villa Wisnu, Kerobokan, Bali. Lingkup pengerjaan mencakup instalasi facade kisi-kisi (screen) kayu ulin Kalimantan vertikal yang memberikan privasi sekaligus estetika modern tropis, pemasangan lantai kolam renang (pooldeck) kayu ulin grade A dengan sambungan presisi dan ketahanan cuaca prima, serta pembuatan dan pemasangan pintu-pintu kayu jati solid kustom yang kokoh dan elegan.',
        metricVal1: '2026',
        metricLbl1: 'Tahun Proyek',
        metricVal2: 'Ulin Kalimantan',
        metricLbl2: 'Material Utama'
      },
      'portfolio-item-3': {
        title: 'Villa S-S - Petitenget, Bali',
        category: 'Facade, Railing & Pintu',
        year: '2026',
        images: [
          'assets/ss_facade.jpg',
          'assets/ss_door.jpg',
          'assets/ss_pergola.jpg',
          'assets/ss_railing.jpg',
          'assets/ss_entrance.jpg'
        ],
        desc: 'Proyek kontemporer di Villa S-S, Petitenget, Bali. Lingkup pengerjaan meliputi perancangan dan pemasangan facade kisi-kisi pelindung dari kayu Bengkirai premium yang tahan cuaca, railing kayu minimalis yang dipadukan dengan struktur kaca tempered, pergola kayu estetis untuk pencahayaan alami di koridor lantai atas, serta pembuatan pintu kayu solid bermotif garis vertikal dengan finishing warna teak alami.',
        metricVal1: '2026',
        metricLbl1: 'Tahun Proyek',
        metricVal2: 'Bengkirai & Jati',
        metricLbl2: 'Material Utama'
      },
      'portfolio-item-4': {
        title: 'Villa Semilir, Cemagi - Bali',
        category: 'Facade & Cladding',
        year: '2026',
        images: [
          'assets/semilir_pool.jpg',
          'assets/semilir_street.jpg'
        ],
        desc: 'Proyek fasad eksterior modern tropis di Villa Semilir, Cemagi, Bali. Pekerjaan berfokus pada pemasangan cladding facade luar ruangan berskala besar menggunakan kayu ulin Kalimantan pilihan. Permukaan kayu dibiarkan mengalami proses oksidasi alami (weathering) hingga menghasilkan warna abu-abu keperakan (weathered gray) yang eksotis, selaras dengan karakter arsitektur beton ekspos dan lanskap pesisir pantai Cemagi.',
        metricVal1: '2026',
        metricLbl1: 'Tahun Proyek',
        metricVal2: 'Ulin Kalimantan',
        metricLbl2: 'Material Utama'
      },
      'portfolio-item-5': {
        title: 'Villa Ibu Juli - Singaraja, Bali',
        category: 'Cladding, Pooldeck & Ceiling',
        year: '2025',
        images: [
          'assets/juli_double_shower.jpg',
          'assets/juli_shower_tree.jpg',
          'assets/juli_entrance.jpg',
          'assets/juli_ceiling.jpg'
        ],
        desc: 'Proyek pengerjaan interior dan eksterior mewah di Villa Ibu Juli, Singaraja, Bali. Lingkup pengerjaan meliputi pemasangan cladding wall panel kayu jati solid untuk kesan ruangan yang hangat dan natural, pengerjaan lantai kolam renang (pooldeck) kayu ulin Kalimantan grade A yang tahan air dan cuaca lembap, serta instalasi plafon (ceiling) kayu Bengkirai dengan rakitan presisi tinggi.',
        metricVal1: '2025',
        metricLbl1: 'Tahun Proyek',
        metricVal2: 'Ulin, Jati & Bengkirai',
        metricLbl2: 'Material Utama'
      },
      'portfolio-item-6': {
        title: 'Outdoor Teras Bengkirai',
        category: 'Pooldeck & Decking',
        year: '2026',
        images: [
          'assets/pooldeck.png',
          'assets/luxury_wood_decking.png'
        ],
        desc: 'Decking teras balkon luar ruangan dengan kayu bengkirai yang kokoh dan tahan lama. Dipasang dengan finishing anti-slip bertingkat untuk menunjang keamanan di area rawan basah.',
        metricVal1: 'Bengkirai',
        metricLbl1: 'Karakter Kayu',
        metricVal2: 'Anti-Slip',
        metricLbl2: 'Sistem Struktur'
      }
    };

    const showcaseModal = document.getElementById('showcaseModal');
    const showcaseClose = document.getElementById('showcaseClose');
    const scPrevBtn = document.getElementById('scPrevBtn');
    const scNextBtn = document.getElementById('scNextBtn');
    const scMainImg = document.getElementById('scMainImg');
    const scDotsContainer = document.getElementById('scDotsContainer');
    const scBadge = document.getElementById('scBadge');
    const scYear = document.getElementById('scYear');
    const scTitle = document.getElementById('scTitle');
    const scDesc = document.getElementById('scDesc');
    const scVal1 = document.getElementById('scVal1');
    const scLbl1 = document.getElementById('scLbl1');
    const scVal2 = document.getElementById('scVal2');
    const scLbl2 = document.getElementById('scLbl2');
    const scWaBtn = document.getElementById('scWaBtn');

    let currentItemData = null;
    let currentSlideIndex = 0;

    // Attach click events to static portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
      item.addEventListener('click', () => {
        const itemId = item.getAttribute('id');
        const data = portfolioData[itemId];
        if (data) {
          openModal(data);
        }
      });
    });

    function openModal(data) {
      currentItemData = data;
      currentSlideIndex = 0;

      // Preload images in background
      if (data.images && Array.isArray(data.images)) {
        data.images.forEach(src => {
          const preImg = new Image();
          preImg.src = src;
        });
      }

      // Populate modal content
      scBadge.textContent = data.category;
      scYear.textContent = data.year;
      scTitle.textContent = data.title;
      scDesc.innerHTML = data.desc;
      scVal1.textContent = data.metricVal1;
      scLbl1.textContent = data.metricLbl1;
      scVal2.textContent = data.metricVal2;
      scLbl2.textContent = data.metricLbl2;

      renderCarousel();
      if (showcaseModal) showcaseModal.classList.add('active');
    }

    function renderCarousel() {
      if (!currentItemData) return;
      const images = currentItemData.images || [];
      scMainImg.src = images[currentSlideIndex] || images[0];

      scDotsContainer.innerHTML = '';
      if (images.length > 1) {
        if (scPrevBtn) scPrevBtn.style.display = 'flex';
        if (scNextBtn) scNextBtn.style.display = 'flex';
        scDotsContainer.style.display = 'flex';

        images.forEach((_, idx) => {
          const dot = document.createElement('div');
          dot.className = `dot-item ${idx === currentSlideIndex ? 'active' : ''}`;
          dot.addEventListener('click', () => {
            currentSlideIndex = idx;
            renderCarousel();
          });
          scDotsContainer.appendChild(dot);
        });
      } else {
        if (scPrevBtn) scPrevBtn.style.display = 'none';
        if (scNextBtn) scNextBtn.style.display = 'none';
        scDotsContainer.style.display = 'none';
      }
    }

    function nextSlide() {
      if (!currentItemData) return;
      const images = currentItemData.images || [];
      if (images.length <= 1) return;
      currentSlideIndex = (currentSlideIndex + 1) % images.length;
      renderCarousel();
    }

    function prevSlide() {
      if (!currentItemData) return;
      const images = currentItemData.images || [];
      if (images.length <= 1) return;
      currentSlideIndex = (currentSlideIndex - 1 + images.length) % images.length;
      renderCarousel();
    }

    if (scNextBtn) scNextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextSlide(); });
    if (scPrevBtn) scPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevSlide(); });
    if (scMainImg) scMainImg.addEventListener('click', () => { nextSlide(); });

    // Close actions
    if (showcaseClose && showcaseModal) {
      showcaseClose.addEventListener('click', () => {
        showcaseModal.classList.remove('active');
      });

      showcaseModal.addEventListener('click', (e) => {
        if (e.target === showcaseModal) {
          showcaseModal.classList.remove('active');
        }
      });
    }

    // Touch Swipe Gesture for Mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const modalLeft = document.querySelector('.showcase-modal-left');

    if (modalLeft) {
      modalLeft.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      modalLeft.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 35) {
          if (diff < 0) nextSlide();
          else prevSlide();
        }
      }, { passive: true });
    }

    // WA button trigger
    if (scWaBtn) {
      scWaBtn.addEventListener('click', () => {
        if (currentItemData) {
          const number = '6281236090490';
          const text = encodeURIComponent(`Halo Eka Konstruksi, saya tertarik dengan proyek "${currentItemData.title}" (${currentItemData.category}) dan ingin berkonsultasi mengenai detail serupa.`);
          window.open(`https://wa.me/${number}?text=${text}`, '_blank');
        }
      });
    }
  }
});
