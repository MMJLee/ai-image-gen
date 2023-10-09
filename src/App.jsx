import { useState } from 'react'
import './App.css'

function App() {
  const [image, setImage] = useState("")
  const [input, setInput] = useState("")

  async function handleSubmit(e) {
    e.preventDefault();
    if (input.length < 3) {
      return
    }
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method:"POST", 
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`},
      body: JSON.stringify({
        prompt: input,
        n:1,
        size:"512x512"
      })
    })
    setInput("")
    setImage(response.data.url)
  }
  return (
    <div>
      <h1> AI Image Generator</h1>
      <div> <img src={image}></img> </div>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={e => setInput(e.target.value)}></input>
        <button>Generate</button>
      </form>
    </div>
  )
}

export default App
