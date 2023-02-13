import logo from './logo.svg';
import './App.css';
import 'antd/dist/reset.css';
import {Button, Table,Modal,Input} from 'antd'
import { useEffect, useState } from 'react';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'


function App() {
  
  const[isEditing,setIsEditing] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)

  const columns= [
  {
    key:'1',
    title:'ID',
    dataIndex:'id'
  
  },
  {
    key:'2',
    title:'Name',
    dataIndex:'name'
  },
  {
    key:'3',
    title:'Email',
    dataIndex:'email'
  },
  {
    key:'4',
    title:'Address',
    dataIndex:'address'
  },
  {
    key:'5',
    title:'Actions',
    // record maane ek single row jisko delete karna hai
    render:(record)=>{
      return(
        <>
        <EditOutlined onClick={()=>{oneditStudent(record)}}/>
        <DeleteOutlined onClick={()=>{onDeleteStudent(record)}} style={{color:"red",marginLeft:12}}/>
        </>
      )
    }
  }
  ]

  const [dataSource, setDataSource] = useState([
    {
      id:1,
      name:'John',
      email:'john@gmail.com',
      address:'john Address'
    },
    {
      id:2,
      name:'lund',
      email:'lund@gmail.com',
      address:'lund Address'
    },
    {
      id:3,
      name:'bhand',
      email:'bhand@gmail.com',
      address:'bhand Address'
    },
    {
      id:4,
      name:'ghamnad',
      email:'ghamnad@gmail.com',
      address:'ghamnad Address'
    },
    {
      id:5,
      name:'phirse lund',
      email:'phirse lund@gmail.com',
      address:'phirse lund Address'
    },
  ])

  const onAddStudent=()=>{
    const randomNumber = parseInt(Math.random()*1000)
    const newStudent = {
      id:randomNumber,
      name: "Name "+randomNumber,
      email: randomNumber+"@gmail.com",
      address: "Address "+randomNumber
    }
    setDataSource(pre=>{
      return [...pre,newStudent]
    })
  }

  const onDeleteStudent = (record)=>{
    Modal.confirm({
      title:'Are you sure you want to delete this student?',
      okText:"Yes",
      okType:"danger",
      onOk:()=>{
        setDataSource(pre=>{
          return pre.filter(student => student.id!=record.id)
        })
      }
    })
  }
  const oneditStudent = (record) =>{
    setIsEditing(true)
    setEditingStudent({...record})
  } 
  const resetEditing = ()=>{
    setIsEditing(false)
    setEditingStudent(null)
  }
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={onAddStudent}>Add a new Student</Button>
      <Table columns={columns} dataSource={dataSource} ></Table>
      <Modal title="Edit Student" 
      visible={isEditing} 
      onCancel={()=>{resetEditing()}} 
      onOk={()=>{
        setDataSource(pre=>{
          return pre.map(student=>{
            if(student.id === editingStudent.id){
              return editingStudent
            }
            else{return student}
          })
        })
        resetEditing()
      }}
      okText="Save"
      >
        {/* if it is not null */}
        <Input value={editingStudent?.name} onChange={(e)=>{
          setEditingStudent(pre=>{
            return {...pre, name:e.target.value}
          })
        }}/>
        <Input value={editingStudent?.email} onChange={(e)=>{
          setEditingStudent(pre=>{
            return {...pre, email:e.target.value}
          })
        }}/>
        <Input value={editingStudent?.address} onChange={(e)=>{
          setEditingStudent(pre=>{
            return {...pre, address:e.target.value}
          })
        }}/>
      </Modal>
      </header>
    </div>
  );
    }

export default App;
