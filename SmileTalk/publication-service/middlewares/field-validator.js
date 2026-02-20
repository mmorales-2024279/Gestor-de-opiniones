import { body, param } from 'express-validator';
import { validateJWT } from './validate-JWT.js';
import { checkValidators } from './check-validators.js';

// Validaciones para crear campos (field)
export const validateCreateField = [
    validateJWT,
    body('title')
        .trim()
        .notEmpty()
        .withMessage('El titulo es requerido')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    body('category')
        .trim()
        .notEmpty()
        .withMessage('La categoria es requerida')
        .isLength({ min: 1 })
        .withMessage('La categoria debe tener minimo 1 caracter'),
    body('text')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('La descripción no puede exceder 1000 caracteres'),
    body('User')
        .trim()
        .notEmpty()
        .withMessage('El usuario es requerido'),
    body('Date')
        .trim()
        .notEmpty()
        .withMessage('La fecha es requerida')
        .withMessage('La fecha debe tener un formato válido'),
    body('pricePerHour')
        .notEmpty()
        .withMessage('El precio por hora es requerido')
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser mayor o igual a 0'),
    checkValidators,
];