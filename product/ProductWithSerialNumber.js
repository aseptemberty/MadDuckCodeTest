const Product = require('./Product')
const PRODUCTS_TYPES = require('../types')

class ProductWithSerialNumber extends Product{
    constructor(name, type, price ,quantity) {
        super(name, type, price ,quantity);
        this.serialNumber = this._createSerialNumber()
    }

    _createSerialNumber(){
        return this.type === PRODUCTS_TYPES.CIGARETTES  || this.type === PRODUCTS_TYPES.PARKING_TICKETS ? null : Math.random().toFixed(5) * 100000
    }
}

module.exports = ProductWithSerialNumber
