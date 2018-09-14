import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {
  FormBuilder,
  VariantsList
} from './FormBuilder'

class App extends Component {
  render() {
  const values = [
      {
        "label": "Вариант 1",
        "value": "option-1"
      },
      {
        "label": "Вариант 2",
        "value": "option-2"
      },
      {
        "label": "Вариант 3",
        "value": "option-3"
      }
    ];

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <FormBuilder />
        <VariantsList source={values} />
      </div>
    );
  }
}

export default App;
