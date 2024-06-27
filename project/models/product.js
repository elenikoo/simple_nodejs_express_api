const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
    location: { type: String },
    stock: { type: Number }
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    warehouses: [warehouseSchema],
    status: { type: Boolean, default: false }, 
    characteristics: { type: Map, of: String } 
}, {
    collection: 'products',
    timestamps: true,
    read: 'nearest',
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeoutMS: 30000
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
