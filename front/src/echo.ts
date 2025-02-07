import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: 'zybi41fmn5qeztpkn6cf',
    wsHost: 'localhost',
    wsPort: 9000,
    wssPort: 9000,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: 'http://localhost:8000/broadcasting/auth',
    auth: {
        headers: {
            Authorization: `Bearer 14|jFwKnO1rf3gMHK6TWlih4ZnYHwP6AE4YRQJbOg1X1c6df6d2`,
        },
    },
});

declare global {
    interface Window {
        Pusher: typeof Pusher;
        Echo: Echo<'reverb'>; 
    }
}

export default window.Echo