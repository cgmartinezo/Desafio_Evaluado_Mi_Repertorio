import { Router } from "express";
import { createCancion, getAllCanciones, getCancion, removeCancion, updateCancion } from "../controllers/cancion.controller.js";

const router = Router()

// URL /canciones

router.get('/', getAllCanciones)
router.get('/:id', getCancion)
router.post('/', createCancion)
router.delete('/:id', removeCancion)
router.put('/:id', updateCancion)

export default router