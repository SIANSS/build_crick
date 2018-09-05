var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
console.log(baseUrl);

xhttp.open("GET", baseUrl, false);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send();

function register(){
  var email = document.getElementById("umail").value;
  var password = document.getElementById("code").value;
  var params = "mail="+email+"&password="+password;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      var data = JSON.parse(this.responseText);
      //console.log(this.responseText)

    }
  }

  xhttp.open("POST", baseUrl +"signup", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(params);
}
