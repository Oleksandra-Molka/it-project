import posthog from 'posthog-js';
import * as Sentry from "@sentry/vue";

Sentry.init({
  dsn: "https://7530db4be1ba98c444ce7d86613e3897@o4511003731492864.ingest.de.sentry.io/4511003747680336",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  environment: "development",
});

/* Встановлюємо дані користувача
Sentry.setUser({
  id: "12345",
  email: "oleksandra.molka.pp.2023@lpnu.ua", 
  segment: "premium_user"       
}); */

Sentry.setUser(null);

// Ініціалізація PostHog 
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

    // 1. Створення завдання
    const addBtn = document.createElement('button');
    addBtn.textContent = '1. Створити завдання';
    addBtn.onclick = () => {
        posthog.capture('task_created', { priority: 'high', category: 'work' });
        console.log('Завдання створено!');
    };

    // 2. Завершення завдання
    const completeBtn = document.createElement('button');
    completeBtn.textContent = '2. Завершити завдання';
    completeBtn.onclick = () => {
        posthog.capture('task_completed', { time_to_complete_seconds: 120 });
        console.log('Завдання виконано!');
    };

    // 3. Видалення завдання
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '3. Видалення';
    deleteBtn.onclick = () => {
        posthog.capture('task_deleted', { reason: 'mistake' });
        console.log('Завдання видалено!');
    };

    // КНОПКА ДЛЯ SENTRY 
    const breakBtn = document.createElement('button');
    breakBtn.textContent = 'Break the world';
    breakBtn.style.backgroundColor = '#6366f1';
    breakBtn.style.color = 'white';
    
    breakBtn.onclick = () => {
        Sentry.addBreadcrumb({
            category: 'ui',
            message: 'Користувач натиснув кнопку виклику помилки',
            level: 'info',
        });
        throw new Error("Sentry Test Error: Something went wrong!");
    };

    // Кнопка Feature Flag 
    const urgentBtn = document.createElement('button');
    urgentBtn.id = 'urgent-btn';
    urgentBtn.textContent = 'Тільки термінові';
    urgentBtn.style.display = 'none'; 
    urgentBtn.style.backgroundColor = '#ff4d4d';
    urgentBtn.style.color = 'white';
    urgentBtn.style.padding = '5px 15px';
    urgentBtn.style.borderRadius = '4px';

    posthog.onFeatureFlags(() => {
        urgentBtn.style.display = posthog.isFeatureEnabled('show-urgent-filter') ? 'inline-block' : 'none';
    });

    btnContainer.append(addBtn, completeBtn, deleteBtn, breakBtn, urgentBtn);
    appContainer.appendChild(btnContainer);
}

initApp();