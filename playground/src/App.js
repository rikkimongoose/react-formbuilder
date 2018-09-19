import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {
  FormBuilder,
  VariantsTable
} from './FormBuilder'

class App extends Component {
  render() {
    const addItem = (item) => {}
  const dataSource = [
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

  const VariantsTableProps = {
    dataSource
  };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <FormBuilder />
        <VariantsTable {...VariantsTableProps} />
      </div>
    );
  }
}

export default App;
