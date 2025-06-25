function resultados(AquiVaElJson) {
  const plantillaElm = document.querySelector("#template-productos");
  const insertarEle = document.querySelector("#products");
  insertarEle.innerHTML = "";

  for (const key of AquiVaElJson) {
    const clon = plantillaElm.content.cloneNode(true);
    const productImage = clon.querySelector(".product-image");
    productImage.src = key.image;
    productImage.style.width = "80%";

    const productDescription = clon.querySelector(".product-name");
    productDescription.textContent = key.title;

    const productPrice = clon.querySelector(".product-price");
    productPrice.textContent = "$" + key.price;

    insertarEle.appendChild(clon);
  }
}

function main() {
  const TotalProductos = fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((dataEnJson) => {
      resultados(dataEnJson);
      return dataEnJson;
    });

  //traemos lo que escriben en el input
  const formEl = document.querySelector(".form-search");
  formEl.addEventListener("submit", (element) => {
    element.preventDefault();
    const palablraAbuscar = element.target.search.value;

    if (palablraAbuscar.trim() === "") {
      TotalProductos.then((total) => {
        resultados(total);
      });
    } else {
      TotalProductos.then((total) => {
        const arrayFiltrado = total.filter((producto) =>
          producto.title.toLowerCase().includes(palablraAbuscar.toLowerCase())
        );
        resultados(arrayFiltrado);
      });
    }
  });
}

main();
