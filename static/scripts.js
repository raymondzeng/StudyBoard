//CANVAS STUFF
var saved_image = "";
var canvas1,canvas2,ctx1,ctx2,flag=false,prevX=0,currX=0,prevY=0,currY=0,dot_flag=false;
var x="black",y=2;

function init()
{
    canvas1=document.getElementById('can');
    ctx1=canvas1.getContext("2d");
    w=canvas1.width;
    h=canvas1.height;

    canvas2=document.getElementById('palette');
    ctx2=canvas2.getContext("2d");
    w2=canvas2.width;
    h2=canvas2.height;
    var image=new Image();
    image.src="static/studyboardpalette.png";
    ctx2.drawImage(image,0,0);

    canvas1.addEventListener("mousemove",function(e){ findxy('move',e)  },false);
    canvas1.addEventListener("mousedown",function(e){ findxy('down',e)  },false);
    canvas1.addEventListener("mouseup",function(e){ findxy('up',e)  },false);
    canvas1.addEventListener("mouseout",function(e){ findxy('out',e)  },false);
    canvas2.addEventListener("mouseup",function(e){ selectcolor(e)},false);
} 

function selectcolor(e)
{
    var paletteX=e.clientX-994; //not sure why 'canvas2.offsetLeft/Top' wasn't working for me so I hard coded the offsets
    var paletteY=e.clientY-120; 
    var pixeldata=ctx2.getImageData(paletteX,paletteY,1,1);
    var pixel=pixeldata.data;
    $('#RGB').val(pixel[0]+','+pixel[1]+','+pixel[2]);
    var temphex=pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
    var hex='#'+('000000' + temphex.toString(16)).substr(-6)
    $('#HEX').val(hex);
    /*if(hex=="#000000")
    {
	console.log("poo");
	x="black";
    }
    else*/
	x=hex;
}

function draw()
{
    ctx1.beginPath();
    ctx1.moveTo(prevX,prevY);
    ctx1.lineTo(currX,currY);
    ctx1.strokeStyle=x;
    ctx1.lineWidth=y;
    ctx1.stroke();
    ctx1.closePath();
}

function erase()
{
    ctx1.clearRect(0,0,w,h);
}

function save()
{
    var dataUrl = canvas.toDataURL();
    saved_image = dataUrl;
}

function load(){
    var img = new Image;
    img.onload = function(){
	erase();
	ctx1.drawImage(img,0,0);
    };
    img.src = saved_image;
}

function findxy(res,e)
{
    
    if(res=='down')
    {   
	prevX=currX;prevY=currY;
        currX=e.clientX-canvas1.offsetLeft;
        currY=e.clientY-canvas1.offsetTop; 
	
        flag=true;
        dot_flag=true;
        if(dot_flag)
        {
            ctx1.beginPath();
            ctx1.fillStyle=x;
            ctx1.fillRect(currX,currY,2,2);
            ctx1.closePath();
            dot_flag=false;
        }
    }
    if(res=='up'||res=="out")
    {
        flag=false; 
    } 
    if(res=='move')
    {
	
        if(flag)
        {
            prevX=currX;
            prevY=currY;
            currX=e.clientX-canvas1.offsetLeft;
            currY=e.clientY-canvas1.offsetTop;
            draw();
        }
    }
}

//FB STUFF
/*FB Login gives us access to 
  fb id
  name
  first_name
  last_name
  link
  username
  gender
  locale
  Other public information
  email
  about user
*/

var button;
var userInfo;
window.fbAsyncInit = function() {
    FB.init({ appId: '415808421820964', 
	      status: true, 
	      cookie: true,
	      xfbml: true,
	      oauth: true});
    
    function updateButton(response) {
	button = document.getElementById('fb-auth');
	userInfo = document.getElementById('user-info');

	if (response.authResponse) {
	    //user is already logged in and connected
	    FB.api('/me', function(info) {
		login(response, info);
	    });
	    button.onclick = function() {
		FB.logout(function(response) {
		    logout(response);
		});
	    };
	} else {
	    //user is not connected to your app or logged out
	    $('#fb-prelog').css('display','inline-block');
	    $('#fb-postlog').css('display','none');
	    button.innerHTML = 'Login';
	    button.onclick = function() {
		FB.login(function(response) {
		    if (response.authResponse) {
			FB.api('/me', function(info) {
			    login(response, info);
			});	   
		    } else {
			//user cancelled login or did not grant authoriz.
		    }
		}, {scope:'email,user_about_me'});  	
	    }
	}
    }
    
    // run once with current status and whenever the status changes
    FB.getLoginStatus(updateButton);
    FB.Event.subscribe('auth.statusChange', updateButton);	
};
$(document).ready(function() {
    (function() {
	var e = document.createElement('script'); e.async = true;
	e.src = 'http://connect.facebook.net/en_US/all.js';
	document.getElementById('fb-root').appendChild(e);
    }());
});
function login(response, info){
    if (response.authResponse) {
	var accessToken = response.authResponse.accessToken;
	userInfo.innerHTML = '<img src="https://graph.facebook.com/' + info.id + '/picture">' +'<p id="user_name">' + info.name + '</p>';
	$('#fb-prelog').css('display','none');
	$('#fb-postlog').css('display','inline-block');
	//button.innerHTML = 'Logout';
	document.getElementById('other').style.display = "block";
    }
}

function logout(response){
    userInfo.innerHTML = "";
    document.getElementById('debug').innerHTML = "";
    document.getElementById('other').style.display = "none";
}
/*
$(function(){
    var canvas = document.getElementById('picker');
    var ctx = canvas.getContext('2d');
    var image = new Image();
    image.onload = function () {
        ctx.drawImage(image, 0, 0, image.width, image.height);
    }
    image.src = 'static/studyboardpalette.png';

    $('#picker').mousemove(function(e) { // mouse move handler
        // get coordinates of current position
        var canvasOffset = $(canvas).offset();
        var canvasX = Math.floor(e.pageX - canvasOffset.left);
        var canvasY = Math.floor(e.pageY - canvasOffset.top);
	
        // get current pixel
        var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
        var pixel = imageData.data;
	
        // update preview color
        var pixelColor = "rgb("+pixel[0]+", "+pixel[1]+", "+pixel[2]+")";
        $('.preview').css('backgroundColor', pixelColor);
        $('#rgbVal').val(pixel[0]+','+pixel[1]+','+pixel[2]);
        var dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
        $('#hexVal').val('#' + ('0000' + dColor.toString(16)).substr(-6));
    });
});
*/