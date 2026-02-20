import Field from './field.model.js';
import { cloudinary } from '../middlewares/file-uploader.js'

export const createFieldRecord = async ({fieldData, fiel}) => {
    const data = {...fieldData};

    if (file) {
        const filename = file.filename;
        const match = filename.match(/fields\/.+$/);
        data.photo = match ? match[0] : filename;
    } else {
        data.photo = 'fields/kinal_sports_taad5e';
    }

    const field = new Field(data);
    await field.save();
    return field;
}

export const fetchFields = async ({
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
    .sort({ createdAt: -1 });
    
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