const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./router/authRouter')

const app = express()
const port = 5000
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)


// app.post('/api/registrations', (req, res) => {
//   console.log('POST', req.body)
//   const data  = req.body
//   if(req.body) {
//     res.status(200).json(data)
//   } else {
//     res.status(404).json({ error: 'ERROR MESSAGE'})
//   }
// })

const startServer = async ()=> {
  try {
    await mongoose.connect(`mongodb+srv://vlad:11223344@cluster0.d7xpa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
  } catch (e) {
    console.log(e)
  }
}
startServer()

