/**
*
*   Author: Abbas Abdulmalik
*   Creation Date: March 16, 2015
*   Purpose: Show Marbles
*   Modified: N/A
*   Notes:
*
*
*/
//=============== basic famous core entities =====================
var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var Transform = famous.core.Transform;
var Surface = famous.core.Surface;
var ImageSurface = famous.surfaces.ImageSurface
var StateModifier = famous.modifiers.StateModifier;
var Easing = famous.transitions.Easing;
//=================================================================
var clickCounter = 0;
var windowFraction = 3/4;
var xy = undefined;
var menuOpen = false;
var outerWrapper = new Engine.createContext();
//-------------------------------------------------------------------
var backImagePanel = new ImageSurface({
    size: [innerWidth, innerHeight],
    content: 'images/waterfall.png',
    properties: {
        visibility : 'visible',
        zIndex: '0'
    }
});
//-------------------------------------------------------------------
var backPanel = new Surface({
    size: [xy,xy],
    content: 'Tap<br>a Marble',
    properties:{
        color: 'white',
        fontFamily: 'sans-serif',
        fontSize: '2rem',
        backgroundColor: 'orange',
        padding: '30px',
        zIndex: '0'
    }
});
var frontPanel = new Surface({
    size: [3000,xy],
    content: 'FRONT PANEL<br><br><div id="msg"></div>',
    properties:{
        color: 'white',
        fontFamily: 'sans-serif',
        backgroundColor: 'blue',
        padding: '30px' ,
        boxShadow: '-20px 20px 50px black',
        borderRadius: '10px',
        zIndex: '2'        
    }  
});
var panelModifier = new StateModifier();

//-------------------------------------------------
outerWrapper.add(backPanel);
outerWrapper.add(panelModifier).add(frontPanel);
//-------------------------------------------------
frontPanel.on("click",function(){
    //---------change image every 2 nd fourth click -----------
    clickCounter++;
    if(clickCounter%6 === 0  ){
        //change backImage panel
        setTimeout(function(){
            backImagePanel.setContent('images/grouper.png');            
        },1300); 
    } 
    else if(clickCounter%2 === 0 && clickCounter%4 !== 0 ){
        //change backImage panel
        setTimeout(function(){
            backImagePanel.setContent('images/garden.png');            
        },1300);
    }
    else if(clickCounter%4 === 0){
        //change backImage panel
        setTimeout(function(){
            backImagePanel.setContent('images/waterfall.png');            
        },1300); 
    }
    //-----------------------------------------------------------
    var windowOpenSize = innerWidth * windowFraction;
    var msg = document.getElementById('msg');
    if(menuOpen){
        menuOpen = false; 
        //---------------crucial part------------
            panelModifier.setTransform(
                Transform.translate(0, 0, 0),
                { duration : 1300, curve: Easing.inOutElastic }
            ); 
        //--------------------------------------
    }
    else if(!menuOpen){
        menuOpen = true; 
        //---------------crucial part------------
            panelModifier.setTransform(
                Transform.translate(windowOpenSize, 0, 0),
                { duration : 1300, curve: Easing.inOutElastic  }
            ); 
        //--------------------------------------        
    }
    msg.innerHTML = "Menu Open: " + menuOpen;
});
//======================================================

//////////////////////////////////////////////////


var appWidth = 0;
var appHeight = 0;
var imageWidth = 80;
var speed1 =1.75;
var speed2 =1.75001;
var ball1Stopped = true;
var ball1Snapshot = innerHeight/2;
var ball2Stopped = true;
var ball2Snapshot = innerHeight/4;

//////////////////////////////////////////////////////////////
window.onresize = function(){
    //menuSize = window.innerWidth/8;
    //menu.setAttribute("width",menuSize);
    //////////////////////////////
    appWidth = innerWidth;
    appHeight = innerHeight;
    //-------------------------------
    var msg = document.getElementById('msg');
    msg.innerHTML = "WIDTH: " + innerWidth + "px";
    //--------------------------------------------------
    var windowOpenSize = innerWidth * windowFraction;    
    if(menuOpen){
            panelModifier.setTransform(
                Transform.translate(windowOpenSize, 0, 0)
            ); 
    }
    else if(!menuOpen){
            panelModifier.setTransform(
                Transform.translate(0, 0, 0)
            ); 
    }    
    //--------------------------------------------------
    var sizeArray = [innerWidth, innerHeight];
    backImagePanel.size = sizeArray;    
    //--------------------------------
    
}
//////////////////////////////////////////////////////
var ball1 = new ImageSurface({
    size: [0.9*imageWidth, 0.9*imageWidth],
    content: 'images/redball.png',
    properties: {
        visibility : 'visible',
        zIndex: '1'
    }
});

var ball2 = new ImageSurface({
    size: [imageWidth, imageWidth],
    content: 'images/blueball.png',
    properties: {
        visibility : 'visible',
        zIndex: '1'
    }
});

var bouncer1 = new Modifier({
    origin: [0, 0],
    align: [0, 0],
    transform : function () {
        var ticks = Date.now()/1000;
        var yPosition = (appHeight-imageWidth)*( 1 - Math.abs(Math.sin(speed1*ticks))) + imageWidth/9 ;       
        var xPosition = appWidth/4 - imageWidth/4;
        if(ball1Stopped){
            return Transform.translate( xPosition, ball1Snapshot ,0);            
        }
        else if(!ball1Stopped){
            ball1Snapshot = yPosition;
            return Transform.translate( xPosition, yPosition ,0);
        }
    }
});

var bouncer2 = new Modifier({
    origin: [0, 0],
    align: [0, 0],
    transform : function () {
        var ticks = Date.now()/999.999;
        var yPosition = (appHeight-imageWidth)*( 1 - Math.abs(Math.sin(speed2*ticks))) + imageWidth/9 ;       
        var xPosition = appWidth/3 - imageWidth/3;
        if(ball2Stopped){
            return Transform.translate( xPosition, ball2Snapshot ,0);            
        }
        else if(!ball2Stopped){
            return Transform.translate( xPosition, yPosition ,0);
            ball2Snapshot = yPosition;            
        }
    }
});


window.onload = function(){
    appWidth = innerWidth;
    appHeight = innerHeight;
}


ball1.on("mouseover", function(){
    if(ball1Stopped){
        ball1Stopped = false;        
    }
    else if(!ball1Stopped){
        ball1Stopped = true;        
    }    
});

ball2.on("mouseover", function(){
    if(ball2Stopped){
        ball2Stopped = false;        
    }
    else if(!ball2Stopped){
        ball2Stopped = true;        
    }    
});

//////////////////////////////////////////////////////////
outerWrapper.add(bouncer1).add(ball1);
outerWrapper.add(bouncer2).add(ball2);
