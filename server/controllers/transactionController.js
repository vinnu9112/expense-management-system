const transactionModel = require('../models/transactionModel');
const moment = require("moment");

//login callback
const getAllTransactions = async (req, res)=>{
    try {
        const {frequency, selectedDate, type} = req.body;
        const transactions = await transactionModel.find({
            ...(frequency !== 'custom' ? {
                date:{
                $gt: moment().subtract(Number(frequency), 'd').toDate(),
            }} : {
                date: {
                    $gte: selectedDate[0],
                    $lte: selectedDate[1]
                    }
            }),
            userid: req.body.userid,
            ...(type !=='all' && {type})    
        });
        res.status(200).json(transactions);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
}

const deleteTransaction = async(req, res)=>{
    try {
        await transactionModel.findOneAndDelete({_id: req.body.transacationId});
        res.status(200).send("Deleted Successfully")
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
}

const editTransaction = async (req, res) => {
    try {
      await transactionModel.findOneAndUpdate(
        { _id: req.body.transacationId },
        req.body.payload
      );
      res.status(200).send("Edited Successfully");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

//register callback
const addTransaction = async (req, res)=>{
    try {
    //    const {amount, category, description, date, type} = req.body;
       let newTransaction = new transactionModel(req.body);
       await newTransaction.save()
       res.status(201).json({newTransaction});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

}

module.exports = {getAllTransactions, addTransaction, editTransaction, deleteTransaction};