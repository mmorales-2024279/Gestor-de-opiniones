import { createFieldRecord, fetchFields } from "./field.service.js";

export const createField = async (req, res) => {
    try {
        const field = await createFieldRecord({
            fieldData: req.body,
            file: req.file
        })
        res.status(201).json({
            success: true,
            message: 'Cancha creada correctamente',
            data: field
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear la cancha',
            error: error.message
        })
    }
}

export const getFields = async (req, res) => {
    try {
        const { page = 1, limit =  10, isActive = true } = req.query;
        const { fields, pagination } = await fetchFields({page, limit, isActive});
        res.status(200).json({
            success: true,
            message: 'Canchas listadas exitosamente',
            data: fields,
            pagination
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al listar las canchas registradas',
            error: error.message
        })
    }
}