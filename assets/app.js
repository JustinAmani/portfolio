import './styles/app.css';
 
// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
 
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
            }
        });
    }, observerOptions);
 
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
 
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
 
    // Navbar background on scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-dark/95', 'backdrop-blur-md', 'shadow-lg');
            } else {
                navbar.classList.remove('bg-dark/95', 'backdrop-blur-md', 'shadow-lg');
            }
        });
    }
 
    // Mobile menu toggle — support both id variants
    const menuBtn = document.getElementById('mobile-menu-btn') || document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Back-to-top button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.remove('opacity-0', 'pointer-events-none');
                backToTop.classList.add('opacity-100');
            } else {
                backToTop.classList.add('opacity-0', 'pointer-events-none');
                backToTop.classList.remove('opacity-100');
            }
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
 
    // Counter animation for stats
    document.querySelectorAll('.counter').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
 
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
 
        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                counterObserver.disconnect();
            }
        });
        counterObserver.observe(counter);
    });
 
    // Typing effect
    const typingEl = document.querySelector('.typing-text');
    if (typingEl) {
        const texts = JSON.parse(typingEl.dataset.texts || '[]');
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
 
        function type() {
            const currentText = texts[textIndex];
            if (isDeleting) {
                typingEl.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingEl.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
 
            let timeout = isDeleting ? 50 : 100;
 
            if (!isDeleting && charIndex === currentText.length) {
                timeout = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                timeout = 500;
            }
 
            setTimeout(type, timeout);
        }
 
        if (texts.length > 0) {
            type();
        }
    }
 
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<svg class="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Envoi...';
            btn.disabled = true;
 
            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                });
 
                const result = await response.json();
                const msgDiv = document.getElementById('form-message');
 
                if (result.success) {
                    msgDiv.className = 'mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400';
                    msgDiv.textContent = result.message;
                    contactForm.reset();
                } else {
                    msgDiv.className = 'mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400';
                    msgDiv.textContent = result.message;
                }
                msgDiv.classList.remove('hidden');
            } catch (error) {
                const msgDiv = document.getElementById('form-message');
                msgDiv.className = 'mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400';
                msgDiv.textContent = 'Une erreur est survenue. Veuillez réessayer.';
                msgDiv.classList.remove('hidden');
            } finally {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        });
    }
 
    // Particle background
    const canvas = document.getElementById('particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
 
        const particles = [];
        const particleCount = 50;
 
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
            }
 
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
 
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(108, 99, 255, ${this.opacity})`;
                ctx.fill();
            }
        }
 
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
 
        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(108, 99, 255, ${0.1 * (1 - distance / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }
 
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            requestAnimationFrame(animate);
        }
 
        animate();
 
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 80,
        });
    }

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Skill bar animated fill on scroll
    const skillBars = document.querySelectorAll('.skill-bar-fill[data-width]');
    if (skillBars.length > 0) {
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    bar.style.transition = 'width 1.2s ease-in-out';
                    bar.style.width = bar.getAttribute('data-width') + '%';
                    barObserver.unobserve(bar);
                }
            });
        }, { threshold: 0.2 });

        skillBars.forEach(bar => {
            bar.style.width = '0%';
            barObserver.observe(bar);
        });
    }

    // Close language dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        ['lang-dropdown-desktop', 'lang-dropdown-mobile'].forEach(id => {
            const wrapper = document.getElementById(id);
            if (wrapper && !wrapper.contains(e.target)) {
                const menu = wrapper.querySelector('[id^="lang-menu"]');
                if (menu) menu.classList.add('hidden');
            }
        });
    });
});

