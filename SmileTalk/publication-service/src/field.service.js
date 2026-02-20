import Field from './field.model.js';
import { cloudinary } from '../middlewares/file-uploader.js'

export const createPublicRecord = async ({fieldData, file}) => {
    const data = {...fieldData};

    if (file) {
        const filename = file.filename;
        const match = filename.match(/fields\/.+$/);
        data.photo = match ? match[0] : filename;
    } else {
        data.photo = 'fields/Staad5e';
    }

    const field = new Field(data);
    await field.save();
    return field;
}

export const fetchPublics = async ({
    page = 1,
    limit = 10,
    isActive = true,
    }) => {
    const filter = { isActive };
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    
    const fields = await Field.find(filter)
    .limit(limitNumber * 1)
    .skip((pageNumber - 1) * limitNumber)
    .sort({ createdAt: -1 })
    .populate('user', 'name email');
    
    const total = await Field.countDocuments(filter);
    
    return {
        fields,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalRecords: total,
            limit,
        },
    };
};

export const updatePublicRecord = async ({ id, userId, updateData, file }) => {

    const field = await Field.findById(id);

    if (!field) {
        throw new Error('Publicación no encontrada');
    }
    if (field.user.toString() !== userId) {
        throw new Error('No tienes permiso para editar esta publicación');
    }

    delete updateData.user;
    delete updateData.date;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    if (file) {
        const filename = file.filename;
        const match = filename.match(/fields\/.+$/);
        updateData.photo = match ? match[0] : filename;
    }
    const updatedField = await Field.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
    );
    return updatedField;
};