var btn = document.querySelector('.btn');
var user = document.querySelector('.user');
var pwd = document.querySelector('.pwd');
btn.onclick = function() {
    var xml = new XMLHttpRequest();
    xml.onload = function(e) {
        console.log(JSON.parse(e.target.responseText));
    }
    xml.open('get', '/list?user=' + user.value + "&pwd=" + pwd.value);
    xml.send();
}