import './App.css';
import {useState} from 'react'
import { Counter } from './components/Counter';
import {contractAddress, connex, Contract} from './config/connex'

/**
 *  The Contract Object allows us to access all functions in our smart contract by just calling 
 * Contract.methodName(args)
 */

function App() {
  const [signer, setSigner] = useState("");
  function increase() {
    Contract.increase()
  }

  function decrease() {
    Contract.decrease()
  }

  function reset() {
    Contract.reset()
  }

  // This can be used to get user's identification
  function login() {
    connex.vendor
      .sign("cert", {
        purpose: "identification",
        payload: {
          type: "text",
          content: "Please sign this certificate to login"
        }
      })
      //.accepted(() => alert("accepted"))
      .request()
      .then((r) => {
        setSigner(r.annex.signer)
      })
      .catch((e) => console.log("error:" + e.message));
  }
  function logout() {
    setSigner("")
  }
  function isSignedIn() {
    return signer != ""
  }
  return (
    <div className="App">
      <header className="App-header">
      <h1 className='title'>VeCounter</h1>
      {
        isSignedIn() ?
        <button className='App-button' onClick={logout}>Disconnect</button> :
        <button className='App-button' onClick={login}>Connect Sync</button>
      }
      </header>
      <main className='App-main'>
        {isSignedIn() && <p className='signer'>Signer: {signer}</p>}
        <Counter/>
          <div className='counter-buttons'>
            <button className='App-button' onClick={increase}>Increase</button>
            <button className='App-button' onClick={decrease}>Decrease</button>
          </div>
          <button className='App-button' onClick={reset}>Reset</button>
      </main>
      <footer className='App-footer'>
        <p>Hexdee &copy;2022</p>
      </footer>
    </div>
  );
}

export default App;
