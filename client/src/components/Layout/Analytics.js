import { Progress } from 'antd';
import React from 'react'

const Analytics = ({allTransactions}) => {
    //category
    const categories = [
        'food',
        'salary',
        'medical',
        'tax',
        'fees',
        'travel',
        'other'
    ]

    //total transactions
    const totalTransactions = allTransactions.length;
    const totalIncomeTransaction = allTransactions.filter((transaction)=> transaction.type === 'income');
    const totalExpenseTransaction = allTransactions.filter((transaction)=> transaction.type === 'expense');
    const totalIncomePercent = (totalIncomeTransaction.length/totalTransactions)*100;
    const totalExpensePrecent = (totalExpenseTransaction.length/totalTransactions)*100;

    //total turnover
    const totalTurnover = allTransactions.reduce((acc, transaction)=> acc + transaction.amount, 0);

    const totalIncomeTurnover = allTransactions.filter((transaction)=> transaction.type === 'income').reduce((acc, transaction)=> acc + transaction.amount, 0);

    const totalExpenseTurnover = allTransactions.filter((transaction)=> transaction.type === 'expense').reduce((acc, transaction)=> acc + transaction.amount, 0);

    const incomeTurnoverPercent = (totalIncomeTurnover/totalTurnover)*100;
    const expenseTurnoverPercent = (totalExpenseTurnover/totalTurnover)*100;

  return (
    <div className='container'>
    <div className="col- m-3 container">
        <div className="row-md-3 mx-3">
            <div className="card">
                <div className="card-header">
                    <h3>Total Transactions: {totalTransactions}</h3>
                </div>
                <div className="card-body">
                    <h5 className='text-primary'>Income Transactions: {totalIncomeTransaction.length}</h5>
                    <h5 className='text-danger'>Expense Transactions: {totalExpenseTransaction.length}</h5>
                </div>
                <div>
                    <Progress type='circle' 
                    strokeColor={'primary'} 
                    className='m-2 ' 
                    percent={totalIncomePercent.toFixed(0)} />
                    <Progress type='circle' 
                    strokeColor={'red'} 
                    className=' m-2' 
                    percent={totalExpensePrecent.toFixed(0)} />
                </div>
            </div>
        </div>
        <div className="row-md-3">
            <div className="card">
                <div className="card-header">
                    <h3>Total Turnover: {totalTurnover}</h3>
                </div>
                <div className="card-body">
                    <h5 className='text-primary'>Income : {totalIncomeTurnover}</h5>
                    <h5 className='text-danger'>Expense : {totalExpenseTurnover}</h5>
                </div>
                <div>
                    <Progress type='circle' 
                    strokeColor={'primary'} 
                    className='m-2 ' 
                    percent={incomeTurnoverPercent.toFixed(0)} />
                    <Progress type='circle' 
                    strokeColor={'red'} 
                    className=' m-2' 
                    percent={expenseTurnoverPercent.toFixed(0)} />
                </div>
            </div>
        </div>
        <div className='col mt-3 d-flex container mx-2'>
            <div className="row-md-3 mx-2">
            <div className="card">
                <div className="card-header">
                <h5>Categorywise Income</h5>
                </div>
                </div>
                {
                    categories.map((category)=>{
                        const amount = allTransactions
                        .filter(
                         (transaction) =>
                            transaction.type === 'income' && 
                            transaction.category === category
                        ).reduce((acc, transaction)=>acc + transaction.amount,0);
                        return(
                            amount > 0 && (<div className="card">
                                <div className="card-body">
                                    <h5>{category}</h5>
                                    <Progress
                                      percent={((amount/totalIncomeTurnover)*100).toFixed(0)}  />
                                </div>
                            </div>)
                        )
                    })
                }
            </div>
            <div className="row-md-3">
                <div className="card">
                <div className="card-header">
                <h5>Categorywise Expense</h5>
                </div>
                </div>
                {
                    categories.map((category)=>{
                        const amount = allTransactions
                        .filter(
                         (transaction) =>
                            transaction.type === 'expense' && 
                            transaction.category === category
                        ).reduce((acc, transaction)=>acc + transaction.amount,0);
                        return(
                            amount > 0 && (<div className="card ">
                                <div className="card-body">
                                    <h5>{category}</h5>
                                    <Progress
                                      percent={((amount/totalExpenseTurnover)*100).toFixed(0)}  />
                                </div>
                            </div>)
                        )
                    })
                }
            </div>
        </div>
        
        
    </div>      
    </div>
  )
}

export default Analytics
