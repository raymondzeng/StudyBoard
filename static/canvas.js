var setIntv, getIntv;


function startSet(){
    clearInterval(setIntv);
    setIntv = setInterval(setImg,333);
    clearInterval(getIntv);
    $("#ss").attr("value","Stop Real Time");
    $("#ss").attr("onclick","stopSet()");
    getIntv = setInterval(getImg,333);
}
function stopSet(){
    clearInterval(setIntv);
    clearInterval(getIntv);
    $('#ss').attr("value","Start Real Time");
    $('#ss').attr("onclick","startSet()");
}

function setImg(){
    var s = canvas1.toDataURL();
    $.getJSON('/setImg',{s:s});
}
function getImg(){
    $.getJSON('/getImg',function(data) {
	 var img = new Image;
	img.src = data.result;
	ctx1.drawImage(img,0,0);
    });
}

$(document).ready(function(){
    startSet();
    startGet();
});