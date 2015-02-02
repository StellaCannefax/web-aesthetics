var GIFS = [];
var usedImages = [];
var imageStack = [];
var switchDelay =  12500;
var page = $('html')

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function assignBackground( gifUrl ) {
    page.css('background', 'url(' + gifUrl + ')');
    page.css('background-size' , 'cover');
}

function zoomRepeat( duration, minSize ) {
    var stepSize = 4;
    var currentSize = 100;
    var frameCount = Math.floor((currentSize - minSize) / stepSize);
    var frameDuration = duration / frameCount;
    var currentFrame = 0;

    var zoom = setInterval(function() {
        if (currentFrame <= frameCount) {
            currentSize = currentSize - stepSize;
            page.css('background-size', currentSize + "%");
            currentFrame++;
        }
    }, frameDuration);

    setTimeout(function() {
        clearInterval(zoom)        
    }, duration);
}

function randomHue() {
    var degrees = randomInt(1,359);
    page.css('-webkit-filter', 'hue-rotate(' + degrees + 'deg)');    
}



function pulseSaturation() {
    setTimeout(function() {
        page.toggleClass('saturate'); 
    }, 5800);
    setTimeout(function() {
        page.toggleClass('saturate');
    }, switchDelay-200);
}

function pulseBrightness() {
    setTimeout(function() {
        page.toggleClass('slowflash'); 
    }, 5000);
    setTimeout(function() {
        page.toggleClass('slowflash');
    }, switchDelay-1000);
}

function handleEffects() {

    var fxCount = 0;

    var FX = {
        hues: {
            handler : handleHueSwitch, 
            chance : 0.3
        },
        zooms: {
            handler : handleRandomZoom,
            chance : 0.125
        },
        saturation: {
            handler : pulseSaturation,
            chance : 0.1
        },
        slowflash: {
            handler : pulseBrightness,
            chance : 0.1
        }
    };

    for (index in FX) {
        var effect = FX[index];
        if ( Math.random() < effect.chance ) {
            if (fxCount < 2) {
                fxCount++;
                effect.handler();
            }
        }
    }
}

function hueSwitcher() {
    var switcher = setInterval(randomHue, 1000);
    setTimeout(function() {
        clearInterval(switcher);
        page.css('-webkit-filter', '');
        page.toggleClass('hueNormal');
    }, switchDelay-3000);
}

function handleHueSwitch() {
    setTimeout(hueSwitcher, 2000);
}

function zoomScramble() {
    var zoomCount = 3;

    for (var i=1 ; i <= zoomCount ; i++) {
        var timeout = randomInt(5, 800);
        var duration = randomInt(2000,3000);
        var minSize = randomInt(2,33);
        
        setTimeout(function() { 
            zoomRepeat(duration, minSize);
        }, timeout);
        
    }
}


function queueGifs() {
    var stack = [];
    
    for (var i=0; i < 5; i++) {
        var choice =  GIFS[Math.floor(Math.random() * GIFS.length)];
        
        if ( stack.indexOf( choice ) === -1 ) {
            stack.push(choice);
        }
    }
    return stack;
}

function checkStack(stack) {
    if ( stack.length < 3 ) {
        stack = stack.concat(queueGifs());
    }
    return stack
}

function handleRandomZoom () {
    setTimeout(zoomScramble, switchDelay-4000);
}

function switchGif() {
    imageStack = checkStack(imageStack);

    if ( GIFS != undefined ) { 
        var choice = imageStack.pop();

        if ( choice != usedImages[usedImages.length - 1] ) {    // make sure we're not
            assignBackground( choice );                         // using the current background
            usedImages.push( choice );
            handleEffects();
        } 
        else {
            switchGif();		// try again 
        }
    }
}

var SWITCHER;
function startVisuals(data) {
    GIFS = data;
    switchGif();
    SWITCHER = setInterval( switchGif, switchDelay );
}

// go go go 
$.getJSON( 'gifs/giflist.json', startVisuals );



