import React, { useContext} from 'react'
import { ContextUser } from '../components/UserContext';
import { useHistory } from 'react-router-dom';

const App = ({ logOutUser }) => {
  const { user } = useContext(ContextUser)
  const history = useHistory()

  const renderPage = () => {
    if (user && user.access_token) {
      return (
        <>
        <h1 className="App__welcome">Welcome, {user && user.name}.</h1>
        <button className="App__logout" onClick={() => {
          logOutUser()
          history.push('/')
          }}>Log Out</button>
        </>
      )
    } else {
      return (
        <section className="App">
        <h2 className="App__prompt">Welcome! Please log in to your Spotify Account.</h2>
        <a className="App__anchor" href="/login"><button className="Auth__button">Log In</button></a>
        </section>
      )
    }
  }

  return (
    <div>
      <>
      {renderPage()}
      </>
    </div>
  )
}

export default App;
