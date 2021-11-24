const CART2 = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
var cartInfo = [];
var subTotalSum = 0;
var porcent = 0;

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
              <td class="d-none d-md-block"> <button class="btn btn-light" type="button" id="remove" onclick = "remove(${i})">Eliminar</button> </td>
          </tr>
          `
    }
    //agrego la tabla y el total al HTML
    document.getElementById("cart").innerHTML = html;
    document.getElementById("total").innerHTML = suma;
    subTotalSum = suma;
}

//obtengo el json
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART2).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartArt = resultObj.data.articles;
            cartInf();
        }
    });
    //calculo el porcentaje del costo de envio sobre el total para cada boton
    document.getElementById("premium").addEventListener("change", function () {
        porcent = 0.15;
        updateTotalCosts();
    });

    document.getElementById("express").addEventListener("change", function () {
        porcent = 0.07;
        updateTotalCosts();
    });

    document.getElementById("standard").addEventListener("change", function () {
        porcent = 0.05;
        updateTotalCosts();
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
    total();
    updateTotalCosts();
}

//funcion para obtener el total
function total() {
    var suma = 0;
    let htmlToAppend = "";
    //uso el for para recorrer los subtotales y sumarlos
    for (let i = 1; i <= cartArt.length; i++) {
        if (document.getElementById("subt" + i) !== undefined) {
            var subtotal = document.getElementById("subt" + i).textContent;
            suma += parseInt(subtotal);
        }

    }
    //agrego la suma de total al HTML
    document.getElementById("total").innerHTML = suma;
    subTotalSum = suma;
}

//funcion para mostrar el costo del envio con el porcentaje caluclado y para mostrar el total
function updateTotalCosts() {
    let costoEnvio = subTotalSum * porcent;
    document.getElementById("cost").innerHTML = Math.round(costoEnvio);

    let total = subTotalSum + costoEnvio;
    document.getElementById("total").innerHTML = Math.round(total);
}

//funcion para quitar un producto
function remove(id) {
    let i = 0;
    for (let quit of cartArt) {
        quit.count = document.getElementById(i + 1).value; //guardar y actualizar cantidad de los productos
        i++;
    }
    cartArt.splice(id, 1);//quitar el producto
    //actualizar los precios y costos
    cartInf();
    total();
    updateTotalCosts();
}

//funcion para validaciones por Bootstrap
(function () {
    'use strict'

    //Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
    var forms = document.querySelectorAll('.needs-validation')

    //Bucle sobre ellos y evitar la presentación
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})();

//desahbilitar input de transferencia al seleccionar tarjeta de credito
document.getElementById("credit").addEventListener("change", function () {
    document.getElementById("validationCustom01").disabled = false;
    document.getElementById("validationCustom02").disabled = false;
    document.getElementById("validationCustom03").disabled = false;
    document.getElementById("validationCustom04").disabled = false;

    document.getElementById("validationCustom05").disabled = true;
});

//desahbilitar input de tarjeta de credito al seleccionar trasnferencia
document.getElementById("transfer").addEventListener("change", function () {
    document.getElementById("validationCustom05").disabled = false;

    document.getElementById("validationCustom01").disabled = true;
    document.getElementById("validationCustom02").disabled = true;
    document.getElementById("validationCustom03").disabled = true;
    document.getElementById("validationCustom04").disabled = true;
});

function validation() {
    if (document.getElementById("credit").checked) {
        let cred = document.getElementById("validationCustom01").value;
        let tit = document.getElementById("validationCustom02").value;
        let dateV = document.getElementById("validationCustom03").value;
        let cvv = document.getElementById("validationCustom04").value;

        if ((cred != "") && (tit != "") && (dateV != "") && (cvv != "")) {
            alert ("¡Su compra ha sido realizada con éxito!")
        } else {
            alert("Complete los campos de tarjeta de crédito");
            return false;
        }
    } else if (document.getElementById("transfer").checked) {
        let numTransf = document.getElementById("validationCustom05").value;
        if (numTransf != "") {
            alert ("¡Su compra ha sido realizada con éxito!")
        } else {
            alert("Complete los campos de transferencia");
            return false;
        }
    } else if (!(document.getElementById("credit").checked || document.getElementById("transfer").checked)) {
        alert("Complete los campos y/o seleccione forma de pago");
        return false;
    }
}

//funcion para ocultar el modal al llenar los campos obligatorios y apretar confirmar
function ok() {
    if (document.getElementById("credit").checked) {
        let cred = document.getElementById("validationCustom01").value;
        let tit = document.getElementById("validationCustom02").value;
        let dateV = document.getElementById("validationCustom03").value;
        let cvv = document.getElementById("validationCustom04").value;

        if ((cred != "") && (tit != "") && (dateV != "") && (cvv != "")) {
            //jquery
            $("#addMyModal").modal('hide');
        }
    } else if (document.getElementById("transfer").checked) {
        let numTransf = document.getElementById("validationCustom05").value;
        if (numTransf != "") {
            //jquery
            $("#addMyModal").modal('hide');
        }
    }
    return false;
}