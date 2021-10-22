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


function saveData(){
    let data = {
        //img: document.getElementById("file-upload").value,
        name1: document.getElementById("name1").value,
        name2: document.getElementById("name2").value,
        lastName1: document.getElementById("lastName1").value,
        lastName2: document.getElementById("lastName2").value,
        age: document.getElementById("age").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
    }
localStorage.setItem("profile",JSON.stringify(data));
}

document.getElementById("saveButton").addEventListener("click",function(e){
    saveData();
})

document.addEventListener("DOMContentLoaded", function(e){
    let allData = JSON.parse(localStorage.getItem("profile"));
    //document.getElementById("file-upload").value= allData.file-upload;
    document.getElementById("name1").value= allData.name1;
    document.getElementById("name2").value= allData.name2;
    document.getElementById("lastName1").value= allData.lastName1;
    document.getElementById("lastName2").value= allData.lastName2;
    document.getElementById("age").value= allData.age;
    document.getElementById("email").value= allData.email;
    document.getElementById("phone").value= allData.phone;
    console.log(allData)
})