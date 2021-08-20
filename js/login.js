function miFuncion() {

  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;
  if((user !=="") &&(pass !=="")){
    window.location = "inicio.html";
  }
  else{
    alert("Debe completar los campos")
  }
}