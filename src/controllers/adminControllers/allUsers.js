const { generate } = require('../../common/helper');
const { Models } = require('../../models/index');
const { Validation } = require('../../validations/index');
const bcrypt = require('bcrypt');

module.exports = {
    getAllUsers: async (req, res)=>{
        try {
            const users = await Models.user.findAndCountAll({
            where: { role: "user" },
            include: [
                {
                model: Models.userProfile,
                },
            ],
            });

            delete users.rows[0].dataValues.password;

            res.status(200).json({
              message: "Users fetched successfully!",
              users,
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    getOne: async (req, res)=>{
        try {
            const {userId} = req.params;
            if (!userId) {
                return res.status(400).json({
                    message: 'userId is required'
                });
            }
            const user = await Models.user.findOne({
                where: {
                    id: userId
                },
                include: [
                    {
                        model: Models.userProfile,
                    },
                    {
                        model: Models.bankDetails,
                    },
                    {
                        model: Models.documentModel,
                    },
                    {
                        model: Models.incomeSources,
                    },
                    {
                        model: Models.incomeTaxModel,
                    },
                ],
            });
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            res.status(200).json({
                message: 'User fetched successfully!',
                user
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    addUser: async (req, res)=>{
        try {
            const {
              username,
              email,
              password,
              firstName,
              middleName,
              lastName,
              gender,
              dob,
              phoneNo,
              address,
              occupation,
              website,
            } = req.body;

            const user = await Models.user.findOne({
            where: {
                [Models.Op.or]: [
                { username },
                { email }
                ]
            }
            });

            if (user) {
                return res.status(400).json({
                    message: 'User already exists'
                });
            }
            
            const newUser = await Models.user.create({
              id: generate(),
              username,
              email,
              password: await bcrypt.hash(password, 10),
              role: "user",
            });            

            await Models.userProfile.create({
              id: generate(),
              firstName,
              middleName,
              lastName,
              gender,
              dob,
              phoneNo,
              address,  
              occupation,
              website,
              userId: newUser.id,
            });

            res.status(200).json({
              message: "User added successfully!",
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    deleteUser: async (req, res)=>{
        try {
            const {userId} = req.params;
            if (!userId) {
                return res.status(400).json({
                    message: 'userId is required'
                });
            }

            await Models.user.destroy({
                where: {
                    id: userId
                }
            });
            await Models.userProfile.destroy({
                where: {
                    userId: userId
                }
            });

            res.status(200).json({
                message: 'User deleted successfully!'
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    editUser: async (req, res)=>{
        try {
            const userId = req.params.userId;
            const {username, email, firstName, middleName, lastName, gender, dob, phoneNo, address, occupation, website} = req.body;
            if (userId) {
                return res.status(400).json({
                    message: 'UserId is required'
                });
            }

            await Models.userProfile.update(
              {
                firstName,
                middleName,
                lastName,
                gender,
                dob,
                phoneNo,
                address,
                occupation,
                website,
              },
              {
                where: {
                  UserId: userId,
                },
              }
            );
            await Models.user.update(
              { username, email },
              {
                where: {
                  id: userId,
                },
              }
            );

            res.status(200).json({
                message: 'User edited successfully!'
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
}