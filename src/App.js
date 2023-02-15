import logo from './logo.svg';

import 'antd/dist/reset.css';
// put css after that of antdesign
import './App.css';
import {Form,Table,Button,Modal,Input} from 'antd'
import { useEffect, useState } from 'react';
import axios from 'axios';

const {Item} = Form
const baseUrl = "http://localhost:3001/artistas";

const layout = {
  labelCol:{
    span: 8
  },
  wrapperCol:{
    span:16
  }
}

function App() {
  
  const[data,setData] = useState([])
  const [modalInsert, setModalInsert] = useState(false)
  const[modalEdit,setModalEdit] = useState(false)
  const[modalDelete,setModalDelete] = useState(false)
  const[artista, setArtista] = useState({
    // name of attributes should match with the api
    id:'',
    artista:'',
    pais:'',
    periodo:''
  })

  const insertModal=()=>{
    setModalInsert(!modalInsert)
  }
   const editModal=()=>{
    setModalEdit(!modalEdit)
  }
   const deleteModal=()=>{
    setModalDelete(!modalDelete)
  }

  const handleChange = e =>{
    const{name, value} = e.target
    setArtista({
      ...artista,
      [name]:value ,
    })
  }

  const selectArtist = (fila, caso)=>{
    setArtista(fila);
    (caso==="Editar")?editModal():deleteModal();
  }

  const columns = [
    {
      title:'ID',
      dataIndex:'id',
      key:'id'
    },
    {
      title:'Artista',
      dataIndex:'artista',
      key:'artista'
    },
    {
      title:'Pais',
      dataIndex:'pais',
      key:'pais'
    },
    {
      title:'Periodo de actividad',
      dataIndex:'periodo',
      key:'periodo'
    },
    {
      title:'actions',
      key:'actions',
      // fila is the row
      render:(fila)=>(
        <>
        <Button type='primary' onClick={()=>selectArtist(fila,"Editar")}>Edit</Button>{" "}
        <Button type='primary' danger onClick={()=>selectArtist(fila,"dlete")}>delete</Button>

        </>
      )
    },

  ]
 
  const peticionGet = async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data)
      console.log(response.data)
    }).catch(error=>{
      console.log(error)
    })
  }

  const peticionPost = async()=>{
    delete artista.id
    await axios.post(baseUrl,artista)
    .then(response=>{
      setData(data.concat(response.data))
      insertModal()
    }).catch(error=>{
      console.log(error)
    })
  }

  const peticionPut = async()=>{
    await axios.put(baseUrl+"/"+artista.id,artista)
    .then(response=>{
      var dataAuxiliar = data;
      dataAuxiliar.map(elemento=>{
        if(elemento.id === artista.id){
          elemento.artista = artista.artista
          elemento.pais=artista.pais
          elemento.periodo = artista.periodo
        }
      })
      setData(dataAuxiliar)
      editModal()
    }).catch(error=>{
      console.log(error)
    })
  }

  const peticionDelete = async()=>{
    await axios.delete(baseUrl+"/"+artista.id)
    .then(response=>{
      setData(data.filter(elemento=>elemento.id!=artista.id))
      deleteModal()
    }).catch(error=>{
      console.log(error)
    })
  }

  useEffect(()=>{
    peticionGet()
  },[])

  return (
    <div className="App">
      <br/>
      <br/>
      <Button type='primary' className='insertButton' onClick={insertModal}>Insert</Button>
      <br/>
      <br/>
     <Table columns={columns} dataSource={data}></Table>

    {/* INSERT MODAL */}

     <Modal
     visible={modalInsert}
     title="Insert new task"
    //  on close remove input data
     destroyOnClose={true}
     onCancel={insertModal}
     centered
     footer={[
      <Button onClick={insertModal}>Cancel</Button>,
      <Button type='primary' onClick={peticionPost}>Insert</Button>
     ]}
     >
      <Form {...layout}>
        {/* name of input should match with api attributes name for handleChange 
        to work */}
        <Item label="Artista">
          <Input name='artista' onChange={handleChange}/>
        </Item>

        <Item label="Pais">
          <Input name='pais' onChange={handleChange}/>
        </Item>

        <Item label="Artista">
          <Input name='periodo' onChange={handleChange}/>
        </Item>
      </Form>
     </Modal>

    {/* EDIT MODAL */}

     <Modal
     visible={modalEdit}
     title="Edit task"
    //  on close remove input data
    //  destroyOnClose={true}
     onCancel={editModal}
     centered
     footer={[
      <Button onClick={editModal}>Cancel</Button>,
      <Button type='primary' onClick={peticionPut}>Edit</Button>
     ]}
     >
      <Form {...layout}>
        {/* name of input should match with api attributes name for handleChange 
        to work */}
        <Item label="Artista">
          {/* when artista exists */}
          <Input name='artista' onChange={handleChange} value={artista && artista.artista}/>
        </Item>

        <Item label="Pais">
          <Input name='pais' onChange={handleChange} value={artista && artista.pais}/>
        </Item>

        <Item label="Artista">
          <Input name='periodo' onChange={handleChange} value={artista && artista.periodo}/>
        </Item>
      </Form>
     </Modal>

{/* DELETE MODAL */}

     <Modal
     visible={modalDelete}
    
    //  on close remove input data
    //  destroyOnClose={true}
     onCancel={deleteModal}
     centered
     footer={[
      <Button onClick={deleteModal}>Cancel</Button>,
      <Button type='primary' onClick={peticionDelete} danger>Delete</Button>
     ]}
     >
      Are you sure you want to delete this task <b>{artista && artista.artista}</b>
     </Modal>


    </div>

  );
    }

export default App;
