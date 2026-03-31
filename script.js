// Coupang Clone - Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Search Form =====
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                console.log('검색어:', query);
                alert('검색 기능은 데모 버전에서 지원되지 않습니다.\n검색어: ' + query);
            } else {
                searchInput.focus();
            }
        });
    }

    // ===== Category Button =====
    const categoryBtn = document.querySelector('.category-btn');
    if (categoryBtn) {
        categoryBtn.addEventListener('click', function() {
            alert('카테고리 메뉴는 데모 버전에서 지원되지 않습니다.');
        });
    }

    // ===== Hot Slider =====
    const thumbnails = document.querySelectorAll('.hot-thumbnails img');
    const hotBg = document.querySelector('.hot-bg');
    const bgImages = [
        'https://static.coupangcdn.com/image/ccm/banner/a19d8a7b74af0acae587e3ce70e9f985.png',
        'https://static.coupangcdn.com/wa/cmg_paperboy/image/1774597466404/1920_450.jpg',
        'https://img5a.coupangcdn.com/image/ccm/banner/e9576e56f432bb3a2197b3b44dc4212b.jpg',
        'https://img5a.coupangcdn.com/image/ccm/banner/dcf42b31f18d0986c0905e1a35857752.jpg',
        'https://static.coupangcdn.com/ia/cmg_paperboy/image/1774847475110/C1_PC-2.jpg',
        'https://static.coupangcdn.com/qa/cmg_paperboy/image/1774856481180/Untitled-1.jpg'
    ];

    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            // Update active state
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Change background
            if (hotBg && bgImages[index]) {
                hotBg.style.backgroundImage = `url('${bgImages[index]}')`;
            }
        });
    });

    // Auto-rotate hot slider
    let currentSlide = 2;
    const activeThumbnail = document.querySelector('.hot-thumbnails img.active');
    if (activeThumbnail) {
        currentSlide = parseInt(activeThumbnail.dataset.index) || 2;
    }

    function rotateSlide() {
        currentSlide = (currentSlide + 1) % bgImages.length;
        const newActive = document.querySelector(`.hot-thumbnails img[data-index="${currentSlide}"]`);
        if (newActive) {
            newActive.click();
        }
    }

    // Start auto-rotation (every 5 seconds)
    const slideInterval = setInterval(rotateSlide, 5000);

    // Pause on hover
    const hotSlider = document.querySelector('.hot-slider');
    if (hotSlider) {
        hotSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        hotSlider.addEventListener('mouseleave', () => {
            // Restart interval
        });
    }

    // ===== Cart Functionality =====
    const cartBtn = document.querySelector('.menu-item.cart');
    if (cartBtn) {
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('장바구니 기능은 데모 버전에서 지원되지 않습니다.');
        });
    }

    // ===== My Coupang =====
    const myCoupangBtn = document.querySelector('.menu-item:first-child');
    if (myCoupangBtn) {
        myCoupangBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('마이쿠팡 기능은 데모 버전에서 지원되지 않습니다.');
        });
    }

    // ===== Quick Menu Items =====
    const quickItems = document.querySelectorAll('.quick-item');
    quickItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.querySelector('span:last-child').textContent;
            alert(text + ' 기능은 데모 버전에서 지원되지 않습니다.');
        });
    });

    // ===== Discovery Items =====
    const discoveryLinks = document.querySelectorAll('.discovery-link');
    discoveryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('상품 상세 페이지는 데모 버전에서 지원되지 않습니다.');
        });
    });

    // ===== Ads Items =====
    const adsLinks = document.querySelectorAll('.ads-link');
    adsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('상품 상세 페이지는 데모 버전에서 지원되지 않습니다.');
        });
    });

    // ===== Carousel Navigation =====
    const carousel = document.querySelector('.ads-carousel');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (carousel && prevBtn && nextBtn) {
        const scrollAmount = 250;

        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        // Update button states
        function updateCarouselButtons() {
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            
            prevBtn.disabled = carousel.scrollLeft <= 0;
            nextBtn.disabled = carousel.scrollLeft >= maxScroll - 10;
        }

        carousel.addEventListener('scroll', updateCarouselButtons);
        updateCarouselButtons();
    }

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
            const text = this.textContent.trim() || '이 링크';
            alert(text + '는 데모 버전에서 지원되지 않습니다.');
        });
    });

    // ===== Search Input Focus Effect =====
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    }

    // ===== Keyboard Navigation =====
    document.addEventListener('keydown', function(e) {
        // ESC to close any open menus (future feature)
        if (e.key === 'Escape') {
            // Close menus logic here
        }
        
        // Enter to search
        if (e.key === 'Enter' && document.activeElement === searchInput) {
            searchForm.dispatchEvent(new Event('submit'));
        }
    });

    // ===== Touch Support for Carousel =====
    let touchStartX = 0;
    let touchEndX = 0;

    if (carousel) {
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - show next
                    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                } else {
                    // Swipe right - show previous
                    carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
            }
        }
    }

    // ===== Lazy Loading for Images =====
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ===== Performance: Debounce Scroll Events =====
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

    // ===== Console Welcome =====
    console.log('%c🛒 Coupang Clone', 'color: #346aff; font-size: 20px; font-weight: bold;');
    console.log('%c환영합니다! 데모 버전이 로드되었습니다.', 'color: #666; font-size: 12px;');
    console.log('%c기능 제한: 실제 구매, 로그인, 검색 등은 지원되지 않습니다.', 'color: #999; font-size: 11px;');
});

// ===== Utility Functions =====
const Utils = {
    // Format price
    formatPrice: function(price) {
        return new Intl.NumberFormat('ko-KR').format(price) + '원';
    },
    
    // Truncate text
    truncate: function(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};
