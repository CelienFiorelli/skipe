import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Echo from './echo'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    Echo.private(`App.User.${1}`)
        .listen('user.notification', (response: null) => {
    // Echo.channel(`public-updates`)
    //     .listen('public.notification', (response: null) => {
            console.log("Event received:", response);
        });

        return () => {
          Echo.leave(`App.User.${1}`)
        }
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
