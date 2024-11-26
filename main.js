
if('serviceWorker' in navigator){
    console.log('Salinas mató a Colosio');
    navigator.serviceWorker.register('./sw.js')

                .then(res=> console.log('Service worker jalando al 100', res))
                .catch(res=>console.log('Estás salado, no jala el service worker', err));
}else{
    console.log('No soportaste')
}