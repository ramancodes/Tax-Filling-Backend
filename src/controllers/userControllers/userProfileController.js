const { generate } = require('../../common/helper');
const { Models } = require('../../models/index')
const { Validation } = require('../../validations/index')

module.exports = {
    createProfile: async (req, res)=>{
        try {
            const { error, value } = Validation.userProfileValidator.userProfile(req.body);
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }

            const newProfile = await Models.userProfile.create({
                ...value,
                id: generate()
            });

            res.status(201).json({
                message: 'User profile created successfully!',
                profile: newProfile
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    updateProfile: async (req, res)=>{
        try {
            const { error, value } = Validation.userProfileValidator.updateUserProfile(req.body);
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }

            const profile = await Models.userProfile.findOne({where: {
                UserId: value.UserId
            }});

            if(!profile){
                return res.status(404).json({
                    message: 'No profile found! Create a profile'
                });
            }

            delete value.UserId;

            await Models.userProfile.update(
                {...value},
                {
                    where: {
                        id: profile.id
                    }
                }
            );

            res.status(200).json({
                message: 'User profile updated successfully!'
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    getProfile: async (req, res)=>{
        try {
            const { error, value } = Validation.userProfileValidator.getUserProfile(req.params);
            if (error) {
                return res.status(400).json({
                    message: 'Validation failed',
                    error: error.details[0]
                });
            }

            const profile = await Models.userProfile.findOne({
                where: {
                    UserId: value.UserId
                },
                include: [
                    {
                        model: Models.user,
                        attributes: ['id', 'username', 'role', 'email', 'createdAt'],
                    }
                ]
            });

            if(!profile){
                return res.status(404).json({
                    message: 'No profile found! Create a profile'
                });
            }

            res.status(200).json({
                message: 'User profile fetched successfully!',
                profile
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },
}