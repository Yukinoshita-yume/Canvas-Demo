import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Title from './component/title/title.jsx'
import Document from './component/document/document.jsx'
import Board from './component/board/board.jsx'

function App() {

  return (
    <div className="App">
      <Board />
    </div>
  )
}

export default App
