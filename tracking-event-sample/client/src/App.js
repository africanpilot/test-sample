import TrackingEvent from './components/TrackingEvent';
// import './App.css';

function App() {
  return (
    <div className="App" style={{
      position: 'absolute', 
      left: '25%',
      right: '25%',
      // transform: 'translate(-50%, -50%)'
  }}>
      <header className="App-header">
        <TrackingEvent/>
      </header>
    </div>
  );
}

export default App;
