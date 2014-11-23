var dancer = new Dancer();
var kicknumber = 0
var songKicks = []
var page = $('html')

songUrl = 'audio/Frecklefields.mp3'
dancer.load({src : songUrl});

function fft2Particles(fft_co, emitters) {
        //console.log(emitters);
        emitters[1].speed += fft_co*50 ;              
        emitters[1].particlesPerSecond = 20 + fft_co*36 ;
        emitters[1].sizeStart += fft_co*50 ;              
        emitters[1].colorStartSpread = new THREE.Vector3(5+ fft_co/20, 5-fft_co/100, 5+fft_co/6);               
        emitters[2].particlesPerSecond += fft_co*5 ;
        emitters[2].sizeStart += fft_co * 100 ;              
        emitters[3].speed = 5 + fft_co * 1000 ;              
        emitters[3].particlesPerSecond = 10+ fft_co * 500 ;
        emitters[3].sizeStart += fft_co * 100 ;              
        emitters[2].speed = 5 + fft_co * 1000 ;              
        emitters[2].colorStartSpread = new THREE.Vector3(5+ fft_co/25, 5-fft_co/50, 5+fft_co/10);               
        emitters[0].particlesPerSecond = 50 + fft_co*36 ;
        emitters[0].speed = -4 + fft_co/3.2 ;
        emitters[0].sizeStart = 2 + fft_co/5 ;              
        emitters[0].radius = 28 - fft_co/30 ;
        emitters[2].radius = 10 + fft_co/36 ;
}

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

function screenMultiply() {
    page.toggleClass('screen-multiply')
} 

function multiplyLuminosity() {
    page.toggleClass('multiply-luminosity')
} 

function eurekaMac() {
    page.toggleClass('eureka-mac');
}

  
function startSign(){
    page.toggleClass('start');    
}

function toggleCallback(){
    console.log(arguments[1]);
    console.log(arguments[2]);
}

function react() {
    fft2Particles(dancer.getFrequency(1,40), particleGroup.emitters)

}

kickDetector.on()
dancer.play()
.onceAt(0.001, startSign)
.after(0.002, react)
.onceAt(16, startSign)
.onceAt(16, eurekaMac)
.onceAt(16.33, multiplyScreen)
.onceAt(32, multiplyScreen)
.onceAt(32, screenMultiply)
.onceAt(64, screenMultiply)
.onceAt(64, multiplyLuminosity)
.onceAt(96, multiplyLuminosity)
.onceAt(96, function(){ page.toggleClass('saturation-multiply') })
.onceAt(100.10, function(){ page.toggleClass('saturation-multiply') })

