import logo from './logo.svg';
import './App.css';
import 'antd/dist/reset.css';
import {Select} from 'antd'
import { useState } from 'react';
import {PoweroffOutlined} from '@ant-design/icons'



function App() {
  const fruits = ['Banana','Mango','Orange','Curry']

  return (
    <div className="App">
      <header className="App-header">
        <p>Which is your favourite food?</p>
        {/* You can also search in it */}
        <Select mode='multiple' allowClear maxTagCount={2} placeholder='Select fruit' style={{width:'50%'}}>
          {fruits.map((fruit,index)=>{
            return <Select.Option key={index} value={fruit}></Select.Option>
          })}
        </Select>
      </header>
    </div>
  );
}

export default App;
