var dancer = new Dancer();
var kicknumber = 0
var songKicks = []
var page = $('html')

songUrl = 'audio/Frecklefields.mp3'
dancer.load({src : songUrl});

function toggleAllOff() {
    var currentClasses = document.querySelector('html').classList
    for (var current in currentClasses) {
        page.toggleClass(current);
    }
}

kickDetector = dancer.createKick({
    decay: 0.001,
    threshold: 0.42,
    frequency : [1, 40],
    onKick: function ( mag ) {
        console.log('Kick: ' + kicknumber + ' at: ' + Date.now());
        console.log(mag);
        kicknumber++;
        
        //if (kicknumber % 4 === 0) {
        //    page.            
        //}
    }
});

function multiplyScreen() {
    page.toggleClass('multiply-screen')
} 

function multiplyLuminosity() {
    page.toggleClass('multiply-luminosity')
} 

function toggleCallback(){
    console.log(arguments[1]);
    console.log(arguments[2]);
}

kickDetector.on()
dancer.play()
.onceAt(16, multiplyScreen)
.onceAt(32, multiplyScreen)
.onceAt(64, multiplyLuminosity)
.onceAt(96, multiplyLuminosity)
.onceAt(96, function(){ page.toggleClass('saturation-multiply') })
.onceAt(100.10, function(){ page.toggleClass('saturation-multiply') })

