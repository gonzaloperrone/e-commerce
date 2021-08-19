var currentProductsArray = [];

function showCategoriesList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];


        htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1" style="font-size: 200%;">`+ product.name + `</h4>
                            <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
                        </div><br>
                        <b class="mb-1" style="font-size: 130%;">` + product.currency + ` ` + product.cost + ` </b><br>
                        <br>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </a>
            `


        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}




document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data;
            showCategoriesList(categoriesArray);
        }
    });
});
