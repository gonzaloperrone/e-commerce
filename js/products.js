const ORDER_ASC_BY_COST = "Mayor";
const ORDER_DESC_BY_COST = "Menor";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortProducts(criteria, array) {
    //Se ordena el array segun criterio definido
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList() {
    //Declaro la variable string
    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        //Con el for  recorremos el arreglo de productos
        let product = currentProductsArray[i];
        //Le asigno categorias a cada elemento

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {
            //Se evalua la cantidad de articulos vendidos en funcion de un minimo y un maximo
            htmlContentToAppend += `
                <a href="product-info.html" class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1" >`+ product.name + `</h4>
                                <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
                            </div><br>
                            <p class="mb-1">` + product.currency + ` ` + product.cost + ` </p><br>
                            <br>
                            <p class="mb-1">` + product.description + `</p>
                        </div>
                    </div>
                </a>
                `
            //Agrego el codigo que quiero que se muestre en el HTML
            //Muestra los productos en una lista
        }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
        //Lo agrego al HTML
    }
}

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    //Muestro los productos ordenados
    showProductsList();
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });


    document.getElementById("rangeFilterCount").addEventListener("click", function () {
         //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de articulos vendidos de cada producto
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductsList();
    });
});


const buscador = document.querySelector('#buscador');
const boton = document.querySelector('#boton');
const resultado = document.querySelector('#prod-list-container')

resultado.innerHTML = '';

const buscar = ()=>{
    resultado.innerHTML = '';

    const texto = buscador.value.toLowerCase();
    for (let product of currentProductsArray) {
        let prod = product.name.toLowerCase();
        if(prod.indexOf(texto) !== -1){
            resultado.innerHTML += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1" >`+ product.name + `</h4>
                            <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
                        </div><br>
                        <p class="mb-1">` + product.currency + ` ` + product.cost + ` </p><br>
                        <br>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </a>
            `
        }
    }
    if(resultado.innerHTML === ''){
        resultado.innerHTML += `
           <li>No hay resultados...</li>
            `
    }
}

boton.addEventListener('click',buscar);
buscador.addEventListener('keyup',buscar);
buscar()