import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'


import Index from './pages/Index'
import ElectionConstituency from './pages/ElectionConstituency'
import NominationForm from './pages/NominationForm'

const App = () => {

  return (
    <Router>
      <Route exact path='/' component={Index} />
      <Route exact path='/:address' component={ElectionConstituency} />
      <Route exact path='/:address/new' component={NominationForm} />
    </Router>
  )
}


export default App