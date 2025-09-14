const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const fetch = (...args) =>
  import('node-fetch').then(({default: fetch}) => fetch(...args))
const {OpenAI} = require('openai')

const app = express()
app.use(bodyParser.json())

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  fetch: fetch, // Pass fetch to OpenAI client
})

app.post('/api/angel-number', async (req, res) => {
  const {number} = req.body
  try {
    const prompt = `What does angel number ${number} mean in spirituality? Give a clear, positive explanation.`
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{role: 'user', content: prompt}],
      max_tokens: 100,
    })
    const meaning = response.choices[0].message.content.trim()
    res.json({meaning})
  } catch (error) {
    console.error(error)
    res.status(500).json({error: 'Failed to get meaning.'})
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
