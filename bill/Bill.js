class Bill{
    constructor(type, number, date, customerData, productsList) {
        this.type = type;
        this.number = number;
        this.date = date;
        this.customerData = customerData;
        this.productsList = productsList;
    }
}

module.exports = Bill