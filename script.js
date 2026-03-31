// Coupang Clone - Mobile First JavaScript v3
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Search Form =====
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                alert('검색어: ' + query);
            } else {
                searchInput.focus();
            }
        });
    }

    // ===== Banner Slider =====
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.banner-dots .dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
        });
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    function startAutoRotate() {
        slideInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoRotate() {
        clearInterval(slideInterval);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoRotate();
            startAutoRotate();
        });
    });

    // Touch swipe for banner
    const bannerSlider = document.querySelector('.banner-slider');
    let touchStartX = 0;
    let touchEndX = 0;

    if (bannerSlider) {
        bannerSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        bannerSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                stopAutoRotate();
                startAutoRotate();
            }
        }

        // Pause on hover
        bannerSlider.addEventListener('mouseenter', stopAutoRotate);
        bannerSlider.addEventListener('mouseleave', startAutoRotate);
    }

    // Start auto-rotation
    startAutoRotate();

    // ===== Cart & Login =====
    const actionIcons = document.querySelectorAll('.action-icon');
    actionIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const title = this.getAttribute('title');
            alert(title + ' 기능은 데모 버전에서 지원되지 않습니다.');
        });
    });

    // ===== Quick Menu Items =====
    const quickItems = document.querySelectorAll('.quick-item');
    quickItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.querySelector('span').textContent;
            alert(text + ' 기능은 데모 버전에서 지원되지 않습니다.');
        });
    });

    // ===== Discovery Cards =====
    const discoveryCards = document.querySelectorAll('.discovery-card a');
    discoveryCards.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('상품 상세 페이지는 데모 버전에서 지원되지 않습니다.');
        });
    });

    // ===== Ads Items =====
    const adsItems = document.querySelectorAll('.ads-link');
    adsItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('상품 상세 페이지는 데모 버전에서 지원되지 않습니다.');
        });
    });

    // ===== Go to Top Button =====
    const goTopBtn = document.querySelector('.go-top');
    
    function toggleGoTop() {
        if (window.pageYOffset > 300) {
            goTopBtn.classList.add('visible');
        } else {
            goTopBtn.classList.remove('visible');
        }
    }

    if (goTopBtn) {
        window.addEventListener('scroll', toggleGoTop);
        
        goTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== Footer Links =====
    const footerLinks = document.querySelectorAll('.footer-links a, .footer-sns a, .license-link, .call-center');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('데모 버전에서는 지원되지 않습니다.');
        });
    });

    // ===== Image Lazy Loading =====
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    observer.unobserve(entry.target);
                }
            });
        });

        images.forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            imageObserver.observe(img);
        });
    }

    // ===== Debounce Scroll =====
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    const debouncedScroll = debounce(toggleGoTop, 100);
    window.removeEventListener('scroll', toggleGoTop);
    window.addEventListener('scroll', debouncedScroll);

    // ===== Console =====
    console.log('%c🛒 Coupang Mobile Clone v3', 'color: #346aff; font-size: 20px; font-weight: bold;');
    console.log('%c모바일 최적화 완료!', 'color: #28a745; font-size: 14px;');
});
