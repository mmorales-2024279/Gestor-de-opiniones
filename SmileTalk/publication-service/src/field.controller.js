import { createFieldRecord, fetchFields } from "./field.service.js";

export const createPublic = async (req, res) => {
    try {
        const field = await createFieldRecord({
            fieldData: {
                ...req.body,
                user: req.user.id,
                date: new Date() 
            },
            file: req.file
        })
        res.status(201).json({
            success: true,
            message: 'Publicacion creada correctamente',
            data: field
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear la publicacion',
            error: error.message
        })
    }
}

export const getPublic = async (req, res) => {
    try {
        const { page = 1, limit =  10, isActive = true } = req.query;
        const { fields, pagination } = await fetchFields({page, limit, isActive});
        res.status(200).json({
            success: true,
            message: 'Publicaciones listadas exitosamente',
            data: fields,
            pagination
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al listar las publicaciones registradas',
            error: error.message
        })
    }
}

export const updatePublic = async (req, res) => {
    try {

        const { id } = req.params;
        const field = await updateFieldRecord({
            id,
            userId: req.user.id,
            updateData: req.body,
            file: req.file
        });
        res.status(200).json({
            success: true,
            message: 'Publicación actualizada correctamente',
            data: field
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar la publicación',
            error: error.message
        });
    }
};