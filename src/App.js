import logo from './logo.svg';
import './App.css';
import 'antd/dist/reset.css';
import {Table, Tag} from 'antd'
import { useEffect, useState } from 'react';
import {PoweroffOutlined} from '@ant-design/icons'



function App() {
  
  const[alreadySelectedRows ,setalreadySelectedRows] = useState(['1','2'])

  const columns= [
  {
    title:'Student ID',
    dataIndex:'id'
  },
  {
    title:'Student Name',
    dataIndex:'name'
  },
  {
    title:'Student Grade',
    dataIndex:'grade',
    render:(tag)=>{
      const color = tag.includes('A')?'Green':tag.includes('B')?"blue":"red"
      return <Tag color={color} key={tag}>{tag}</Tag>
    }
  },
  ]

  const dataSource = [
    {
      key:'1',
      id:1,
      name: 'Student Name 1',
      grade:'A+'
    },
    {
      key:'2',
      id:2,
      name: 'Student Name 2',
      grade:'A'
    },
    {
      key:'3',
      id:3,
      name: 'Student Name 3',
      grade:'B'
    },
    {
      key:'4',
      id:4,
      name: 'Student Name 4',
      grade:'C'
    },
    {
      key:'5',
      id:5,
      name: 'Student Name 5',
      grade:'A'
    },
    
  ]

  return (
    <div className="App">
      <header className="App-header">
        <Table columns={columns} dataSource={dataSource} rowSelection={{
          type:'checkbox',
          selectedRowKeys:alreadySelectedRows,
          onChange:(keys)=>{
            setalreadySelectedRows(keys)
          },  
          onSelect:(record)=>{
            console.log({record});
          },
          getCheckboxProps:(record)=>({
            // if its a c grade disable selection
            disabled:record.grade === 'C'
          }),
          // hideSelectAll:true,
          selections:[
            Table.SELECTION_NONE,
            Table.SELECTION_ALL,
            // select all those which are currently not selected
            Table.SELECTION_INVERT,
            {
              key:'even',
              text:'Select Even Rows',
              // gives all keys
              onSelect:(allKeys)=>{
                const selectedKeys = allKeys.filter(key=>{
                  // even keys
                  return key %2 ==0
                })
                setalreadySelectedRows(selectedKeys)
              }
            },
            {
              key:'excellent',
              text:'Select Students with Excellent grades',
              onSelect:(allKeys)=>{
                const selectedKeys = allKeys.filter(key=>{
                    const isExcellent = dataSource.find(student =>{
                    return student.key==key && student.grade.includes('A')
                  })
                  return isExcellent
                })
                setalreadySelectedRows(selectedKeys)
              }
            }
          ]
        }}></Table>
      </header>
    </div>
  );
  }

export default App;
