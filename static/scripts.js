var button;
var userInfo;
var saved_image = "";
var fb_name, fb_id;
var canvas1,canvas2,ctx1,ctx2,flag=false,prevX=0,currX=0,prevY=0,currY=0,dot_flag=false;
var x="black",y=2;

function setHiddenName(){
	document.getElementById("fbname").value=fb_name;
	return fb_name;
}

function showStuff(id) {
		document.getElementById(id).style.display = 'block';
}
function hideStuff(id) {
		document.getElementById(id).style.display = 'none';
}

function init()
{
    var sw = $(window).width()-630;
    var sp = 605;
    while(sw > 0){
	$("#bannercenter").append("<img src='static/images/bannercenter.png' style='position:absolute;top:0px;left:" + sp.toString() + "px'/>");
	sp += 5;
	sw -= 5;
    }

    canvas1=document.getElementById('can');
    ctx1=canvas1.getContext("2d");
    w=canvas1.width;
    h=canvas1.height;

    canvas2=document.getElementById('palette');
    ctx2=canvas2.getContext("2d");
    var image=new Image();
    image.src="static/images/studyboardpalette.png";
    image.onload = function () {
	ctx2.drawImage(image,0,0);
    }

    canvas1.addEventListener("mousemove",function(e){ findxy('move',e)  },false);
    canvas1.addEventListener("mousedown",function(e){ findxy('down',e)  },false);
    canvas1.addEventListener("mouseup",function(e){ findxy('up',e)  },false);
    canvas1.addEventListener("mouseout",function(e){ findxy('out',e)  },false);
    canvas2.addEventListener("mouseup",function(e){ selectcolor(e)},false);
} 

function selectcolor(e)
{
    var paletteX=e.clientX-994;
    var paletteY=e.clientY-162; 
    if(paletteX > 171 && paletteX < 202 && paletteY > 250 && paletteY < 290){
	$('#RGB').val('Eraser');
	$('#HEX').val('Eraser');
	x='#ffffff';
	y=20;
    }
    else{
	var pixeldata=ctx2.getImageData(paletteX,paletteY,1,1);
	var pixel=pixeldata.data;
	$('#RGB').val(pixel[0]+','+pixel[1]+','+pixel[2]);
	var temphex=pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
	var hex='#'+('000000' + temphex.toString(16)).substr(-6)
	$('#HEX').val(hex);
	x=hex;
	y=2;
    }
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
    saved_image = canvas1.toDataURL();
}

function load(){
    var img = new Image;
    img.src = saved_image;
    ctx1.drawImage(img,0,0);
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

window.fbAsyncInit = function() {
    FB.init({ appId: '415808421820964', 
	      status: true, 
	      cookie: true,
	      xfbml: true,
	      oauth: true});
    
    function updateButton(response) {
	button = document.getElementById('login_button');
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
	    button.innerHTML = 'Login with Facebook';
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
    fb_name = info.name;
    fb_id = info.id;
    if (response.authResponse) {
	var accessToken = response.authResponse.accessToken;
	userInfo.innerHTML = '<img id="user_photo" src="https://graph.facebook.com/' + info.id + '/picture">' +'<p id="user_name">' + info.name + '</p>';
	$('#fb-prelog').css('display','none');
	$('#fb-postlog').css('display','inline-block');
	button.innerHTML = 'Logout';
    }
}

function logout(response){
    userInfo.innerHTML = "";
    document.getElementById('debug').innerHTML = "";
    document.getElementById('other').style.display = "none";
}

$(document).ready(function(){
    $("#trigger").click(function(){
	$("#panel").toggle("fast");
	if($('#trigger').html() == 'Show Chat')
	    $('#trigger').html('Hide Chat');
	else
	    $('#trigger').html('Show Chat');
	return false;
    });
});


//High Color Selection
function hightlight(){
    var colors = $(".color");
    for (var i=0;i<colors.length;i++){
	if(x == $(colors[i]).attr("id"))
	{
	    $(colors[i]).css("border","2px solid gray")
	}
	else
	{
	    $(colors[i]).css("border","2px solid white")
	}
    }
}

$(document).ready(function(){
    $("#paletteselection").click(hightlight);
});