function logOut(){
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("role");
    window.location.replace("../login/login.html");
    //alert("loggin out");
}

function stuLogged(){

    var user = window.localStorage.getItem('user');
    var role = window.localStorage.getItem('role');
    console.log("role"+user);
    console.log(role);
    // if(role == null)
    //     window.location.replace("../login/login.html");
    // if(role == "student")
    //   window.location.replace("../student/student.html");
    //   role = window.localStorage.getItem('role');
    document.getElementById("us").innerHTML = "Hi! " + user;
    //   console.log(us);
    //   console.log(role);
    //alert("im being called");
}

function teachLogged(){
    var user = window.localStorage.getItem('user');
    var role = window.localStorage.getItem('role');
    console.log(user);
    console.log(role);
    // if(role == null)
    //     window.location.replace("../login/login.html");
    // if(role == "instructor")
    //   window.location.replace("../teach/instructor.html");
    //   var role = window.localStorage.getItem('role');
    document.getElementById("us").innerHTML = "Hi! " + user;
}

function goTo(page){
    window.location.replace(page);
}
