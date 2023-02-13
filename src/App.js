import logo from './logo.svg';
import './App.css';
import 'antd/dist/reset.css';
import {Button, Table,Modal,Input} from 'antd'
import { useEffect, useState } from 'react';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'


function App() {
  
  const[searchedText,setsearchedText] = useState(' ')
  return (
    <div className="App">
      <header className="App-header">
        <Input.Search placeholder='Search here' style={{marginBottom: 8}}
        onSearch={(value)=>{
          setsearchedText(value)
        }
      }
      onChange={(e)=>{
        setsearchedText(e.target.value)
      }}
        />
        <Table columns={[
          {title:"Name",
           dataIndex:'name',
           filteredValue:[searchedText],
           onFilter:(value, record) =>{
            return String(record.name)
            .toLowerCase
            .includes(value.toLowerCase()) ||
            String(record.age)
            .toLowerCase
            .includes(value.toLowerCase()) ||
            String(record.address)
            .toLowerCase
            .includes(value.toLowerCase())
           }
          },
           {title:"Age",
          dataIndex:'age'},
          {title:"Address",
        dataIndex:'address'},
        ]}
        dataSource={[
          {
            key:1,
            name:'A Name',
            age:10,
            address:'A address'
          },
          {
            key:1,
            name:'B Name',
            age:20,
            address:'B address'
          },
          {
            key:1,
            name:'C Name',
            age:30,
            address:'C address'
          },
          
        ]}
        ></Table>
      </header>
    </div>
  );
    }

export default App;
