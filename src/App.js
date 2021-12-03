import './App.css';
import Navbar from './components/navbar/Navbar';
import Listagem from './components/listagem/Listagem';
import Popups from './components/popups/Popups';
import { store, persistor } from "../src/store/"
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'

function App() {



  return (
    <>
      <Provider store={store}>
        <div className="App">
          <Navbar />
          <Listagem />
        </div >
      </Provider>
    </>
  );
}

export default App;
