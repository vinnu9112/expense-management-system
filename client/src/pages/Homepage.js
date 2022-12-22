import React, { useEffect, useState } from 'react'
import { Modal, Select, Form, Input, message, Table, DatePicker } from 'antd';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Layout from '../components/Layout/Layout'
import moment from 'moment'
import axios from 'axios';
// eslint-disable-next-line
import { render } from '@testing-library/react';
import Analytics from '../components/Layout/Analytics';
const { RangePicker } = DatePicker;

const Homepage = () => {
  const [showModal, setShowModal] = useState(false);

  const [allTransactions, setAllTransactions] = useState([]);

  const [frequency, setFrequency] = useState('7');

  const [selectedDate, setSelectedDate] = useState([]);

  const [type, setType] = useState('all');

  const [viewData, setViewData] = useState('table');

  const [editable, setEditable] = useState(null);

  const [info, setInfo] = useState({ date: "", amonut: "", category: "", type: "", reference: "", description: "" });

  const onChange = (e) => {
    e.preventDefault();
    setInfo(...info, { [e.target.name]: e.target.value })
  }


  const handleClick = () => {
    setInfo('');
    setShowModal(false);
  }

  useEffect(() => {
    const getAllTransactions = async () => {

      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await axios.post("/transactions/get-transactions", {
          userid: user._id,
          frequency,
          selectedDate,
          type
        })

        setAllTransactions(res.data);
        // message.info("data")

      } catch (error) {
        message.error("Failed to Get Transactions");
      }
    }
    getAllTransactions();


  }, [frequency, selectedDate, type]);


  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title: "Amount",
      dataIndex: "amount"
    },
    {
      title: "Category",
      dataIndex: "category"
    },
    {
      title: "Type",
      dataIndex: "type"
    },
    {
      title: "Reference",
      dataIndex: "reference"
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render : (text, record) => (
        <div>
          <EditOutlined onClick={()=>{
            setEditable(record);
            setShowModal(true);
          }}/>
          <DeleteOutlined className='mx-2' onClick={()=>{handleDelete(record)}} />
        </div>
      )
    },
  ]

  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      if(editable){
        await axios.post("/transactions/edit-transaction", { 
          payload:{...values, userid: user._id},
          transactionId: editable._id
         })
        message.success("Transaction Edited Successfully")
        setEditable(null)
      }
      else{
        await axios.post("/transactions/add-transaction", { ...values, userid: user._id })
        message.success("Transaction Added Successfully")
      }
      
    } catch (error) {
      message.error("Failed to Add Transaction")
    }
  }

  const handleDelete = async(record)=>{
    
    try {
      await axios.post('/transactions/delete-transaction', {transactionId:record._id})
      message.success("Deleted Successfully")
      console.log("clicked");
    } catch (error) {
      message.error("Failed to Delete Transaction")
    }
  }
  return (
    <Layout>
      <div className="filters container my-2">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => { setSelectedDate(values) }}
            />
          )}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>

        </div>
        <div className="switch-icons">
          <UnorderedListOutlined 
          className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} 
          onClick={() => { setViewData('table') }} />

          <AreaChartOutlined 
          className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} 
          onClick={() => { setViewData('analytics') }} />
        </div>
        <div><button className='btn btn-outline-primary' onClick={() => setShowModal(true)}>Add Transaction</button></div>
      </div>
      <div className="content">
          {viewData === 'table' ? <Table columns={columns} dataSource={allTransactions} />: <Analytics allTransactions={allTransactions} />}
      </div>
      <Modal
        title={editable ? "Edit Transaction": "Add Transaction"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
        onChange={onChange}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={editable}
          onFinish={onFinish}
          autoComplete="on"
        >
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: 'Please input your amount!' }]}
          >
            <Input />
          </Form.Item >

          <Form.Item label="Type"
            name="type"
            rules={[{ required: true, message: 'Please add type!' }]}>
            <Select >
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please enter category!' }]}
          >
            <Select >
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
              <Select.Option value="fees">Fees</Select.Option>
              <Select.Option value="travel">Travel</Select.Option>
              <Select.Option value="others">Others</Select.Option>
            </Select>
          </Form.Item >

          <Form.Item
            label="Reference"
            name="reference"
            rules={[{ required: true, message: 'Please enter reference!' }]}
          >
            <Input />
          </Form.Item >

          <Form.Item
            label="Description"
            name="description"
            
          >
            <Input />
          </Form.Item >

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please enter date!' }]}
          >
            <Input type="date" />
          </Form.Item >
          <div className='d-flex justify-content-end'>
            <button className='btn btn-primary' onClick={handleClick} type="submit">Save</button>
          </div>
        </Form>
      </Modal>
    </Layout>

  )
}

export default Homepage
