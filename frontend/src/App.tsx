import {useState} from 'react'

function App() {
  const [number, setNumber] = useState('')
  const [meaning, setMeaning] = useState('')
  const [loading, setLoading] = useState(false)

  const getMeaning = async () => {
    setLoading(true)
    setMeaning('')
    try {
      const res = await fetch('http://localhost:5000/api/angel-number', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({number}),
      })
      const data = await res.json()
      setMeaning(data.meaning)
    } catch (err) {
      setMeaning('Error fetching meaning')
    }
    setLoading(false)
  }

  return (
    <div style={{maxWidth: 400, margin: 'auto', padding: 40}}>
      <h2>Angel Number Meaning</h2>
      <input
        type='text'
        placeholder='Enter angel number'
        value={number}
        onChange={e => setNumber(e.target.value)}
        style={{width: '100%', padding: 8, marginBottom: 10}}
      />
      <button onClick={getMeaning} disabled={loading || !number}>
        {loading ? 'Loading...' : 'Get Meaning'}
      </button>
      {meaning && (
        <div style={{marginTop: 20}}>
          <strong>Meaning:</strong>
          <div>{meaning}</div>
        </div>
      )}
    </div>
  )
}

export default App
