import Cookies from 'js-cookie';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import config from '../config.json'
window.Pusher = Pusher;

const token = Cookies.get('auth_token');
window.Echo = new Echo({
    broadcaster: 'reverb',
    key: 'zybi41fmn5qeztpkn6cf',
    wsHost: 'localhost',
    wsPort: 9000,
    wssPort: 9000,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: `http://${config.API_URL}broadcasting/auth`,
    auth: {
        headers: {
            Authorization: `Bearer ${token}`,
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