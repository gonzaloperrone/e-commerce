var product = {};

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productsoldCountHTML = document.getElementById("productsoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            let productCostHTML = document.getElementById("productCost");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productsoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            productCostHTML.innerHTML = product.currency + " " + product.cost;


            showImagesGallery(product.images);
        }
    });
});

var comments = [];

function showComments(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let comments = array[i];

        htmlContentToAppend += `
        <div>
            <div>
                <div>
                    <div class="justify-content-between">
                        <h4 class="mb-1">`+ comments.user + `</h4><br>
                        <medium class="text-muted float-right">` + comments.score + ` </small>
                        </div>
                    <p>` + comments.description + `</p>
                    <small class="text-muted float-right"> ` + comments.dateTime + `  </small>
                </div>
            </div>
        </div>
        <br><hr>
        `


    }

    document.getElementById("comments").innerHTML = htmlContentToAppend;
}



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            commentsArray = resultObj.data;
            showComments(commentsArray);
        }
    });
});