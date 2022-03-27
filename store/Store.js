let {BILL_TYPES} = require("../types");
let Bill = require ("../bill/Bill");

class Store{
    constructor(name, type, products) {
        this.name = name;
        this.type = type;
        this.products = this._convertProducts(products)
        this.bills = []
    }

    _convertProducts(products){
        if (products && products.length){
            return products.reduce((target, item)=>{
                target[item.name] = item;
                return target})
        }
        else return []
    }

    #isPurchasePossible(productsToBuy){
        productsToBuy && productsToBuy.length &&
            console.log('this products', this.products)
        !productsToBuy.filter(item => this.products[item.name] && this.products[item.name].quantity <= item.quantity).length
    }

    #reduceProductQuantity(product){
        const productWithNewQuantity = {
            ...this.products[product.name],
            quantity: this.products[product.name] - product.quantity
        }
        this.products = { ...this.products, productWithNewQuantity}
    }

    #createNumber(){
        return this.bills.filter(item => item.date.getFullYear() === new Date().getFullYear()).length + 1
    }

    _createBill(type,customerData, productsList){
        const number = this.#createNumber()
        const newBill = new Bill(type,number, new Date(),  customerData, productsList)
        this.bills.push(newBill)
    }

    purchase(productsToBuy, customer){
        if (this.#isPurchasePossible(productsToBuy)){
            productsToBuy.forEach(product => this.#reduceProductQuantity(product))
            this._createBill(BILL_TYPES.SOLD,customer, productsToBuy)
        }else{
            this._createBill(BILL_TYPES.REJECTED,customer, productsToBuy)
        }

    }

    getReports(){
        console.log('get report',this.bills)
        return this.bills
    }

}

module.exports = Store