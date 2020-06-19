const { Router } = require('express');
const router = Router();
const webPush = require('../webpush');
let pushSubscription;

router.post('/subscribe', async (req, res)=> {

    console.log(req.body);

    pushSubscription = req.body;
    res.status(200).send('hello world');

    // const data = JSON.stringify({
    //     title: 'Mi notificación push',
    //     message: 'Hola gente de PodemosAprender, esta es un push'
    // });

    // try {
    //     await webPush.sendNotification(pushSubscription, data)

    // } catch (e) {
    //     console.error(e)
    // }    
});

router.post('/new-message', async (req, res) => {

    let { message } = req.body

    const data = JSON.stringify({
        title: 'Mi notificación push',
        message: message
    });

    try {
        await webPush.sendNotification(pushSubscription, data)

    } catch (e) {
        console.error(e)
    }  
})


module.exports = router;