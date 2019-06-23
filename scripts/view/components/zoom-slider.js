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
        updateHeights();
    });

    zoomSlider.addEventListener('input', function () {
        let value = this.value;
        webFrame.setZoomLevel(parseInt(value));
        updateHeights();
    }, false);
}

function updateHeights() {
    let maxHeight = getMaxHeight(options);

    for (const option of options) {
        option.style.height = maxHeight + 'px';
    }
}

initZoom();