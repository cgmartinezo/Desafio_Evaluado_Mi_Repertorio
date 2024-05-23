import { Cancion } from "../models/cancion.model.js"
import { handleError } from "../database/errors.js"

export const getAllCanciones = async (req, res) => {
    try {
        const canciones = await Cancion.findAll()
        return res.json(canciones)
    } catch (error) {
        console.log(error)
        const { code, msg } = handleError(error)
        return res.status(code).json({ ok: false, msg })
    }
}

export const getCancion = async (req, res) => {
    try {
        const { id } = req.params
        const cancion = await Cancion.findOneById(id)
        if (!cancion) {
            return res.status(404).json({ ok: false, msg: '404' })
        }
        return res.json(cancion)
    } catch (error) {
        console.log(error)
        const { code, msg } = handleError(error)
        return res.status(code).json({ ok: false, msg })
    }
}

export const createCancion = async (req, res) => {
    try {
        const { titulo, artista, tono } = req.body

        if (!titulo || !artista || !tono) {
            return res.status(400).json({ ok: false, msg: "campos obligatorios" })
        }

        const newCancion = {
            titulo,
            artista,
            tono
        }

        const cancion = await Cancion.create(newCancion)
        return res.json(cancion)
    } catch (error) {
        console.log(error)
        const { code, msg } = handleError(error)
        return res.status(code).json({ ok: false, msg })
    }
}

export const removeCancion = async (req, res) => {
    try {
        const { id } = req.params
        const cancion = await Cancion.remove(id)
        return res.json(cancion)
    } catch (error) {
        console.log(error)
        const { code, msg } = handleError(error)
        return res.status(code).json({ ok: false, msg })
    }
}

export const updateCancion = async (req, res) => {
    try {
        const { id } = req.params
        const { titulo, artista, tono } = req.body
        const cancion = await Cancion.update({
            id,
            titulo,
            artista,
            tono
        })
        return res.json(cancion)
    } catch (error) {
        console.log(error)
        const { code, msg } = handleError(error)
        return res.status(code).json({ ok: false, msg })
    }
}