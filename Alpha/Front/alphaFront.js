function log() {
  var ajax = new XMLHttpRequest();              //create XML... object
  ajax.onreadystatechange = function() {       //access the onreadystatechange for the XML... object
    document.getElementById("state").innerHTML = "Authenticating..";
    if (ajax.readyState == 4 && ajax.status == 200) {
      var response = JSON.parse(ajax.responseText);
      document.getElementById("state").innerHTML = response.middle;
      document.getElementById("st").innerHTML = response.back;

    }
  };
  ajax.open("POST", "https://web.njit.edu/~gdb6/Alpha/alphaFront.php", true);
  ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");   //set content type header info for sending url encoded variables in the request
  var ucid = document.getElementById('ucid').value;
  var pass = document.getElementById('pass').value;
  ajax.send("ucid=" + encodeURIComponent(ucid) + "&pass=" + encodeURIComponent(pass));  //send data to PHP and wait for response
}

var authpress = document.getElementById("auth");
authpress.addEventListener("click", log);
