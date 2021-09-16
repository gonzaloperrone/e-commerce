function logIn() {

  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;
  if((user !=="") &&(pass !=="")){
    localStorage.setItem("user", user);

    window.location = "inicio.html";
  }
  else{
    alert("Debe completar los campos")
  }
}
