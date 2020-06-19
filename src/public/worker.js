

self.addEventListener('push', e => {
   const msg = e.data.json();
   console.log(msg);
   self.registration.showNotification(msg.title, {
       body: msg.message,
       icon: './icons/linux.png'
   })
})

console.log('service worker');
