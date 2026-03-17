let bframeIframeLogic = {
    isScriptLoaded: false,
    generateUUID: function () {
        var d = new Date().getTime();
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    },
    loadScript: function (url) {
        var uuid;
        var script;

        uuid = this.generateUUID();
        script = document.createElement('script');
        script.src = url + '?' + uuid;
        script.type = 'text/javascript';
        script.async = true;

        // script.onload = function () {
        //     console.log('Script loaded successfully:', url);
        // };
        // script.onerror = function () {
        //     console.error('Error loading script:', url);
        // };

        document.head.appendChild(script);
    },
    loadCss: function (url) {

        var css = document.createElement('link');
        css.id = 'hw-booking-frame-styles';
        css.rel = 'stylesheet';
        css.href = url;
        css.type = 'text/css';

        document.head.appendChild(css);
    },
    getMainDomain: function (url) {
        var parsedUrl = new URL(url);
        var hostname = parsedUrl.hostname;
        var domainParts = hostname.split('.');

        if (domainParts.length === 4 && domainParts.every(part => !isNaN(part))) {
            return hostname;
        }

        if (domainParts.length > 2) {
            domainParts.shift(); // Remove the subdomain (e.g., www)
        }

        return domainParts.join('.');
    },
    onLoad: function () {

        let frame = document.getElementById("hw-booking-frame");
        var parsedUrl = new URL(frame.src);
        let url = parsedUrl.origin;

        if (parsedUrl.href.includes("/BookingFrameClient")) {
            url = url + '/BookingFrameClient';
        }

        this.loadScript(url + '/public/assets/booking-frame/js/bframe-main.js');
        // this.loadScript('https://localhost:7190/public/assets/booking-frame/js/bframe-main.js'); // local test

        this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.2/lightgallery.min.js');
        this.loadCss('https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.2/css/lightgallery.min.css');

        window.addEventListener('message', function (event) {
            if (event.data.type === 'hw-open-gallery') {
                let galleryTrigger = document.createElement('button');
                const dynamicGallery = lightGallery(galleryTrigger, {
                    dynamic: true,
                    dynamicEl: event.data.images
                });
                dynamicGallery.openGallery();
            }
        });
    }
};

document.addEventListener("DOMContentLoaded", function () {
    bframeIframeLogic.onLoad();
});
