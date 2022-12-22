const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userid:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required:[true, 'amount is required']
    },
    type:{
        type: String,
        required:[true, 'type is required']
    },
    category:{
        type: String,
        required:[true, 'category is required']
    },
    description:{
        type: String,
        
    },
    reference:{
        type: String,
        required:[true, 'reference is required']
    },
    date:{
        type: Date,
        required:[true, 'date is required']
    },
},
    {timestamps: true}
)

//export 
const transactionModel = mongoose.model('transactions', transactionSchema) 
module.exports = transactionModel;