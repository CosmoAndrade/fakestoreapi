import './App.css'
import { AuthProvider } from './contexts/auth'

import RoutesApp from './routes'


function App() {


  return (
    <div className="App">

    <AuthProvider>

    <RoutesApp />


    </AuthProvider>




    </div>
  )
}

export default App
