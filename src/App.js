import logo from './logo.svg';
import './App.css';
import 'antd/dist/reset.css';
import {Table} from 'antd'
import { useEffect, useState } from 'react';
import {PoweroffOutlined} from '@ant-design/icons'



function App() {
  
  const[loading,setLoading]  = useState(false)
  const [dataSource, setdataSource] = useState([])
  const [page,setPage] = useState(1)
  const [pageSize,setPageSize] = useState(10)

  useEffect(()=>{
    setLoading(true)
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then(response=>response.json())
    .then(data=>setdataSource(data))
    .catch(err=>{console.log(err);})
    .finally(setLoading(false))
  },[])

  const columns= [
  {
    key:"1",
    title:'ID',
    dataIndex:'id'
  },
  {
    key:"2",
    title:'User ID',
    dataIndex:'userId',
    sorter:(record1,record2)=>{
      return record1.userId>record2.userId
    }
  },
  {
    key:"3",
    title:'Status',
    dataIndex:'completed',
    render:(completed)=>{
      return <p>{completed?'Complete':'In Progress'}</p>
    },
    filters:[
      {text:'Complete',value:true},
      {text:'In Progress',value:false}
    ],
    onFilter:(value, record)=>{
      return record.completed === value
    }
  },
  ]

  return (
    <div className="App">
      <header className="App-header">
        <Table loading={loading} dataSource={dataSource} 
        columns={columns} pagination={{
          current:page,
          // rows per page
          pageSize:pageSize,
          onChange:(page,pageSize)=>{
            setPage(page)
            setPageSize(pageSize)
          }

        }}>

        </Table>
      </header>
    </div>
  );
  }

export default App;
