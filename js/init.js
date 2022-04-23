const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  //Con innerHtml y el localStorage del nombre del usuario al nav de cada html por el id
  //Con getItem obtenemos el valor del nombre del usuario
  if (localStorage.getItem("user") !== null) {
    document.getElementById("log").innerHTML +=
      `<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">` +
      "Bienvenid@" +
      " " +
      localStorage.getItem("user") +
      `</a>`;
  } else {
    document.getElementById(
      "log"
    ).innerHTML += `<a class="nav-link" href="index.html">Iniciar sesión</a>`;
  }
});

document.addEventListener("DOMContentLoaded", function (e) {
  if (document.getElementById("logOut") !== null) {
    document.getElementById("logOut").addEventListener("click", function (e) {
      localStorage.clear();
    });
  }
});

document.getElementById(`header`).innerHTML = `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
<a class="navbar-brand" href="home.html"><img id="navLogo" src="img/login_edit.png" alt="e-commerce" style="width:240px;"></a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
  aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarNavDropdown">
  <ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link" href="home.html">Home<span class="sr-only">(current)</span></a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="categories.html">Categorías</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="products.html">Productos</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="sell.html">Vender</a>
    </li>
    <li class="nav-item dropdown" id="log">
      <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <a class="dropdown-item" href="cart.html">Mi carrito</a>
        <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
        <a class="dropdown-item" id="logOut" href="index.html">Cerrar sesión</a>
      </div>
    </li>
  </ul>
</div>
</nav>`;
