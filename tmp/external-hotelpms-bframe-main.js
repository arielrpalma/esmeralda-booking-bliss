let bFrameMain = {
    onLoad: function () {
        iFrameResize({
            log: false,
            heightCalculationMethod: 'taggedElement',
        }, '#hw-booking-frame');

        this.AddQueryParams();
        this.redirectOnMobile();
    },
    AddQueryParams: function () {
        let frame = document.getElementById("hw-booking-frame");
        let currentUrl = window.location.href;
        let frameUrl = frame.getAttribute("src");
        const searchParams = new URLSearchParams(currentUrl.split('?')[1]);

        for (const param of searchParams.entries()) {
            let key = param[0];
            let value = param[1];
            let allowedParameters = ['from', 'to', 'nAdults', 'nChilds', 'nBabies', 'roomType'];
            let parameters = '';

            if (allowedParameters.some(p => p === key)) {
                parameters += `${key}=${value}&`;
            }

            if (!parameters.length) {
                return;
            }

            if (!frameUrl.includes('?')) {
                parameters = `?${parameters}`;
            } else {
                parameters = `&${parameters}`;
            }

            frameUrl += parameters;
        }

        frame.setAttribute("src", frameUrl); //Set iFrame new params
        if (frame.contentDocument) { //If iFrame is already loaded withe the previous booking frame url
            frame.contentDocument.location.reload(true); //Reload iFrame
        }
    },
    isMobile: function () {
        const mobileScreenWidthThreshold = 768;
        const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return screenWidth < mobileScreenWidthThreshold;
    },
    redirectOnMobile: function () {
        let frame = document.getElementById("hw-booking-frame");
        let skipMobileRedirection = frame.hasAttribute("skipMobileRedirection");
        let redirectToOnMobile = frame.getAttribute("redirectToOnMobile");
        let redirectTo = frame.src;

        if (redirectToOnMobile) {
            redirectTo = redirectToOnMobile;
        }

        if (this.isMobile() && !skipMobileRedirection) {
            window.location.href = redirectTo;
        }
    }
}


bFrameMain.onLoad();


(function () {
    function getIframePosition(iframe) {
        const rect = iframe.getBoundingClientRect();
        return {
            top: rect.top,
            left: rect.left,
            bottom: rect.bottom,
            right: rect.right,
            scrollY: window.scrollY,
            scrollX: window.scrollX,
            height: rect.height,
            width: rect.width,
            topOffset: rect.top + window.scrollY,
            leftOffset: rect.left + window.scrollX,
            currentScrollY: document.scrollingElement.scrollTop,
            currentScrollX: document.scrollingElement.scrollLeft,
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight
        }
    }
    function messagePositionToIframe(iframe) {
        const position = getIframePosition(iframe);
        if (iframe.contentWindow) {
            iframe.contentWindow.postMessage(position, '*');
        }
    }
    function onScrollOrResize() {
        const iframe = document.getElementById('hw-booking-frame');
        if (iframe) {
            messagePositionToIframe(iframe);
        }
    }
    function throttle(func, wait) {
        let timeout = null;
        return function (...args) {
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    func.apply(this, args);
                }, wait);
            }
        };
    }
    const throttledOnScrollOrResize = throttle(onScrollOrResize, 10);
    window.addEventListener('scroll', throttledOnScrollOrResize);
    window.addEventListener('resize', throttledOnScrollOrResize);

    document.addEventListener('DOMContentLoaded', function () {
        throttledOnScrollOrResize();
    });


    window.addEventListener('message', (event) => {
        let frame = document.getElementById("hw-booking-frame");

        if (event.data.type == "BFRAME_SCROLL_TOP") {
            frame.scrollIntoView();
            return;
        }

    }, false);
})();