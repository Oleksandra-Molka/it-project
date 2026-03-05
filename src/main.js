const appContainer = document.getElementById('app');

function initApp() {
    // Створюємо головний заголовок
    const title = document.createElement('h1');
    // Отримуємо значення змінної оточення
    const appStatus = import.meta.env.VITE_APP_STATUS || 'Unknown';

    // Додаємо статус до заголовка
    title.textContent = `IT-Project (${appStatus})`;
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