var GIFS = [];
var usedImages = [];
var imageStack = [];
var switchDelay =  12000;

function assignBackground( gifUrl ) {
    var page = $('html')
    page.css('background', 'url(' + gifUrl + ')');
    page.css('background-size' , '100%');
}

function queueGifs() {
    if (imageStack.length === 0) {
        var stack = [];
        
        for (var i=0; i=5; i++) {
            var choice =  GIFS[Math.floor(Math.random() * GIFS.length)];
            
            if ( choice != stack[stack.length - 1] ) {
                stack.push(choice);
            }
        }
        imageStack.append(stack);
    } 
}

function switchGif() {
    if ( GIFS != undefined ) { 
        var choice = GIFS[Math.floor(Math.random() * GIFS.length)];

        if ( choice != usedImages[usedImages.length - 1] ) {    // make sure we're not
            assignBackground( choice );                         // using the current background
            usedImages.push( choice );
            //queueGifs();
        } 
        else {
            switchGif();		// try again 
        }
    }
}



function startVisuals(data) {
    GIFS = data;
    //queueGifs();
    switchGif();
    setInterval( switchGif, switchDelay );
}

// go go go
$.getJSON( 'gifs/giflist.json', startVisuals );



