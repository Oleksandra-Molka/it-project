import posthog from 'posthog-js';

posthog.init('phc_xqPHuSsyfiwU3PGw6RDSXWUTvEgPEWrIprmyBj57Vkn', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only' 
});

const appContainer = document.getElementById('app');

function initApp() {
    const title = document.createElement('h1');
    const appStatus = import.meta.env.VITE_APP_STATUS || 'Unknown';
    title.textContent = `IT-Project (${appStatus})`;
    title.className = 'main-title';
    
    if (appContainer) {
        appContainer.appendChild(title);
        renderContent();
    }
}

function renderContent() {
    const btnContainer = document.createElement('div');
    btnContainer.style.display = 'flex';
    btnContainer.style.flexWrap = 'wrap'; 
    btnContainer.style.gap = '12px';      
    btnContainer.style.marginTop = '20px';
    btnContainer.style.alignItems = 'center';

    // 1. Створення завдання (task_created)
    const addBtn = document.createElement('button');
    addBtn.textContent = '1. Створити завдання';
    addBtn.onclick = () => {
        posthog.capture('task_created', {
            priority: 'high',         
            category: 'work',         
            is_authenticated: true   
        });
        console.log('Подія task_created відправлена');
        alert('Завдання створено!');
    };

    // 2. Завершення завдання (task_completed)
    const completeBtn = document.createElement('button');
    completeBtn.textContent = '2. Завершити завдання';
    completeBtn.onclick = () => {
        posthog.capture('task_completed', {
            time_to_complete_seconds: 120 // 
        });
        console.log('Подія task_completed відправлена');
        alert('Завдання виконано!');
    };

    // 3. Видалення завдання (task_deleted)
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '3. Видалити завдання';
    deleteBtn.onclick = () => {
        posthog.capture('task_deleted', {
            reason: 'mistake' 
        });
        console.log('Подія task_deleted відправлена');
        alert('Завдання видалено!');
    };

    // Кнопка Feature Flag 
    const urgentBtn = document.createElement('button');
    urgentBtn.id = 'urgent-btn';
    urgentBtn.textContent = 'Тільки термінові';
    urgentBtn.style.display = 'none'; 
    urgentBtn.style.backgroundColor = '#ff4d4d';
    urgentBtn.style.color = 'white';
    urgentBtn.style.border = 'none';
    urgentBtn.style.padding = '5px 15px';
    urgentBtn.style.borderRadius = '4px';
    urgentBtn.style.cursor = 'pointer';

    posthog.onFeatureFlags(() => {
        if (posthog.isFeatureEnabled('show-urgent-filter')) {
            urgentBtn.style.display = 'inline-block';
        } else {
            urgentBtn.style.display = 'none';
        }
    });

    btnContainer.append(addBtn, completeBtn, deleteBtn, urgentBtn);
    appContainer.appendChild(btnContainer);
}

initApp();