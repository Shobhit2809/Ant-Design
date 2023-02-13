import logo from './logo.svg';
import './App.css';
import 'antd/dist/reset.css';
import {Button} from 'antd'
import { useState } from 'react';
import {PoweroffOutlined} from '@ant-design/icons'

function App() {
  const dabaMera = (e) =>{
    console.log('daba diya');
  }
  const[loading,setLoading] = useState(true)
  setTimeout(()=>{
    setLoading(false)
  },2000)


  return (
    <div className="App">
      <header className="App-header">
        <Button type='primary' block onClick={dabaMera} loading={loading}
        className='my_button'
        style={{backgroundColor:'orange',color:'red'}}
        icon={<PoweroffOutlined/>}>
          Lauda Mera
        </Button>
      </header>
    </div>
  );
}

export default App;
