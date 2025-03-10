module.exports = {
    check_api: async (req, res)=>{
        res.status(200).json({status:200, message: 'API is working'});
    },
    login: async (req, res)=>{
        // code here
    },
    signUp: async (req, res)=>{
        // code here
        try {
            const { email, password, name } = req.body;
            
        } catch (error) {
            return res.status(500).json({status: 500, message: 'Error occurred while signing up', error: error.message});
        }
    }
}