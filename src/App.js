import logo from './logo.svg';
import './App.css';
import 'antd/dist/reset.css';
import {Button,Input} from 'antd'
import { useState } from 'react';
import {UserOutlined} from '@ant-design/icons'

const App = ()=>{
  return (
    <div className="App">
      <header className="App-header">
        <Input placeholder='Name' maxLength={10} type='password' 
        prefix={<UserOutlined/>} allowClear>
        </Input>
        <Input.Search placeholder='Name' maxLength={10} type='password' 
        prefix={<UserOutlined/>} allowClear>
        </Input.Search>
      </header>
    </div>
  );
  }

export default App;
