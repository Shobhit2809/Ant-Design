import logo from './logo.svg';
import './App.css';
import 'antd/dist/reset.css';
import {Table} from 'antd'
import { useState } from 'react';
import {PoweroffOutlined} from '@ant-design/icons'



function App() {
  const data = [
    {
      name:'Name 1',
      age:10,
      address:'Address 1',
      key:'1'
    },
    {
      name:'Name 2',
      age:30,
      address:'Address 1',
      key:'2'
    },
    {
      name:'Name 3',
      age:30,
      address:'Address 1',
      key:'3'
    },
]

  const columns= [
    {
      title:'Name',
      dataIndex:'name',
      key:'key',
      render: name=>{
        return <a href="">{name}</a>
      }
    },
    {
      title:'Age',
      dataIndex:'age',
      key:'key',
      sorter: (a,b) => a.age - b.age
    },
    {
      title:'Address',
      dataIndex:'address',
      key:'key'
    },
    {
      title:'Graduated',
      key:'key',
      render: payload =>{
        return <p>{payload.age>20 ? 'True':'False'}</p>
      }
    }
  ]

  return (
    <div className="App">
      <header className="App-header">
        <Table dataSource={data} columns={columns}>

        </Table>
      </header>
    </div>
  );
  }

export default App;
