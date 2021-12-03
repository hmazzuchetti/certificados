import './App.css';
import Navbar from './components/navbar/Navbar';
import Listagem from './components/listagem/Listagem';
import { store } from "../src/store/"
import { Provider } from "react-redux"
import { useEffect } from "react";


function App() {

  useEffect(() => {
    document.title = "Certificados"
  }, [])


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
