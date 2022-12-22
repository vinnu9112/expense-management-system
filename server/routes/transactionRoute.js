const express = require('express');
const { addTransaction, getAllTransactions, editTransaction, deleteTransaction } = require('../controllers/transactionController');  


//router object
const router = express.Router();

//routers
//POST || ADD TRANSACTION
router.post('/add-transaction', addTransaction);

//POST || EDIT TRANSACTION
router.post('/edit-transaction', editTransaction);

//POST || DELETE TRANSACTION
router.post('/delete-transaction', deleteTransaction);

//POST || GET ALL TRANSACTION
router.post('/get-transactions', getAllTransactions);

module.exports = router;