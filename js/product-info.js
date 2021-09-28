var product = {};

//creo funcion para mostrar las img
function img(array) {

    let htmlContentToAppend = "";
    htmlContentToAppend += `<div class="carousel-item active">
    <img src="${array[0]}" alt="">
    </div>`
    let indicators = `<li data-target = "#demo" data-slide-to="0" class="active"></li>`;


for (let i = 1; i < array.length; i++) {
    let imageSrc = array[i];
    htmlContentToAppend += `
<div class="carousel-item">
<img src="${array[i]}" alt="">
</div>`;
    indicators += `<li data-target="#demo" data-slide-to="${i}"></li>
`
}
document.getElementById("indicators").innerHTML = indicators;
document.getElementById("carousel").innerHTML = htmlContentToAppend;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            //guardo los datos en una variable llamandolos por el id
            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productsoldCountHTML = document.getElementById("productsoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            let productCostHTML = document.getElementById("productCost");

            //agrego los datos al html
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productsoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            productCostHTML.innerHTML = product.currency + " " + product.cost;

            img(product.images);
        }
    });
});

var comments = [];

//creo función para mostrar los comentarios
function showComments(array) {

    //con el for recorro los comentarios del array
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let comments = array[i];

        //creo las variables para mostrar la calificación por estrellas
        //creo la variable para las estrellas chequeadas
        var check = "";
        for (let i = 1; i <= comments.score; i++) {
            check += `<span class="fa fa-star checked"></span>`
        }

        //creo la variable para las estrellas no chequeadas
        var noCheck = "";
        for (let i = 1; i <= 5 - comments.score; i++) {
            noCheck += `<span class="fa fa-star"></span>`
        }

        htmlContentToAppend += `
        <div class="container">
        <div class="row">
        <div class="col-12">
            <div class="card card-white post">
                <div class="post-heading">
                    <div class="float-left image">
                    <img src="../e-commerce/img/usuario.png" class="img-circle avatar" alt="user profile image">
                    </div>
                    <div class="float-left meta">
                        <div class="title h5">
                            <a href="#"><b>`+ comments.user + `</b></a>
                        </div> 
                        <h6 class="text-muted time ">` + comments.dateTime + `</h6>
                    </div>
                    <medium class="text-muted float-right"> `+ check + noCheck + `  </small>
                </div>
                <div class="post-description"> 
                    <p>` + comments.description + `</p>
                </div>
            </div>
        </div>
        
    </div>
</div>
        `
    }
    //las agrego al html
    document.getElementById("comments").innerHTML = htmlContentToAppend;
}


//ejecuto la funcion con un evento para mostrar los comentarios
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            commentsArray = resultObj.data;
            showComments(commentsArray);
        }
    });
});

//creo la funcion para agregar nuevos comentarios
function comentNuevo() {

    //guardo los datos obtenidos en una variable
    let commentsUser = document.getElementById("comentario").value;
    let usuario = localStorage.getItem("user");

    //guardo los datos en las variables
    var score1 = document.getElementById("radio5");
    var score2 = document.getElementById("radio4");
    var score3 = document.getElementById("radio3");
    var score4 = document.getElementById("radio2");
    var score5 = document.getElementById("radio1");
    var puntuacion = 0
    //defino el rango de estrellas chequeadas
    if (score5.checked)
        puntuacion = 5
    else if (score4.checked)
        puntuacion = 4
    else if (score3.checked)
        puntuacion = 3
    else if (score2.checked)
        puntuacion = 2
    else if (score1.checked)
        puntuacion = 1

    //guardo en la variable las estrellas chequeadas
    var check = "";
    for (let i = 1; i <= puntuacion; i++) {
        check += `<span class="fa fa-star checked"></span>`
    }

    //guardo en la variable las estrellas que no van a estar chequeadas
    var noCheck = "";
    for (let i = 1; i <= 5 - puntuacion; i++) {
        noCheck += `<span class="fa fa-star"></span>`
    }
    //tomo la fecha de mi ordenador
    let date = new Date();

    //obtengo el dia, el mes y el año
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    //defino que si el mes es menor a 10 se le agregue un 0
    if (month < 10) {
        month = `0${month}`;
    }
    //defino que si el dia es menor a 10 se le agregue un 0
    if (day < 10) {
        day = `0${day}`;
    }
    //guardo los datos en una variable y defino que si la hora es menor a 10 se le agregue un 0
    var hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    //guardo los datos en una variable y defino que si los minutos son menores a 10 se les agregue un 0
    var minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    //guardo los datos en una variable y defino que si los segundos son menores a 10 se le agregue un 0
    var seconds = date.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    //aplico el formato del horario
    var dateTime = `${year}-${month}-${day}  ${hour}:${minutes}:${seconds}`;



    var htmlContentToAppend = `
</div><div class="container">
<div class="row">
<div class="col-12">
    <div class="card card-white post">
        <div class="post-heading">
            <div class="float-left image">
            <img src="../e-commerce/img/usuario.png" class="img-circle avatar" alt="user profile image">
            </div>
            <div class="float-left meta">
                <div class="title h5">
                    <a href="#"><b>`+ usuario + `</b></a>
                </div> 
                <h6 class="text-muted time ">` + dateTime + `</h6>
            </div>
            <medium class="text-muted float-right"> `+ check + noCheck + `  </small>
        </div>
        <div class="post-description"> 
            <p>` + commentsUser + `</p>

        </div>
    </div>
</div>
</div>
</div>
                `
    //agrego el cnuevo comentario al html
    document.getElementById("comments").innerHTML += htmlContentToAppend;
}


var relatedArray = [];

function related(prod, relatedProds) {

    let htmlContentToAppend = "";
    for (let i = 0; i < relatedProds.length; i++) {
        let related = prod[relatedProds[i]];

        htmlContentToAppend += `
        <div class="card" style="width: 18rem;" id="cards">
  <img class="card-img-top" src="` + related.imgSrc + `" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">`+ related.name + `</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="vermas">Ver más</a>
  </div>
</div>
        `
    }

    document.getElementById("relatedProd").innerHTML = htmlContentToAppend;
}



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            prod = resultObj.data;
            relatedProds = product.relatedProducts;
            related(prod, relatedProds);
        }
    });
});