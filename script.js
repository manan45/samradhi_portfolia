// Canvas-like Creative Portfolio JavaScript
class CreativePortfolio {
    constructor() {
        this.mouse = { x: 0, y: 0 };
        this.particles = [];
        this.isLoaded = false;
        this.init();
    }

    init() {
        this.setupLoading();
        this.setupParticleSystem();
        this.setup3DBackground();
        this.setupMouseInteractions();
        this.setupScrollAnimations();
        this.setupNavigation();
        this.setupMagneticElements();
        this.setupTypewriter();
        this.startAnimationLoop();
    }

    setupLoading() {
        const loadingScreen = document.getElementById('loading-experience');
        const progressLine = document.querySelector('.progress-line');
        
        setTimeout(() => {
            if (progressLine) progressLine.style.width = '100%';
        }, 500);

        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                this.isLoaded = true;
                this.startPageAnimations();
            }
        }, 3500);
    }

    startPageAnimations() {
        this.animateSplitText();
        this.animateStoryCards();
        this.generateParticles();
    }

    setupParticleSystem() {
        this.particleContainer = document.getElementById('particles');
        this.particleCount = 0;
        this.maxParticles = 50;
    }

    generateParticles() {
        if (!this.isLoaded) return;
        
        if (this.particleCount < this.maxParticles) {
            const particle = this.createParticle();
            this.particleContainer.appendChild(particle);
            this.particleCount++;
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                    this.particleCount--;
                }
            }, 20000);
        }
        
        setTimeout(() => this.generateParticles(), 500);
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const startX = Math.random() * window.innerWidth;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 10 + 15;
        
        particle.style.cssText = `
            left: ${startX}px;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${duration}s;
            background: ${this.getRandomColor()};
        `;
        
        return particle;
    }

    getRandomColor() {
        const colors = ['#00d9ff', '#6366f1', '#ec4899', '#8b5cf6'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    setup3DBackground() {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas || !window.THREE) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);

        this.create3DShapes();
        this.camera.position.z = 5;
        this.animate3D();
    }

    create3DShapes() {
        if (!window.THREE) return;

        const geometries = [
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.SphereGeometry(0.3, 16, 16),
            new THREE.ConeGeometry(0.3, 0.8, 8)
        ];

        const materials = [
            new THREE.MeshBasicMaterial({ color: 0x00d9ff, wireframe: true }),
            new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true }),
            new THREE.MeshBasicMaterial({ color: 0xec4899, wireframe: true })
        ];

        this.shapes3D = [];

        for (let i = 0; i < 12; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.x = (Math.random() - 0.5) * 20;
            mesh.position.y = (Math.random() - 0.5) * 20;
            mesh.position.z = (Math.random() - 0.5) * 20;
            
            this.scene.add(mesh);
            this.shapes3D.push(mesh);
        }
    }

    animate3D() {
        if (!this.renderer || !this.scene || !this.camera) return;

        requestAnimationFrame(() => this.animate3D());

        this.shapes3D?.forEach((shape, index) => {
            shape.rotation.x += 0.001 * (index + 1);
            shape.rotation.y += 0.002 * (index + 1);
            shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
        });

        if (this.camera) {
            this.camera.position.x += (this.mouse.x * 0.01 - this.camera.position.x) * 0.05;
            this.camera.position.y += (-this.mouse.y * 0.01 - this.camera.position.y) * 0.05;
            this.camera.lookAt(this.scene.position);
        }

        this.renderer.render(this.scene, this.camera);
    }

    setupMouseInteractions() {
        const mouseFollower = document.querySelector('.mouse-follower');
        
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            
            if (mouseFollower) {
                mouseFollower.style.left = e.clientX - 20 + 'px';
                mouseFollower.style.top = e.clientY - 20 + 'px';
            }
        });

        const interactiveElements = document.querySelectorAll('.magnetic, .metric-orb, .story-card, .nav-link');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (mouseFollower) mouseFollower.classList.add('active');
            });
            
            el.addEventListener('mouseleave', () => {
                if (mouseFollower) mouseFollower.classList.remove('active');
            });
        });
    }

    setupMagneticElements() {
        const magneticElements = document.querySelectorAll('.magnetic');
        
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    if (entry.target.classList.contains('story-card')) {
                        this.animateStoryCard(entry.target);
                    }
                    
                    if (entry.target.classList.contains('achievement-node')) {
                        this.animateAchievementNode(entry.target);
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.story-card, .achievement-node, .section-badge').forEach(el => {
            observer.observe(el);
        });

        window.addEventListener('scroll', () => {
            this.handleParallaxScroll();
            this.updateNavigation();
        });
    }

    handleParallaxScroll() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.morphing-bg, .section-bg-animation');
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });

        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }

    updateNavigation() {
        const nav = document.querySelector('.nav');
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    setupNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    setupTypewriter() {
        const typewriterElements = document.querySelectorAll('.typewriter');
        
        typewriterElements.forEach(el => {
            const text = el.dataset.text || el.textContent;
            el.textContent = '';
            el.style.borderRight = '2px solid #00d9ff';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    el.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                    setTimeout(() => {
                        el.style.borderRight = 'none';
                    }, 1000);
                }
            }, 100);
        });
    }

    animateSplitText() {
        const splitTextElements = document.querySelectorAll('.split-text');
        
        splitTextElements.forEach(el => {
            const text = el.textContent;
            el.innerHTML = '';
            
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.animationDelay = `${index * 0.05}s`;
                el.appendChild(span);
            });
        });
    }

    animateStoryCards() {
        const storyCards = document.querySelectorAll('.story-card');
        
        storyCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) translateX(0)';
            }, index * 300);
        });
    }

    animateStoryCard(card) {
        const icon = card.querySelector('.card-icon');
        if (icon) {
            icon.style.animation = 'icon-bounce 0.6s ease-out';
        }
        this.createParticleBurst(card);
    }

    animateAchievementNode(node) {
        const value = node.querySelector('.node-value');
        if (value) {
            const finalValue = value.textContent;
            const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
            const suffix = finalValue.replace(/[\d.]/g, '');
            
            let current = 0;
            const increment = numericValue / 60;
            
            const countAnimation = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    current = numericValue;
                    clearInterval(countAnimation);
                }
                value.textContent = Math.floor(current) + suffix;
            }, 16);
        }
    }

    createParticleBurst(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #00d9ff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${centerX}px;
                top: ${centerY}px;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (i / 8) * Math.PI * 2;
            const distance = 100;
            const targetX = centerX + Math.cos(angle) * distance;
            const targetY = centerY + Math.sin(angle) * distance;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${targetX - centerX}px, ${targetY - centerY}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                document.body.removeChild(particle);
            };
        }
    }

    startAnimationLoop() {
        const animate = () => {
            this.updateMetricOrbs();
            this.updateFloatingShapes();
            requestAnimationFrame(animate);
        };
        animate();
    }

    updateMetricOrbs() {
        const metricOrbs = document.querySelectorAll('.metric-orb');
        
        metricOrbs.forEach((orb, index) => {
            const time = Date.now() * 0.001;
            const offset = index * 0.5;
            
            const ring = orb.querySelector('.orb-ring');
            if (ring) {
                ring.style.transform = `scale(${1 + Math.sin(time + offset) * 0.1})`;
            }
        });
    }

    updateFloatingShapes() {
        const shapes = document.querySelectorAll('.floating-shapes .shape');
        
        shapes.forEach((shape, index) => {
            const time = Date.now() * 0.001;
            const offset = index * 0.8;
            
            const x = Math.sin(time + offset) * 20;
            const y = Math.cos(time * 0.8 + offset) * 15;
            const rotation = time * 30 + offset * 45;
            
            shape.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
        });
    }

    handleResize() {
        if (this.renderer && this.camera) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new CreativePortfolio();
    
    window.addEventListener('resize', () => {
        portfolio.handleResize();
    });
    
    const contactForm = document.querySelector('.form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = contactForm.querySelector('input[type="text"]')?.value;
            const email = contactForm.querySelector('input[type="email"]')?.value;
            const message = contactForm.querySelector('textarea')?.value;
            
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            showNotification('Thank you! Your message has been sent.', 'success');
            contactForm.reset();
        });
    }
    
    const exploreBtn = document.querySelector('.btn-primary');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            const portfolioSection = document.querySelector('#portfolio');
            if (portfolioSection) {
                portfolioSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        backdrop-filter: blur(20px);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, 3000);
}

// Scroll-triggered animations
window.addEventListener('scroll', () => {
    const scrollProgress = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
    
    const scrollLine = document.querySelector('.scroll-line');
    if (scrollLine) {
        scrollLine.style.opacity = Math.max(0, 1 - scrollProgress * 3);
    }
}, { passive: true });

// Easter egg - Konami code
let konamiCode = '';
const konami = '38384040373937396665';
document.addEventListener('keydown', (e) => {
    konamiCode += e.keyCode;
    if (konamiCode.length > konami.length) {
        konamiCode = konamiCode.slice(-konami.length);
    }
    if (konamiCode === konami) {
        document.body.style.filter = 'hue-rotate(180deg)';
        showNotification('🎉 Party mode activated!', 'success');
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 5000);
    }
});
