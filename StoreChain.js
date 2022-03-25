const STORE_TYPES =  {
    CORNER: 'Corner' ,
    SUPERMARKET:'Supermarket',
    PHARMACY:'Pharmacy'
}

const PRODUCTS_TYPES = {
    FOOD: 'Food',
    DRINK: 'Drink',
    MEDICINE: 'Medicine',
    CIGARETTES: 'Cigarettes',
    TOYS: 'Toys',
    PARKING_TICKETS : 'ParkingTickets'
}

const BILL_TYPES ={
    REJECTED:'Rejected',
    SOLD: 'Sold'
}

class Bill{
    constructor(type, number, customerData, productsList) {
        this.type = type;
        this.Number = number;
        this.Date = new Date();
        this.customerData = customerData;
        this.productsList = productsList;
    }
}

class Product{
    constructor(name, type, price ,quantity) {
        this.name = name;
        this.type = type;
        this.quantity = quantity;
        this.price = price;
        this.serialNumber = this._createSerialNumber();
    }

    _createSerialNumber(){
        return this.type === PRODUCTS_TYPES.CIGARETTES  || this.type === PRODUCTS_TYPES.PARKING_TICKETS ? null : Math.random().toFixed(5) * 100000
    }
}

class Store{
    constructor(name, type, products) {
        this.name = name;
        this.type = type;
        this.products = this._filterProductsToSell(products)
        this.bills = []
    }

    _filterProductsToSell(products){
        if (this.type === STORE_TYPES.CORNER){
            return products.filter(item => item.type !== PRODUCTS_TYPES.MEDICINE).reduce((target, item)=>{
                target[item.name] = item;
                return target
            })
        } else
        if (this.type === STORE_TYPES.PHARMACY){
            return products.filter(item => item.type !== PRODUCTS_TYPES.CIGARETTES).reduce((target, key, index)=>{
                target[index] = key;
                return target
            })
        }
        else if(this.type === STORE_TYPES.SUPERMARKET){
            return products.filter(item => !(item.type === PRODUCTS_TYPES.MEDICINE || item.type ===PRODUCTS_TYPES.CIGARETTES )).reduce((target, key, index)=>{
                target[index] = key;
                return target
            })
        }
    }

    _isPurchasePossible(productsToBuy){
        productsToBuy && productsToBuy.length &&
        !productsToBuy.filter(item => this.products[item.name] && this.products[item.name].quantity <= item.quantity).length
    }

    _reduceProductQuantity(product){
        const productWithNewQuantity = {
            ...this.products[product.name],
            quantity: this.products[product.name] - product.quantity
        }
        this.products = { ...this.products, productWithNewQuantity}
    }


    _createBill(type,customerData, productsList){
        const newBill = new Bill(type,this.bills.length + 1, customerData, productsList)
        this.bills.push(newBill)
    }

    purchase(productsToBuy, customer){
        if (this._isPurchasePossible(productsToBuy)){
            productsToBuy.forEach(product => this._reduceProductQuantity(product))
            this._createBill(BILL_TYPES.SOLD,customer, productsToBuy)
        }else{
            this._createBill(BILL_TYPES.REJECTED,customer, productsToBuy)
        }

    }

    getReports(){
        console.log(this.bills)
        return this.bills
    }

}

class Customer {
    constructor(name, surname, phone) {
        this.name = name;
        this.surname = surname;
        this.phone = phone;
    }
}

function Test(){
    const firstProduct =  new Product('Teddy Bear', PRODUCTS_TYPES.TOYS, 5, 5)
    const firstProductPurchase = new Product('Teddy Bear', PRODUCTS_TYPES.TOYS, 10, 5)
    const secondProduct = new Product('Malboro', PRODUCTS_TYPES.CIGARETTES, 5, 5)
    const secondProductPurchase = new Product('Malboro', PRODUCTS_TYPES.CIGARETTES, 3, 5)
    const thirdProduct = new Product('Water', PRODUCTS_TYPES.DRINK, 5, 5)
    const thirdProductPurchase = new Product('Water', PRODUCTS_TYPES.DRINK, 3, 5)
    const forthProduct = new Product('Nurofen', PRODUCTS_TYPES.MEDICINE, 5, 5)
    const forthProductPurchase = new Product('Nurofen', PRODUCTS_TYPES.MEDICINE, 1, 5)
    const customer = new Customer('John', 'Dow', '8-800-555-35-35')
    const Supermarket = new Store('Idea', STORE_TYPES.SUPERMARKET, [firstProduct, secondProduct])
    const Pharmacy = new Store('Pharmacy', STORE_TYPES.PHARMACY, [thirdProduct, forthProduct])
    const CornerShop = new Store('24/7', STORE_TYPES.CORNER, [secondProduct, forthProductPurchase, firstProduct])

    Supermarket.purchase([firstProductPurchase], customer)
    Supermarket.purchase([secondProductPurchase], customer)
    Pharmacy.purchase([forthProductPurchase], customer)
    Pharmacy.purchase([thirdProductPurchase], customer)
    CornerShop.purchase([thirdProductPurchase], customer)
    CornerShop.purchase([forthProductPurchase], customer)

    function GetShopReposts(){
        Pharmacy.getReports();
        CornerShop.getReports();
        Supermarket.getReports();
    }
    GetShopReposts();
}

Test()