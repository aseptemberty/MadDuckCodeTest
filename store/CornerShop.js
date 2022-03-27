const Store = require('./Store');
const STORE_TYPES = require('../types');
const {PRODUCTS_TYPES} = require("../types");

class CornerShop extends Store{
    constructor(name, products) {
        super(name, STORE_TYPES.CORNER, products);
    }

    _convertProducts(products){
        return super._convertProducts(products && products.length ? products.filter(product => product.type !== PRODUCTS_TYPES.MEDICINE): [])
    }
}

module.exports = CornerShop