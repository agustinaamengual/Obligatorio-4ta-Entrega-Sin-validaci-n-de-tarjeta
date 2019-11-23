const ORDER_ASC_BY_COST = "$-$$";
const ORDER_DESC_BY_COST = "$$-$";
const ORDER_BY_PROD_COST = "Cant.";
var minCost = undefined;
var maxCost = undefined;

var currentProductsArray = [];
var currentSortCriteria = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COST){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.productCost);
            let bCost = parseInt(b.productCost);

            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;
        });
    }

    return result;
}

var currentProductsArray = [];

function showProductsList(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let products = currentProductsArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(products.cost) >= minCost)) &&
        ((maxCost == undefined) || (maxCost != undefined && parseInt(products.cost) <= maxCost))){


        htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ products.name +`</h4>
                            <small class="text-muted">`  + products.cost + " " + products.currency + ` </small>
                           
                        </div>
                        <p class="mb-1">` + products.description + `</p>
                       
                    </div>
                    
                </div>
            </a>`
        }
}
  document.getElementById("products-list-container").innerHTML = htmlContentToAppend;
    }

    function sortAndShowProducts(sortCriteria, productsArray){
        currentSortCriteria = sortCriteria;
    
        if(productsArray != undefined){
            currentProductsArray = productsArray;
        }
    
        currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    9
        //Muestro las categorías ordenadas
        showProductsList();
    }



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            currentProductsArray = resultObj.data;
            showProductsList(currentProductsArray);
        }
    })
    
});
document.getElementById("sortAsc").addEventListener("click", function(){
    sortAndShowProducts(ORDER_ASC_BY_COST);
});

document.getElementById("sortDesc").addEventListener("click", function(){
    sortAndShowProducts(ORDER_DESC_BY_COST);
});

document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCostMin").value = "";
    document.getElementById("rangeFilterCostMax").value = "";

    minCost = undefined;
    maxCost = undefined;

    showProductsList();
});

document.getElementById("rangeFilterCost").addEventListener("click", function(){
    minCost = document.getElementById("rangeFilterCostMin").value;
    maxCost = document.getElementById("rangeFilterCostMax").value;

    if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
        minCost = parseInt(minCost);
    }
     else{
        minCost = undefined;
    }

    if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
        maxCost = parseInt(maxCost);
    }
     else{
        maxCost = undefined;
    }

    showProductsList();
});