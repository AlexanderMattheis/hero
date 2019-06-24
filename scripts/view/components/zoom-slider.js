const {webFrame} = require('electron');

// constants
const SLIDER_MIN = 0;
const SLIDER_MAX = 5;

// variables
const zoomSlider = document.getElementById('zoom-slider');

function initZoom() {
    webFrame.setZoomLevel(0);

    document.addEventListener('wheel', function (event) {
        let value = parseInt(zoomSlider.value);

        if (event.wheelDelta > 0) {
            if (value < SLIDER_MAX) {
                value++;
            }
        } else if (event.wheelDelta < 0) {
            if (value > SLIDER_MIN) {
                value--;
            }
        }

        zoomSlider.value = value;
        webFrame.setZoomLevel(value);
        updateOptionsHeights();
    });

    zoomSlider.addEventListener('input', function () {
        let value = this.value;
        webFrame.setZoomLevel(parseInt(value));
        updateOptionsHeights();
    }, false);
}

function updateOptionsHeights() {
    let maxHeight = getMaxHeight(options);

    if (maxHeight > 0) {
        for (const option of options) {
            option.style.height = (maxHeight < OPTION_MAX_HEIGHT ? maxHeight : OPTION_MAX_HEIGHT) + 'px';
        }
    }
}

initZoom();