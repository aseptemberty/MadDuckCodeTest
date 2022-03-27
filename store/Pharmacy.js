const Store = require('./Store');
const { STORE_TYPES, PRODUCTS_TYPES } = require('../types');

class Pharmacy extends Store{
    constructor(name, products) {
        super(name, STORE_TYPES.PHARMACY, products)
    }

    _convertProducts(products){
        return super._convertProducts(products && products.length ? products.filter(product => product.type !== PRODUCTS_TYPES.CIGARETTES): [])
    }
}

module.exports = Pharmacy