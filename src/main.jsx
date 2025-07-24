import { Toaster } from 'react-hot-toast';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { store } from './Store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
     <App />
     <Toaster position="top-right" />
  </Provider>
)
