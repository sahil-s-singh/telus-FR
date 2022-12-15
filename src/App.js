import logo from './logo.svg';
import './App.css';
import ContractCategory from './components/ContractCategory';
import ContractStatus from './components/ContractStatus';

function App() {
  return (
    <div className="App">
      <ContractCategory />
      <ContractStatus />
    </div>
  );
}

export default App;
