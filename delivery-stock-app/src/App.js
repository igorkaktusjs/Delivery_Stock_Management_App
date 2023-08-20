import 'bootstrap/dist/css/bootstrap.min.css';
import DeliveryApp from './components/DeliveryApp';

//Redux
import { Provider } from 'react-redux'
import   store  from './components/store/store'

import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <DeliveryApp/>
      </Provider>
    </BrowserRouter>
    
  );
}

export default App;
