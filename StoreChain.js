const Product = require("./product/Product");
const ProductWithSerialNumber = require("./product/ProductWithSerialNumber");
const Supermarket = require("./store/Supermarket");
const CornerShop = require("./store/CornerShop");
const Pharmacy = require("./store/Pharmacy")
const Customer = require("./Customer");
const { PRODUCTS_TYPES} = require('./types');

function Test(){
    const firstProduct =  new Product('Teddy Bear', PRODUCTS_TYPES.TOYS, 5, 5)
    const firstProductPurchase = new Product('Teddy Bear', PRODUCTS_TYPES.TOYS, 10, 5)
    const secondProduct = new ProductWithSerialNumber('Malboro', PRODUCTS_TYPES.CIGARETTES, 5, 5)
    const secondProductPurchase = new ProductWithSerialNumber('Malboro', PRODUCTS_TYPES.CIGARETTES, 3, 5)
    const thirdProduct = new Product('Water', PRODUCTS_TYPES.DRINK, 5, 5)
    const thirdProductPurchase = new Product('Water', PRODUCTS_TYPES.DRINK, 3, 5)
    const forthProduct = new Product('Nurofen', PRODUCTS_TYPES.MEDICINE, 5, 5)
    const forthProductPurchase = new Product('Nurofen', PRODUCTS_TYPES.MEDICINE, 1, 5)
    const customer = new Customer('John', 'Dow', '8-800-555-35-35')
    const Idea = new Supermarket('Idea', [firstProduct, secondProduct])
    const Pharma = new Pharmacy('Pharmacy',[thirdProduct, forthProduct])
    const ShopGo = new CornerShop('24/7', [secondProduct, forthProductPurchase, firstProduct])

    Idea.purchase([secondProductPurchase], customer)
    Idea.purchase([forthProductPurchase], customer)
    Pharma.purchase([thirdProductPurchase], customer)
    Pharma.purchase([firstProductPurchase], customer)
    ShopGo.purchase([thirdProductPurchase], customer)
    ShopGo.purchase([secondProductPurchase], customer)

    function GetShopReposts(){
        Idea.getReports();
        ShopGo.getReports();
        Pharma.getReports()
    }
    GetShopReposts();
}

Test()