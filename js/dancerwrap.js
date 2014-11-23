var dancer = new Dancer();
var kicknumber = 0
var songKicks = []

songUrl = 'audio/Frecklefields.mp3'
dancer.load({src : songUrl});

kickDetector = dancer.createKick({
    decay: 0.001,
    threshold: 0.42,
    frequency : [1, 40],
    onKick: function ( mag ) {
        console.log('Kick: ' + kicknumber + ' at: ' + Date.now());
        console.log(mag);
        kicknumber++;
    }
});

kickDetector.on()
dancer.play()

