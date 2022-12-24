import Routess from './Routes';
import './App.css';
import  {Provider}  from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import createStore from "./store";
const { store, persistor } = createStore();
const App:React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routess/>
      </PersistGate>
    </Provider>
  );
}

export default App;
