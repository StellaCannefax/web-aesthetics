// all code for the background GIF switching, as well as  
// filters and other effects, is contained in this "function"
var fxHandler = function() {
    this.page = $('html');
    this.switchDelay =  12000;
    this.GIFS = [];
    var self = this; 

    var effects = {
        hues: {
            handler : hueSwitcher, 
            chance : 0.25,
            delay: 2000
        },
        zooms: {
            handler : self.zoomScramble,
            chance : 0.125,
            delay: self.switchDelay-4000
        },
        saturation: {
            handler : self.pulseSaturation,
            chance : 0.1,
            delay: 4000
        },
        contrast: {
            handler : self.contrastBurst,
            chance : 0.1,
            delay: 2000
        },
        slowflash: {
            handler : self.pulseBrightness,
            chance : 0.1,
            delay: 5000
        }
    }
    
    // called every time an image is switched
    // this is because I like to be able to base the timing
    // of the effects based on when the image will switch
    this.handleEffects = function(FX) {
        console.log(FX);
        var fxCount = 0;
        var maxFxCount = 2;

        for (index in FX) {
            var effect = FX[index];
            if ( Math.random() < effect.chance && fxCount < maxFxCount ) {
                fxCount++;
                setTimeout(effect.handler, effect.delay);
            }
        }
    }

    // next section deals with queueing up gifs
    // all of these are private methods on purpose
    var imageStack = [];
    var usedImages = [];
    function queueGifs() {
        var stack = [];
        
        for (var i=0; i < 8; i++) {
            var choice =  self.GIFS[Math.floor(Math.random() * self.GIFS.length)];
            
            if ( stack.indexOf( choice ) === -1 ) {
                stack.push(choice);
            }
        }
        return stack;
    }
    
    function checkStack(stack) {
        if ( stack.length < 2 ) {
            stack = stack.concat(queueGifs());
        }
        bufferImages(stack);
        return stack
    }

    function assignContent(element, imageUrl){
        var urlString = "url(" + imageUrl + ")";
        $(element).css('content', urlString);
    }

    // implementation of this buffer is pretty naive,
    // just applying some CSS to get the browser to do it for us
    // as well as just preloading 2 at a time 
    function bufferImages(queue) {
        console.log(queue);
        var emptyDivs = [];
        var buffers = $('.gifbuffer');
        var loadInterval = this.switchDelay/2;
        var loadFirst = queue[queue.length -1];
        var loadSecond = queue[queue.length -2];
        
        assignContent(buffers[0], loadFirst)
        setTimeout(function(){
            assignContent(buffers[1], loadSecond)
        }, loadInterval);
    }
    
    function switchGif() {
        imageStack = checkStack(imageStack);

        if ( imageStack.length > 0 ) { 
            var choice = imageStack.pop();

            self.assignImage( choice );                     
            usedImages.push( choice );
            self.handleEffects(effects);
       } 
    }

    this.assignImage = function( gifUrl ){
        this.page.css('background', 'url(' + gifUrl + ')');
        this.page.css('background-size' , 'cover');
    }

    

    // generic function for turning on and off CSS classes
    // used to auto-cancel the special FX css classes applied
    this.classToggler = function(cssClass, duration) {
        this.page.toggleClass(cssClass);
        setTimeout(function() {
            self.page.toggleClass(cssClass);
        }, duration);
    }

    this.imageFlasher = function(url, blendMode, onPeriod, offPeriod) { 
        var background = this;
        return setInterval(function() {
            self.toggleImageBlend(url, blendMode, onPeriod); 
        }, offPeriod + onPeriod);
    }

    this.randomHue = function() {
        var degrees = randomInt(1,359);
        this.page.css('-webkit-filter', 'hue-rotate(' + degrees + 'deg)');    
    }

    this.toggleImageBlend = function(url, blendMode, duration) {
        var currentBackground = this.page.css('background-image');
        var urlString = "url(" + url + ")";
        var blendedImages = currentBackground + "," + urlString;
        
        this.page.css('background-image', blendedImages);
        this.page.css('background-blend-mode', blendMode);
        setTimeout(function(){
            this.page.css('background-image', currentBackground);
        }, duration);    
    }

    this.zoomRepeat = function( duration, minSize ) {
        var stepSize = 4;
        var currentSize = 100;
        var frameCount = Math.floor((currentSize - minSize) / stepSize);
        var frameDuration = duration / frameCount;
        var currentFrame = 0;

        var zoom = setInterval(function() {
            if (currentFrame <= frameCount) {
                currentSize = currentSize - stepSize;
                this.page.css('background-size', currentSize + "%");
                currentFrame++;
            }
        }, frameDuration);

        setTimeout(function() {
            clearInterval(zoom)        
        }, duration);
    }

    // All zero-argument handlers for effects go below here, 
    // but not their inside implementations (those are above)
    var hueSwitcher = function() {
        var switcher = setInterval(randomHue, 1000);
        setTimeout(function() {
            clearInterval(switcher);
            page.css('-webkit-filter', '');
        }, switchDelay-1000);
    }
    
    this.zoomScramble = function() {
        var zoomCount = 3;

        for (var i=1 ; i <= zoomCount ; i++) {
            var timeout = randomInt(5, 800);
            var duration = randomInt(2000,3000);
            var minSize = randomInt(2,33);

            setTimeout(function() { 
                this.zoomRepeat(duration, minSize);
            }, timeout);    
        }
    }



    // dang finally 
    this.startVisuals = function(data) {
        self.GIFS = data;
        switchGif();
        setInterval( switchGif, self.switchDelay );
    }

    this.start= function(){
        $.getJSON( 'gifs/giflist.json', self.startVisuals );
    }
}

fxHandler.prototype.pulseBrightness = function() {            
    this.classToggler('slowflash', 5000);
}
fxHandler.prototype.contrastBurst = function() {              
    this.classToggler('contrast-burst', 5000);
}
fxHandler.prototype.contrastBurst = function() {              
    this.classToggler('contrast-burst', 5000);
}
fxHandler.prototype.pulseSaturation = function() {            
    this.classToggler('saturate', 6000);
} 
  
function randomInt(min, max) {          //  lil' helper function
    return Math.floor(Math.random() * (max - min)) + min;
}


FX = new fxHandler();
FX.start()

