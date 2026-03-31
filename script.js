// Coupang Clone - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Search form submission
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = this.querySelector('.search-input').value;
            if (query.trim()) {
                alert('검색 기능은 데모 버전에서 지원되지 않습니다.');
            }
        });
    }

    // Category button toggle
    const categoryBtn = document.querySelector('.category-btn');
    if (categoryBtn) {
        categoryBtn.addEventListener('click', function() {
            alert('카테고리 메뉴는 데모 버전에서 지원되지 않습니다.');
        });
    }

    // Hot slider thumbnails
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
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            if (hotBg) {
                hotBg.style.backgroundImage = `url('${bgImages[index]}')`;
            }
        });
    });

    // Cart functionality
    const cartBtn = document.querySelector('.menu-item.cart');
    if (cartBtn) {
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('장바구니 기능은 데모 버전에서 지원되지 않습니다.');
        });
    }

    // My Coupang
    const myCoupangBtn = document.querySelector('.menu-item:first-child');
    if (myCoupangBtn) {
        myCoupangBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('마이쿠팡 기능은 데모 버전에서 지원되지 않습니다.');
        });
    }

    // Quick menu items
    const quickItems = document.querySelectorAll('.quick-item');
    quickItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.querySelector('span').textContent;
            alert(text + ' 기능은 데모 버전에서 지원되지 않습니다.');
        });
    });

    // Discovery items
    const discoveryItems = document.querySelectorAll('.discovery-item a');
    discoveryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            alert('상품 상세 페이지는 데모 버전에서 지원되지 않습니다.');
        });
    });

    // Ads items
    const adsItems = document.querySelectorAll('.ads-item');
    adsItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            alert('상품 상세 페이지는 데모 버전에서 지원되지 않습니다.');
        });
    });

    // Footer links
    const footerLinks = document.querySelectorAll('.footer-links a, .footer-sns a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('이 링크는 데모 버전에서 지원되지 않습니다.');
        });
    });

    // Smooth scroll for go-to-top (if added)
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        if (scrollPosition > 300) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    });

    console.log('Coupang Clone loaded successfully!');
});
