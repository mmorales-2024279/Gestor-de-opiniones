'use strict';

import { Schema, model } from 'mongoose';

const fieldSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'El titulo es requerido'],
            trim: true,
            maxLength: [100, 'El titulo no puede exceder 100 caracteres'],
        },
        category: {
            type: String,
            required: [true, 'La categoria es requerida'],
            trim: true,
            maxLength: [100, 'La categoria no puede exceder 100 caracteres'],
        },
        text: {
            type: String,
            trim: true,
        },
        date: {
            type: Date,
            default: Date.now
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        photo: {
            type: String,
            default: 'fields/kinal_sports_taad5e',
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Índices para optimizar búsquedas
fieldSchema.index({ isActive: 1 });
fieldSchema.index({ fieldType: 1 });
fieldSchema.index({ isActive: 1, fieldType: 1 });

export default model('Field', fieldSchema);