import { body, param } from 'express-validator';
import { validateJWT } from './validate-JWT.js';
import { checkValidators } from './check-validators.js';

export const validateUpdateField = [
    validateJWT,
    param('id')
        .isMongoId()
        .withMessage('ID no válido'),
    body('title')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('El titulo debe tener entre 2 y 100 caracteres'),
    body('category')
        .optional()
        .trim()
        .isLength({ min: 1 })
        .withMessage('La categoria debe tener minimo 1 caracter'),
    body('text')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('La descripción no puede exceder 1000 caracteres'),
    body('pricePerHour')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser mayor o igual a 0'),
    checkValidators,
];