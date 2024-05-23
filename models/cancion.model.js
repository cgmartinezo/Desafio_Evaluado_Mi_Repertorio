
import { pool } from "../database/connection.js";

const findAll = async () => {
    const query = {
        text: 'SELECT * FROM CANCIONES',
    }
    const { rows } = await pool.query(query)
    return rows
}

const findOneById = async (id) => {
    const query = {
        text: `
            SELECT * FROM CANCIONES WHERE id = $1
        `,
        values: [id]
    }

    const { rows } = await pool.query(query)
    return rows[0]
}

const create = async ({ titulo, artista, tono }) => {

    const query = {
        text: `
            INSERT INTO CANCIONES (TITULO, ARTISTA, TONO)
            VALUES ($1, $2, $3)
            RETURNING *
        `,
        values: [titulo, artista, tono]
    }

    const { rows } = await pool.query(query)
    return rows[0]
}

const remove = async (id) => {
    const query = {
        text: `
            DELETE FROM CANCIONES WHERE id = $1
            RETURNING *
        `,
        values: [id]
    }

    const { rows } = await pool.query(query)
    return rows[0]
}

const update = async ({ id, titulo, artista, tono }) => {

    const query = {
        text: `
            UPDATE CANCIONES
            SET TITULO = $1,
            ARTISTA = $2,
            TONO = $3
            WHERE ID = $4
            RETURNING *
        `,
        values: [titulo, artista, tono, id]
    }

    const { rows } = await pool.query(query)
    return rows[0]
}

export const Cancion = {
    findAll,
    create,
    findOneById,
    remove,
    update
}