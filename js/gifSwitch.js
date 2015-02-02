var GIFS = [];
var usedImages = [];
var imageStack = [];
var switchDelay =  12500;
var page = $('html')

var effectsList = {
    hues: {
        handler : hueSwitcher, 
        chance : 0.25,
        delay: 2000
    },
    zooms: {
        handler : zoomScramble,
        chance : 0.125,
        delay: switchDelay-4000
    },
    saturation: {
        handler : pulseSaturation,
        chance : 0.1,
        delay: 4000
    },
    contrast: {
        handler : contrastBurst,
        chance : 0.1,
        delay: 2000
    },
    slowflash: {
        handler : pulseBrightness,
        chance : 0.1,
        delay: 5000
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function assignBackground( gifUrl ) {
    page.css('background', 'url(' + gifUrl + ')');
    page.css('background-size' , 'cover');
}

// next 2 handle jerky zoom effect
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

// next 2 handle random hue switching effect
function randomHue() {
    var degrees = randomInt(1,359);
    page.css('-webkit-filter', 'hue-rotate(' + degrees + 'deg)');    
}

function hueSwitcher() {
    var switcher = setInterval(randomHue, 1000);
    setTimeout(function() {
        clearInterval(switcher);
        page.css('-webkit-filter', '');
    }, switchDelay-3000);
}

// generic function for turning on and off CSS classes
function classToggler(cssClass, duration) {
    page.toggleClass(cssClass);
    setTimeout(function() {
        page.toggleClass(cssClass);
    }, duration);
}
// handle contrast burst effect
function contrastBurst() {
    classToggler('contrast-burst', 5000);
}

// handle saturation effect
function pulseSaturation() {
    classToggler('saturate', 6000);
}

// handle brightness effect
function pulseBrightness() {
    classToggler('slowflash', 5000);
}


/* all objects in FX must have: 
   1) a number (0-1) value, "chance"
   2) a function to actually do the effect, "handler" 
   3) a delay in milliseconds   */
function handleEffects(FX) {

    var fxCount = 0;

    for (index in FX) {
        var effect = FX[index];
        if ( Math.random() < effect.chance ) {
            if (fxCount < 2) {                  // max of 3 effects (for performance)
                fxCount++;
                setTimeout(effect.handler, effect.delay);
            }
        }
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

function switchGif() {
    imageStack = checkStack(imageStack);

    if ( GIFS != undefined ) { 
        var choice = imageStack.pop();

        if ( choice != usedImages[usedImages.length - 1] ) {    // make sure we're not
            assignBackground( choice );                         // using the current background
            usedImages.push( choice );
            handleEffects(effectsList);
        } 
        else {
            switchGif();		// try again 
        }
    }
}

var SWITCHER;                   // global for easy dev allowing me to stop the cycling
function startVisuals(data) {
    GIFS = data;
    switchGif();
    SWITCHER = setInterval( switchGif, switchDelay );
}

// go go go 
$.getJSON( 'gifs/giflist.json', startVisuals );



