let productUnitCost = 0;
let productCurrency = "";
let subtotal = 0;
let shippingPercentage = 0.15;
let total = 0;
let paymentTypeSelected = false;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let ERROR_MSG = "Ha habido un error, verifica qué pasó.";
let DOLLAR_SYMBOL = "USD";
let PESO_SYMBOL = "UYU ";
let MONEY_SYMBOL = "$";
let PERCENTAGE_SYMBOL = '%';
var articles = [];

function updateTotalCosts(){
    let unitProductCostHTML = document.getElementById("productCostText");
    let comissionCostHTML = document.getElementById("comissionText");
    let totalCostHTML = document.getElementById("totalCostText");

    let comissionToShow = Math.round((shippingPercentage * 100)) + PERCENTAGE_SYMBOL;
    let totalCostToShow = MONEY_SYMBOL + (Math.round(subtotal * (1 + shippingPercentage)));

    unitProductCostHTML.innerHTML = subtotal;
    comissionCostHTML.innerHTML = comissionToShow;
    totalCostHTML.innerHTML = totalCostToShow;
}

function updateSubtotal() {
    let count = parseInt(document.getElementById("cantidad").value);
    subtotal = count * productUnitCost;
    document.getElementById("subtotal").innerHTML = MONEY_SYMBOL + " " + subtotal;
    updateTotalCosts()

}

function showPaymentTypeNotSelected(){

}

function hidePaymentTypeNotSelected(){

}

function showProducts(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        productUnitCost = product.unitCost;
  
        htmlContentToAppend += `
        <td><img src="` + product.src + `"></td>
        <td>` + product.name + `</td>
        <td>` + product.unitCost + `</td>
        <td>` + PESO_SYMBOL + `</td>
        
        <td> <input type="number" value= "1" min= "0" id= "cantidad" onchange="updateSubtotal();" ></td>
        <td id="subtotal"></td>
        
        `
    }
    document.getElementById("inner").innerHTML = htmlContentToAppend;
    updateSubtotal();


}


document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {

            productCurrency =(resultObj.data.articles);
            showProducts(resultObj.data.articles);
        }
    })
});


document.getElementById("goldradio").addEventListener("change", function(){
    shippingPercentage = 0.15;
    updateTotalCosts();
});

document.getElementById("premiumradio").addEventListener("change", function(){
    shippingPercentage = 0.07;
    updateTotalCosts();
});

document.getElementById("standardradio").addEventListener("change", function(){
    shippingPercentage = 0.05;
    updateTotalCosts();
});


 //Se obtiene el formulario de publicación de producto
 var cartForm = document.getElementById("cart-info");

 //Se agrega una escucha en el evento 'submit' que será
 //lanzado por el formulario cuando se seleccione 'Vender'.
 cartForm.addEventListener("submit", function(e){

     let primeraCalle = document.getElementById("primeraCalle");
     let numeroCasa = document.getElementById("numeroCasa");
     let segundaCalle = document.getElementById("segundaCalle");
     let agregarPago = document.getElementById("agregarPago");
     let infoMissing = false;

     //Quito las clases que marcan como inválidos
     primeraCalle.classList.remove('is-invalid');
     numeroCasa.classList.remove('is-invalid');
     segundaCalle.classList.remove('is-invalid');
     agregarPago.classList.remove('is-invalid');

     //Consulto por calle
     if (primeraCalle.value === "")
     {
         primeraCalle.classList.add('is-invalid');
         infoMissing = true;
     }

     //Consulto por pago
     if (agregarPago.value === "")
     {
         agregarPago.classList.add('is-invalid');
         infoMissing = true;
     }
     
     //Consulto por número de casa
     if (numeroCasa.value <=0)
     {
         numeroCasa.classList.add('is-invalid');
         infoMissing = true;
     }

     //Consulto esquina
     if (segundaCalle.value <=0)
     {
         segundaCalle.classList.add('is-invalid');
         infoMissing = true;
     }
     
     if(!infoMissing)
     {
         //Aquí ingresa si pasó los controles, irá a enviar
         //la solicitud para crear la publicación.

         getJSONData(CART_BUY_URL).then(function(resultObj){
             let msgToShowHTML = document.getElementById("resultSpan");
             let msgToShow = "";
 
             //Si la publicación fue exitosa, devolverá mensaje de éxito,
             //de lo contrario, devolverá mensaje de error.
             if (resultObj.status === 'ok')
             {
                 msgToShow = resultObj.data.msg;
             }
             else if (resultObj.status === 'error')
             {
                 msgToShow = ERROR_MSG;
             }

             bootbox.alert(msgToShow, null);
         });
     }

     //Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
     if (e.preventDefault) e.preventDefault();
         return false;
 });