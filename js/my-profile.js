//creo la funcion para guardar los datos en la variable data
function saveData(){
    let data = {
        //obtengo los valores de los input por sus id
        name1: document.getElementById("name1").value,
        name2: document.getElementById("name2").value,
        lastName1: document.getElementById("lastName1").value,
        lastName2: document.getElementById("lastName2").value,
        age: document.getElementById("age").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
    }
    //guardo los datos escritos en los inputs
    //con JSON.stringify convierto los objetos en una cadena de texto JSON
localStorage.setItem("profile",JSON.stringify(data));
}
//agrego funcion al boton de guardar para que cuadno aprete se guarden los datos escritos en los inputs
document.getElementById("saveButton").addEventListener("click",function(e){
    saveData();
})


document.addEventListener("DOMContentLoaded", function(e){
    let allData = JSON.parse(localStorage.getItem("profile"));
    //muestro los datos que estan guardados en los inputs
    document.getElementById("name1").value= allData.name1;
    document.getElementById("name2").value= allData.name2;
    document.getElementById("lastName1").value= allData.lastName1;
    document.getElementById("lastName2").value= allData.lastName2;
    document.getElementById("age").value= allData.age;
    document.getElementById("email").value= allData.email;
    document.getElementById("phone").value= allData.phone;

    //obtengo la imagen guardada en local storage
    const recentImageDataUrl = localStorage.getItem("recent-image");
    //con setAtributte podemos actualizar el url antiguo con el nuevo seleccionado
    if(recentImageDataUrl){
        document.querySelector("#imgPreview").setAttribute("src", recentImageDataUrl);
    }
});

//creo alerts para los campos que sean obligatorios
function require(){
    let nam1 = document.getElementById("name1").value;
    let lastNam1 = document.getElementById("lastName1").value;
    let born = document.getElementById("age").value;
    let mail = document.getElementById("email").value;
    let number = document.getElementById("phone").value;
    if ((nam1 === "") || (lastNam1 === "") || (born === "") || (mail === "") || (number === "")){
        alert ("Debe completar los campos obligatorios");
    }
}


$(document).ready(function () {
    var readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.avatar').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $(".file-upload").on('change', function () {
        readURL(this);
    });
});

//seleccionamos el elemento por el id
document.querySelector("#myFileInput").addEventListener("change", function(){
    //con FileReader podemos leer los objetos de tipo fyle
    const reader = new FileReader();

    //evento para acceder al url y guardarlo en local storage
    //con load esperamos que cargue la lectura del url y se ejecute la funcion
    reader.addEventListener("load", () =>{
        localStorage.setItem("recent-image", reader.result);
    });
    //leemos el archivo elegido
    reader.readAsDataURL(this.files[0]);
});