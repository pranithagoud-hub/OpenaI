import {useState} from 'react'

function App() {
  const [number, setNumber] = useState('')
  const [meaning, setMeaning] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMeaning('')

    try {
      const res = await fetch('http://localhost:5000/api/healing', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({number}),
      })

      const data = await res.json()
      setMeaning(data.message)
    } catch (err) {
      setMeaning('❌ Error fetching response')
    }

    setLoading(false)
  }

  return (
    <div style={{padding: '20px'}}>
      <h1>🌸 Spiritual Healing AI</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={number}
          onChange={e => setNumber(e.target.value)}
          placeholder='Enter number...'
        />
        <button type='submit' disabled={loading}>
          {loading ? 'Loading...' : 'Get Meaning'}
        </button>
      </form>

      {meaning && (
        <div style={{marginTop: '20px'}}>
          <h2>✨ Meaning:</h2>
          <p>{meaning}</p>
        </div>
      )}
    </div>
  )
}

export default App
