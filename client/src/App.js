import React from 'react';
import Select from './components/Select';
import './App.css';

function App() {

  return (
    <div className="App">
      <div className='App-header'>
        <h3>League of Legends (NA LCS)</h3>
        <p>Pro-play webscraper</p>
      </div>
      <header className="App-body">
        <Select />
      </header>
    </div>
  );
}

export default App;