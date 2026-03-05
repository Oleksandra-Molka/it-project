const appContainer = document.getElementById('app');

function initApp() {
    // Створюємо головний заголовок
    const title = document.createElement('h1');
   title.textContent = 'IT-Project: Версія з Feature гілки';
    title.className = 'main-title';
    
    // Додаємо заголовок на сторінку
    if (appContainer) {
        appContainer.appendChild(title);
    } else {
        console.warn('Контейнер #app не знайдено на сторінці');
    }

    renderContent();
}

function renderContent() {
    console.log('Завантаження основного контенту...');
}

initApp();