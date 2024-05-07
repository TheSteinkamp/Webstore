document.addEventListener('DOMContentLoaded', getProducts);

function getProducts() {
    fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((data) => {
            let output = '';
            data.forEach(function (product) {
                output += `
                    <div class="col-xl-4 col-md-6">
                        <h2 class="text-dark" >${product.title}</h2>
                        <img src="${product.image}" class="card-img-top img-fluid" alt="">
                        <div class="card-body align-self-end">
                            <!-- <p class="card-text">${product.description}</p> -->
                            <p class="card-text text-dark">Price: <small class="text-muted">${product.price}$</small></p>
                            <p class="card-text text-dark">Category: <small class="text-muted">${product.category}</small></p>
                            <a id="${product.id}" href="form.html" class="align-self-end btn btn-primary">Lägg till vara</a>
                        </div>
                    </div>
                `;
            });
            document.getElementById('output').innerHTML = output;
        
            // console.log(res);
                    
            data.forEach(function (product) {
            let btn = document.getElementById(product.id);
            console.log(product.id);
            btn.addEventListener('click', function(){ saveProductToLocalstorage(product);});
                
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}
function saveProductToLocalstorage(product) {
    console.log(product);
    localStorage.setItem("selectedItem",JSON.stringify(product));
}