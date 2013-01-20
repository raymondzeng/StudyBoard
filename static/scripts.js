//CANVAS STUFF
var saved_image = "";
var canvas,ctx,flag=false,prevX=0,currX=0,prevY=0,currY=0,dot_flag=false;
var x="black",y=2;

function init()
{
    canvas=document.getElementById('can');
    ctx=canvas.getContext("2d");
    w=canvas.width;
    h=canvas.height;
    
    canvas.addEventListener("mousemove",function(e){ findxy('move',e)  },false);
    canvas.addEventListener("mousedown",function(e){ findxy('down',e)  },false);
    canvas.addEventListener("mouseup",function(e){ findxy('up',e)  },false);
    canvas.addEventListener("mouseout",function(e){ findxy('out',e)  },false);
} 

function color(obj)
{
    switch(obj.id)
    {
    case "green" : x="green";break;
    case "blue" : x="blue";break;
    case "red" : x="red";break;
    case "yellow" : x="yellow";break;
    case "orange" : x="orange";break;
    case "black" : x="black";break;
    case "white" : x="white";break;
    }
    if(x=="white")y=20;
    else y=2;
    
}

function draw()
{
    ctx.beginPath();
    ctx.moveTo(prevX,prevY);
    ctx.lineTo(currX,currY);
    ctx.strokeStyle=x;
    ctx.lineWidth=y;
    ctx.stroke();
    ctx.closePath();
}

function erase()
{
    ctx.clearRect(0,0,w,h);
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
	ctx.drawImage(img,0,0);
    };
    img.src = saved_image;
}

function findxy(res,e)
{
    
    if(res=='down')
    {   
	prevX=currX;prevY=currY;
        currX=e.clientX-canvas.offsetLeft;
        currY=e.clientY-canvas.offsetTop; 
	
        flag=true;
        dot_flag=true;
        if(dot_flag)
        {
            ctx.beginPath();
            ctx.fillStyle=x;
            ctx.fillRect(currX,currY,2,2);
            ctx.closePath();
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
            currX=e.clientX-canvas.offsetLeft;
            currY=e.clientY-canvas.offsetTop;
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
	userInfo.innerHTML = '<img src="https://graph.facebook.com/' + info.id + '/picture">' + info.name;
	button.innerHTML = 'Logout';
	document.getElementById('other').style.display = "block";
    }
}

function logout(response){
    userInfo.innerHTML = "";
    document.getElementById('debug').innerHTML = "";
    document.getElementById('other').style.display = "none";
}
