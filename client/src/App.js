import React from 'react';
import Select from './components/Select';
import './App.css';

function App() {

  return (
    <div className="App">
      <div className='App-header'>
        <h3>League of Legends (NA LCS)</h3>
        <p>Pro-play webscraper</p>
        <p className='sm'><b>(Deprecated)</b> This project no longer works due to Heroku ending free-tier servers.</p>
        <p className='sm'>The project has been reworked <a href='https://6393a8edd3b1f2073221ba3a--teal-creponne-47065d.netlify.app/' target='_blank' rel='noreferrer'>Here</a>, but I am leaving this up for now because the code was both fun and challenging :)</p>
      </div>
      <header className="App-body">
        <Select />
      </header>
    </div>
  );
}

export default App;