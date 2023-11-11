import SimpleReactValidator from 'simple-react-validator';
import { ValidationErrors } from '../models/response/validation-erros.model';

// Create a validator instance
const validator = new SimpleReactValidator();

const validateInputs = (key: string, value: string, rules: string): ValidationErrors => {

    validator.showMessageFor(key); // Show validation messages
    validator.message(key, value, rules);
    const isValid = validator.fieldValid(key); // Check if all inputs are valid

    if (isValid) {
        // If all inputs are valid, return an empty object for errors
        return {};
    }

    // If there are validation errors, return the errors object
    const errors: ValidationErrors = {};
    const errorMessage = validator.message(key, value, rules); // Add validation rules here

    if (errorMessage) {
        errors[key] = errorMessage;
    }

    return errors;
};

const validateSubmit = (data: Record<string, string>, validationRules: Record<string, string>): any => {
    const { file, ...processedData } = data;
    return new Promise((resolve) => {
        validator.showMessages(); // Show validation messages
        validator.message('email', processedData['email'], 'required');
        const isValid = validator.allValid(); // Check if all inputs are valid

        if (isValid) {
            // If all inputs are valid, return an empty object for errors
            resolve({});
        }
        // If there are validation errors, return the errors object
        const errors: ValidationErrors = {};
        for (const key in processedData) {
            if (processedData.hasOwnProperty(key)) {
                const errorMessage = validator.message(key, processedData[key], validationRules[key]); // Add validation rules here
                if (errorMessage) {
                    errors[key] = errorMessage;
                }
            }
        }
        resolve(errors);
    });
};

const validateFile = (data: Record<string, string>): any => {
    return new Promise((resolve) => {
        validator.showMessageFor('file'); // Show validation messages
        validator.message('file', data['file'], 'required');
        const isValid = validator.fieldValid('file'); // Check if all inputs are valid

        if (isValid) {
            resolve({});
        }
        // If there are validation errors, return the errors object
        const errors: ValidationErrors = {};
        const errorMessage = validator.message('file', data['file'], 'required'); // Add validation rules here
    
        if (errorMessage) {
            errors['file'] = errorMessage;
        }
    
        resolve(errors);
    });
};

export {
    validateInputs,
    validateSubmit,
    validateFile
};
