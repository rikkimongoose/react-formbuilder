import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {
  ControlEdit,
  ControlEditor,
  ControlPreview,
  ControlsCountainer,
  ControlsPalette,
  FormBuilderMode,
  FormBuilder,
  GeneratedForm
} from './FormBuilder'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <FormBuilder />
      </div>
    );
  }
}

export default App;
