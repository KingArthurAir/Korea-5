/**
 * ============================================
 * Love-Me 网站复刻 - 主脚本
 * 功能：飘心动画、筛选交互、滚动效果
 * ============================================
 */

// ============================================
// 配置
// ============================================
const CONFIG = {
    hearts: {
        enabled: true,
        interval: 400,
        emojis: ['💕', '💖', '💗', '💓', '💞', '', '❤️', ''],
        minSize: 12,
        maxSize: 28,
        minDuration: 10,
        maxDuration: 18
    }
};

// ============================================
// 飘心动画系统
// ============================================
class HeartSystem {
    constructor(containerId, config) {
        this.container = document.getElementById(containerId);
        this.config = config;
        this.hearts = [];
        
        if (this.config.enabled) {
            this.start();
        }
    }

    /**
     * 创建爱心
     */
    createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = this.getRandomEmoji();
        
        const size = this.randomRange(this.config.minSize, this.config.maxSize);
        const left = Math.random() * 100;
        const duration = this.randomRange(this.config.minDuration, this.config.maxDuration);
        
        heart.style.cssText = `
            left: ${left}%;
            font-size: ${size}px;
            animation-duration: ${duration}s;
        `;
        
        this.container.appendChild(heart);
        this.hearts.push(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
            this.hearts = this.hearts.filter(h => h !== heart);
        }, duration * 1000);
    }

    getRandomEmoji() {
        return this.config.emojis[Math.floor(Math.random() * this.config.emojis.length)];
    }

    randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    start() {
        setInterval(() => this.createHeart(), this.config.interval);
    }
}

// ============================================
// 筛选按钮交互
// ============================================
class FilterController {
    constructor() {
        this.buttons = document.querySelectorAll('.filter-btn');
        this.selectedFilters = {
            age: 'all',
            fantasy: 'all',
            body: 'all'
        };
        
        this.init();
    }

    init() {
        this.buttons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterClick(e));
        });
    }

    handleFilterClick(e) {
        const btn = e.target;
        const filterType = btn.dataset.filter;
        const value = btn.dataset.value;
        
        // 更新选中状态
        this.buttons.forEach(b => {
            if (b.dataset.filter === filterType) {
                b.classList.remove('active');
            }
        });
        
        btn.classList.add('active');
        
        // 保存选中值
        this.selectedFilters[filterType] = value;
        
        console.log('当前筛选:', this.selectedFilters);
        
        // 这里可以添加实际的筛选逻辑
        // this.applyFilters();
    }

    applyFilters() {
        // 示例：根据筛选条件过滤照片卡片
        const cards = document.querySelectorAll('.gallery-card, .photo-card');
        
        cards.forEach(card => {
            // 这里添加筛选逻辑
            // 目前只是示例
            console.log('应用筛选:', this.selectedFilters);
        });
    }
}

// ============================================
// 照片灯箱效果
// ============================================
class PhotoLightbox {
    constructor() {
        this.cards = document.querySelectorAll('.gallery-card, .photo-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('click', (e) => {
                const img = card.querySelector('img');
                if (img) {
                    this.show(img.src);
                }
            });
        });
    }

    show(imageSrc) {
        // 创建灯箱
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;

        const img = document.createElement('img');
        img.src = imageSrc;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
        `;

        lightbox.appendChild(img);

        // 点击关闭
        lightbox.addEventListener('click', () => {
            lightbox.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => lightbox.remove(), 300);
        });

        document.body.appendChild(lightbox);
    }
}

// ============================================
// 滚动动画
// ============================================
class ScrollAnimations {
    constructor() {
        this.sections = document.querySelectorAll('.hero-section, .gallery-section, .features-section, .bottom-cta-section');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        this.sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.8s ease';
            observer.observe(section);
        });
    }
}

// ============================================
// 按钮点击效果
// ============================================
class ButtonEffects {
    constructor() {
        this.buttons = document.querySelectorAll('.btn-cta, .btn-header');
        this.init();
    }

    init() {
        this.buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // 添加点击波纹效果
                this.createRipple(e, btn);
                
                // 示例：可以添加下载链接或其他操作
                // window.location.href = 'download-link';
            });
        });
    }

    createRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }
}

// ============================================
// 头部滚动效果
// ============================================
class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScroll = 0;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                this.header.style.background = 'rgba(10, 6, 16, 0.95)';
                this.header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
            } else {
                this.header.style.background = 'rgba(10, 6, 16, 0.8)';
                this.header.style.boxShadow = 'none';
            }
            
            this.lastScroll = currentScroll;
        });
    }
}

// ============================================
// 照片卡片悬停效果增强
// ============================================
class PhotoCardEffects {
    constructor() {
        this.cards = document.querySelectorAll('.photo-card, .gallery-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.zIndex = '10';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.zIndex = '';
            });
        });
    }
}

// ============================================
// 页面加载完成初始化
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('💕 Love-Me Clone 已加载');
    
    // 1. 初始化飘心系统
    const hearts = new HeartSystem('hearts-container', CONFIG.hearts);
    
    // 2. 初始化筛选控制器
    const filters = new FilterController();
    
    // 3. 初始化照片灯箱
    const lightbox = new PhotoLightbox();
    
    // 4. 初始化滚动动画
    const scrollAnim = new ScrollAnimations();
    
    // 5. 初始化按钮效果
    const buttonEffects = new ButtonEffects();
    
    // 6. 初始化头部滚动效果
    const headerScroll = new HeaderScroll();
    
    // 7. 初始化照片卡片效果
    const photoEffects = new PhotoCardEffects();
    
    // 添加灯箱动画样式
    this.addAnimationsStyles();
});

/**
 * 添加动画样式
 */
function addAnimationsStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// 工具函数
// ============================================

/**
 * 平滑滚动到元素
 */
function scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * 本地存储工具
 */
const Storage = {
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('LocalStorage 不可用');
        }
    },
    get(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (e) {
            return defaultValue;
        }
    },
    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {}
    }
};

// ============================================
// 自定义功能扩展点
// ============================================

/**
 * 示例：添加用户数据追踪
 */
function trackUserInteraction(action, data = {}) {
    console.log('用户行为:', action, data);
    // 可以集成分析工具
}

/**
 * 示例：下载 APP 逻辑
 */
function handleDownload() {
    // 根据设备类型提供不同下载链接
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    if (isIOS) {
        window.location.href = 'https://apps.apple.com/your-app';
    } else if (isAndroid) {
        window.location.href = 'https://play.google.com/store/apps/details?id=your.app';
    } else {
        // PC 端显示二维码或其他
        console.log('PC 端用户，显示二维码');
    }
    
    trackUserInteraction('download_click', { platform: isIOS ? 'iOS' : isAndroid ? 'Android' : 'PC' });
}

// 导出供外部使用
window.HeartSystem = HeartSystem;
window.FilterController = FilterController;
window.PhotoLightbox = PhotoLightbox;
