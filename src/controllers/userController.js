const bcrypt = require('bcrypt');
const { Models } = require('../models/index')
const jwt = require('jsonwebtoken');
const { Validation } = require('../validations/index');
const { generate } = require('../common/helper');

module.exports = {
    register: async (req, res) => {
        try {
            const { error, value } = Validation.userValidator.createUser(req.body);
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }
 
            const users = await Models.user.findAll({where: {
                [Models.Sequelize.Op.or]: [
                    {email: value.email},
                    {username: value.username}
                ],
                role: value.role
            }});

            if (users.length > 0) {
                const existingUser = users.find(user => user.email === value.email || user.username === value.username);
                
                if (existingUser) {
                    return res.status(409).json({
                        message: existingUser.email === value.email 
                            ? 'User with this email already exists' 
                            : 'User with this username already exists'
                    });
                }
            }

            const hashedPassword = await bcrypt.hash(value.password, 10);
            const newUser = await Models.user.create({
                ...value,
                id: generate(),
                password: hashedPassword,
            });

            const userData = newUser.get({ plain: true });
            delete userData.password;
            
            // Generate JWT token
            const token = jwt.sign({id: newUser.id, username: newUser.username}, process.env.JWT_SECRET, {expiresIn: '1h'});

            res.status(201).json({
                message: 'User registered successfully! Login Again',
                token,
                user: userData
            });
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    },
    login: async (req, res) => {
        try {
            const { error, value } = Validation.userValidator.loginUser(req.body);
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }

            const user = await Models.user.findOne({where: {
                username:value.username,
                role: value.role
            }});
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            // validate password
            const isPasswordValid = await bcrypt.compare(value.password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    message: 'Invalid password'
                });
            }
            const userData = user.get({ plain: true });
            delete userData.password;
            
            // Generate JWT token
            const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
            res.status(200).json({
                message: 'Login successful',
                token,
                user: userData
            });
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    },
    getUsername: async (req, res) => {
        try {
            const { error, value } = Validation.userValidator.getuserName(req.body);
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }

            const user = await Models.user.findOne({where: {
                email:value.email,
                role: value.role
            }});

            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            res.status(200).json({
                message: 'Username retrieved successfully',
                user: user.username
            });

        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    },
    updateUser: async (req, res) => {
        try {
            const { error, value } = Validation.userValidator.updateUser(req.body);
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }

            const user = await Models.user.findOne({where: {
                email: value.email,
                role: value.role
            }});

            if(user){
                return res.status(409).json({
                    message: 'Email already registered'
                });
            }

            await Models.user.update(
                {...value},
                {
                    where: {
                        id: value.id,
                        role: value.role
                    }
                }
            );

            res.status(200).json({
                message: 'User updated successfully'
            });

        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { error, value } = Validation.userValidator.resetPassword(req.body);
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }

            const user = await Models.user.findOne({where: {
                id: value.id
            }});

            if (user) {
                const isPasswordValid = await bcrypt.compare(value.oldPassword, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json({
                        message: 'Invalid Old password'
                    });
                }
            }

            const hashedPassword = await bcrypt.hash(value.newPassword, 10);

            await Models.user.update(
                {password: hashedPassword},
                {
                    where: {
                        id: value.id
                    }
                }
            );

            res.status(200).json({
                message: 'Password updated successfully'
            });

        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { error, value } = Validation.userValidator.forgotPassword(req.body);
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }

            const user = await Models.user.findOne({where: {
                username: value.username
            }});

            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            const hashedPassword = await bcrypt.hash(value.newPassword, 10);

            await Models.user.update(
                {password: hashedPassword},
                {
                    where: {
                        username: value.username
                    }
                }
            );

            res.status(200).json({
                message: 'Password reset successfully'
            });

        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    },

}