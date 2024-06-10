import { formatCurrency } from "../scripts/utils/money.js";
export let products = []

export function loadDataFromBackend(call_bk){
  const xhr = new XMLHttpRequest()
  xhr.addEventListener('load', ()=>{
    products = JSON.parse(xhr.response).map((productDetails) => {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails)
      }
      return new Product(productDetails)
    });
    call_bk();
  })
  xhr.open('GET', 'https://supersimplebackend.dev/products')//setup a request
  xhr.send() //send request
}

class Product {
  id; name; image; rating; priceCents; keywords;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.name = productDetails.name;
    this.image = productDetails.image;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`
  }

  extraInfoHTML(){
    return ``;
  }
}

class Clothing extends Product {
  sizeChartLink;
  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink
  }

  extraInfoHTML(){
    //super.extraInfoHTML()
    return `
      <a href="${this.sizeChartLink}" target ="_blank">Size Chart</a>
    `;
  }
}

export function getProduct(productId) {
  let matchedProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchedProduct = product;
    }
  });
  return matchedProduct
}



