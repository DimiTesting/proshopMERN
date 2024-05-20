import User from '../models/userModel.js'
import asynchHandler from '../middlewares/asynchHandler.js'

//@desc Auth user && get token
//@path POST /api/users/login
//@access Public

const authUser = asynchHandler(async(req, res)=> {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('Invalid credentials are used')
    }
})

//@desc Register user
//@path POST /api/users
//@access Public

const registerUser = asynchHandler(async(req, res)=> {
    res.send('Register user')
})

//@desc Logout user && clear cookie
//@path POST /api/users/logout
//@access Private

const logoutUser = asynchHandler(async(req, res)=> {
    res.send('Logout user')
})

//@desc Get user profile
//@path GET /api/users/profile
//@access Private

const getUserProfile = asynchHandler(async(req, res)=> {
    res.send('Get user profile')
})

//@desc Update user profile
//@path PUT /api/users/profile
//@access Private

const updateUserProfile = asynchHandler(async(req, res)=> {
    res.send('Update user profile')
})

//@desc Get Users
//@path GET /api/users
//@access Private/Admin

const getUsers = asynchHandler(async(req, res)=> {
    res.send('Get Users')
})

//@desc Get User by Id
//@path GET /api/users/:id
//@access Private/Admin

const getUserById = asynchHandler(async(req, res)=> {
    res.send('Get User by id')
})

//@desc Delete Users
//@path DELETE /api/users/:id
//@access Private/Admin

const deleteUser = asynchHandler(async(req, res)=> {
    res.send('Delete User')
})

//@desc Update User
//@path PUT /api/users/:id
//@access Private/Admin

const updateUser = asynchHandler(async(req, res)=> {
    res.send('Update User')
})

export {
    authUser, 
    registerUser, 
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser, 
    updateUser
}