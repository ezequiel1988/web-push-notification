const PUBLIC_VAPID_KEY = 'BBBSJUF6QRneKk7UxWzH4ZUJNRDlH9pw_TWPwpj3liXGyvAbSg0oDavvA98WR8yq98wlJO8ozyLK5WLGRFpRi7w';

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

const subscription = async () => {

   const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });

  const subscribe = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
    });

    console.log('New service worker')

   await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscribe),
        headers: {
            'Content-type': 'application/json'
        }
    });
    console.log('Suscripto');
    
}

let form = document.getElementById('myform');
let message = document.getElementById('message');

form.addEventListener('submit', async e => {
    e.preventDefault();

    await fetch('/new-message', {
        method: 'POST',
        body: JSON.stringify({
            message: message.value
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });
    form.reset();
})

subscription();