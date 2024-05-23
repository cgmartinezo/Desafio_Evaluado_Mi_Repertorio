import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cancionesRoutes from './routes/cancion.route.js'

const app = express()

// habilitar cors público
app.use(cors())

// habilitar el req.body tanto de json como formularios html
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// habilitar los archivos estáticos (public)
app.use(express.static('public'))

// Rutas /canciones
app.use('/canciones', cancionesRoutes)

// levantar el servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})