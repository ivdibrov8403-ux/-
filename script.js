// Глобальные переменные
let currentSection = 'home';

// Основная функция переключения секций
function switchSection(sectionId) {
    console.log('Переключаемся на секцию:', sectionId);
    
    // Скрываем все секции
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Показываем целевую секцию
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
        
        // Обновляем активную ссылку в навигации
        updateActiveNavLink(sectionId);
        
        // Прокрутка к верху страницы
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        console.log('Успешно переключено на:', sectionId);
    } else {
        console.error('Секция не найдена:', sectionId);
    }
}

// Функция обновления активной ссылки в навигации
function updateActiveNavLink(activeSectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === `#${activeSectionId}`) {
            link.classList.add('active');
        }
    });
}

// Функция плавной прокрутки к главам
function scrollToChapter(chapterId) {
    // Если мы не в разделе эссе, сначала переключаемся на него
    if (currentSection !== 'essay') {
        switchSection('essay');
        
        // Ждем немного перед прокруткой
        setTimeout(() => {
            performScrollToChapter(chapterId);
        }, 500);
    } else {
        performScrollToChapter(chapterId);
    }
}

// Вспомогательная функция для прокрутки к главе
function performScrollToChapter(chapterId) {
    const chapterElement = document.getElementById(chapterId);
    if (chapterElement) {
        const elementPosition = chapterElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - 100; // Учитываем высоту навигации
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        console.log('Прокрутка к главе:', chapterId);
    }
}

// Функция для загрузки фото
function initPhotoUpload() {
    const photoUpload = document.getElementById('photoUpload');
    const photoInput = document.getElementById('photoInput');
    
    if (photoUpload && photoInput) {
        photoUpload.addEventListener('click', function() {
            photoInput.click();
        });
        
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    // Создаем изображение вместо плейсхолдера
                    photoUpload.innerHTML = '';
                    photoUpload.style.backgroundImage = `url(${e.target.result})`;
                    photoUpload.style.backgroundSize = 'cover';
                    photoUpload.style.backgroundPosition = 'center';
                    photoUpload.style.border = 'none';
                    
                    // Сохраняем в localStorage
                    localStorage.setItem('userPhoto', e.target.result);
                    
                    console.log('Фото успешно загружено!');
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Функция для проверки сохраненного фото
function loadSavedPhoto() {
    const savedPhoto = localStorage.getItem('userPhoto');
    const photoUpload = document.getElementById('photoUpload');
    
    if (savedPhoto && photoUpload) {
        photoUpload.innerHTML = '';
        photoUpload.style.backgroundImage = `url(${savedPhoto})`;
        photoUpload.style.backgroundSize = 'cover';
        photoUpload.style.backgroundPosition = 'center';
        photoUpload.style.border = 'none';
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт Ивана Диброва загружен!');
    
    // Показываем главную страницу по умолчанию
    switchSection('home');
    
    // Инициализация загрузки фото
    initPhotoUpload();
    
    // Загружаем сохраненное фото если есть
    loadSavedPhoto();
    
    // Инициализация анимаций
    initAnimations();
    
    // Инициализация плавающих элементов
    initFloatingElements();
    
    console.log('Навигация готова к работе!');
    console.log('Текущая секция:', currentSection);
});

// Функция инициализации анимаций
function initAnimations() {
    // Анимация появления элементов при скролле
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Наблюдаем за элементами в эссе
    const essayElements = document.querySelectorAll('.chapter, .subchapter');
    essayElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    console.log('Анимации инициализированы для', essayElements.length, 'элементов');
}

// Функция инициализации плавающих элементов
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 2}s`;
    });
}

// Обработчики для навигационных ссылок (резервные)
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            switchSection(targetId);
        });
    });
});

// Глобальные функции для отладки
window.debugNavigation = function() {
    console.log('=== ДЕБАГ НАВИГАЦИИ ===');
    console.log('Текущая секция:', currentSection);
    console.log('Активные секции:', document.querySelectorAll('.content-section.active').length);
    console.log('Навигационные ссылки:', document.querySelectorAll('.nav-link').length);
};

// Функция для принудительного переключения (на случай проблем)
window.forceSwitch = function(sectionId) {
    console.log('Принудительное переключение на:', sectionId);
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        currentSection = sectionId;
        window.scrollTo(0, 0);
    }
};

console.log('🚀 Система навигации загружена!');
console.log('Доступные команды:');
console.log('- switchSection("home") - перейти на главную');
console.log('- switchSection("essay") - перейти к эссе');
console.log('- scrollToChapter("chapter1") - прокрутить к главе');
console.log('- debugNavigation() - отладка навигации');