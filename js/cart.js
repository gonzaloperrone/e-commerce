const CART2 = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
var cartInfo = [];
var subTotalSum = 0;

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
              <td class="d-none d-md-block"> <button class="btn btn-light" type="button" id="remove" onclick = "deleteRowFun(this, ${i+1})">Remove</button> </td>
          </tr>
          `


    }
    //agrego la tabla y el total al HTML
    document.getElementById("cart").innerHTML += html;
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
    document.getElementById("premium").addEventListener("click", function () {
        premium();
        costPremium();
    });
    document.getElementById("express").addEventListener("click", function () {
        express();
        costExpress();
    });
    document.getElementById("standard").addEventListener("click", function () {
        standard();
        costStandard();
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
    subTotalSum = suma;
}

function updateTotalCosts(){
    let subtotal = parseFloat(document.getElementById("total").innerHTML);
    
    let costoEnvio = subtotal * subTotalSum;
    document.getElementById("costo").innerHTML = costoEnvio;

}


function premium() {
    document.getElementById("total").innerHTML = Math.round((subTotalSum) + (subTotalSum * 0.15));
}

function express() {
    document.getElementById("total").innerHTML = Math.round((subTotalSum) + (subTotalSum * 0.07));
}

function standard() {
    document.getElementById("total").innerHTML = Math.round((subTotalSum) + (subTotalSum * 0.05));
}

function costPremium() {
    document.getElementById("cost").innerHTML = Math.round(subTotalSum * 0.15);
}

function costExpress() {
    document.getElementById("cost").innerHTML = Math.round(subTotalSum * 0.07);
}

function costStandard() {
    document.getElementById("cost").innerHTML = Math.round(subTotalSum * 0.05);
}

function deleteRowFun(row, remov) {
    var d = row.parentNode.parentNode.rowIndex;
    let subtotal = parseInt(document.getElementById("subt" + remov).innerText);
    document.getElementById('tab').deleteRow(d);
    subTotalSum = Math.round(subTotalSum - subtotal);
    document.getElementById("total").innerHTML = subTotalSum;
}

(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
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

 document.getElementById("credit").addEventListener("change", function(){
      //document.getElementById("transfer").disabled = true;

      document.getElementById("validationCustom01").disabled = false;
      document.getElementById("validationCustom02").disabled = false;
      document.getElementById("validationCustom03").disabled = false;
      document.getElementById("validationCustom04").disabled = false;

      document.getElementById("validationCustom05").disabled = true;
  });

   document.getElementById("transfer").addEventListener("change", function(){
    /*document.getElementById("credit").disabled = true;*/

    document.getElementById("validationCustom05").disabled = false;

    document.getElementById("validationCustom01").disabled = true;
      document.getElementById("validationCustom02").disabled = true;
      document.getElementById("validationCustom03").disabled = true;
      document.getElementById("validationCustom04").disabled = true;
});

function validarCompra() {
    if (document.getElementById("credit").checked) {
        let cred = document.getElementById("validationCustom01").value;
        let tit = document.getElementById("validationCustom02").value;
        let dateV = document.getElementById("validationCustom03").value;
        let cvv = document.getElementById("validationCustom04").value;

        if ((cred != "") && (tit != "") && (dateV != "") && (cvv != "")){
            return true
        } else {
            alert("Seleccione método de pago.");
            return false;
        }
    } else if(document.getElementById("transfer").checked) {
         let numTransf = document.getElementById("validationCustom05").value;
         if (numTransf != ""){
                return true
         } else {
            alert("Complete los campos de transferencia");
            return false;   
         }
    } else if (!(document.getElementById("credit").checked || document.getElementById("transfer").checked)){
        alert("Seleccionar forma de pago");
        return false;
    }    
}

function habilitarCompra(){
     if (document.getElementById("credit").checked) {
        let cred = document.getElementById("validationCustom01").value;
        let tit = document.getElementById("validationCustom02").value;
        let dateV = document.getElementById("validationCustom03").value;
        let cvv = document.getElementById("validationCustom04").value;

        if ((cred != "") && (tit != "") && (dateV != "") && (cvv != "")){
            /*jquery*/
           $("#exampleModal").modal('hide');
        }
    } else if(document.getElementById("transfer").checked) {
         let numTransf = document.getElementById("validationCustom05").value;
         if (numTransf != ""){
            /*jquery*/
           $("#exampleModal").modal('hide');
         }
    }
    return false;
}