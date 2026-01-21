// 1. 네비게이션 스크롤 효과
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
});

// 2. 모바일 메뉴 토글
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// 3. 부드러운 스크롤 (수정됨: 외부 링크 새 탭 열기 허용)
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // 내부 링크(#으로 시작하는 경우)만 부드러운 스크롤 적용
        if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault(); // 내부 이동일 때만 기본 동작 방지
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // 모바일 메뉴 열려있을 경우 닫기
                if (navMenu) navMenu.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            }
        }
        // #으로 시작하지 않는 외부 링크(http...)는 간섭하지 않음
        // 따라서 HTML의 target="_blank"가 정상 작동하게 됨
    });
});

// 4. 스킬 바 애니메이션
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-bar');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// 5. 폼 제출 처리 (데모)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('메시지가 전송되었습니다! (데모 버전)');
        contactForm.reset();
    });
}

// 6. 스크롤 인디케이터 클릭
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}

// 7. 섹션 진입 애니메이션
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease-out';
    sectionObserver.observe(section);
});