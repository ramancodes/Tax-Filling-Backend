import { v4 as uuidv4 } from 'uuid';

module.exports = {
    generate: () => uuidv4(),
    isEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    isPassword: (password) => {
        // At least one lowercase letter (a-z)
        // At least one uppercase letter (A-Z)
        // At least one digit (0-9)
        // At least one special character from @, #, $
        // Minimum 8 characters
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$]).{8,}$/;
        return passwordRegex.test(password);
    },
}