const CART2 = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
var cartInfo = [];

//funcion para la tabla de carrito
function cartInf() {

    let html = "";
    var suma = 0;
    for (let i = 0; i < cartArt.length; i++) {
        //defino que la variable costo es igual al costo unitario
        var costo = cartArt[i].unitCost;

        //con if declaro que si la moneda esta en UYU se divida el costo por 40
        if (cartArt[i].currency === "UYU") {
            costo = costo / 40;
        }
        suma += costo * cartArt[i].count;
        html += `<tr>
              <td>
                  <figure class="itemside align-items-center">
                      <div class="aside"><img src="${cartArt[i].src}" class="img-sm"></div>
                  </figure>
              </td>
              <td><a href="#" class="title text-dark" data-abc="true">${cartArt[i].name}</a></td>
              <td> <input type="number" min="1" style="width : 100px; heigth : 1px" onchange="sub(${i + 1});" value="${cartArt[i].count}" name="" id="${i + 1}" /></td>
              <td>
                  <div class="price-wrap"> USD ${costo} </div>
              </td>
              <td>
                  <div class="price-wrap"><var class="price" id="subt${i + 1}"> ${cartArt[i].count * costo}</var> </div>
              </td>
              <td class="d-none d-md-block"> <button class="btn btn-light" type="button">Remove</button> </td>
          </tr>
          `


    }
    //agrego la tabla y el total al HTML
    document.getElementById("cart").innerHTML += html;
    document.getElementById("total").innerHTML = suma;
}

//obtengo el json
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART2).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartArt = resultObj.data.articles;
            cartInf();
        }
    });
});

//funcion para obtener los subtotales
function sub(subT) {
    var st = document.getElementById(subT).value;
    let costo = cartArt[subT - 1].unitCost;
    if (cartArt[subT - 1].currency === "UYU") {
        costo = costo / 40;
    }
    document.getElementById("subt" + subT).innerHTML = st * costo;
    total()
}

//funcion para obtener el total
function total() {
    var suma = 0;
    let htmlToAppend = "";
    //uso el for para recorrer los subtotales y sumarlos
    for (let i = 1; i <= cartArt.length; i++) {
        var subtotal = document.getElementById("subt" + i).textContent;
        suma += parseInt(subtotal);
    }
//agrego la suma de total al HTML
    document.getElementById("total").innerHTML = suma;
}


