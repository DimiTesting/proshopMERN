import User from '../models/userModel.js'
import asynchHandler from '../middlewares/asynchHandler.js'
import jwt from 'jsonwebtoken'
import generateToken from '../utils/generateToken.js'

//@desc Auth user && get token
//@path POST /api/users/login
//@access Public

const authUser = asynchHandler(async(req, res)=> {
    const {email, password} = req.body

    if(!email || !password) {
        res.status(404)
        throw new Error('Password or email is missing')
    }
    const user = await User.findOne({email})

    generateToken(res, user._id)

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
    
    const {name, email, password} = req.body
    const existingUser = await User.findOne({email})

    if(existingUser) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name, 
        email,
        password
    })

    generateToken(res, user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('Invalid credentials provided')
    }


})

//@desc Logout user && clear cookie
//@path POST /api/users/logout
//@access Private

const logoutUser = asynchHandler(async(req, res)=> {

    res.cookie('jwt', '', {
        httpOnly: true, 
        expiresIn: new Date(0)
    })

    res.status(200).json({message: "Successfully logged out"})
})

//@desc Get user profile
//@path GET /api/users/profile
//@access Private

const getUserProfile = asynchHandler(async(req, res)=> {

    const user = await User.findById(req.user.id)

    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(400)
        throw new Error('User not found')
    }
})

//@desc Update user profile
//@path PUT /api/users/profile
//@access Private

const updateUserProfile = asynchHandler(async(req, res)=> {
    
    const user = await User.findById(req.user.id)

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password) {
            user.password = req.body.password
        }
    } else {
        res.status(404)
        throw new Error('User not found')
    }

    const updateduser = await user.save()

    res.json({
        _id: updateduser._id,
        name: updateduser.name,
        email: updateduser.email,
        isAdmin: updateduser.isAdmin
    })
})

//@desc Get Users
//@path GET /api/users
//@access Private/Admin

const getUsers = asynchHandler(async(req, res)=> {
    const users = await User.find({})
    res.status(200).json(users)
})

//@desc Get User by Id
//@path GET /api/users/:id
//@access Private/Admin

const getUserById = asynchHandler(async(req, res)=> {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc Delete Users
//@path DELETE /api/users/:id
//@access Private/Admin

const deleteUser = asynchHandler(async(req, res)=> {
    const user = await User.findById(req.params.id)

    if(user) {
        if(user.isAdmin) {
            res.status(404)
            throw new Error('Admin can not be deleted')
        } else {
            await User.findOneAndDelete({_id: user._id})
            res.status(200).json({message: "User is deleted"})
        }
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc Update User
//@path PUT /api/users/:id
//@access Private/Admin

const updateUser = asynchHandler(async(req, res)=> {
    const user = await User.findById(req.params.id)

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = Boolean(req.body.isAdmin)
        const updatedUser = await user.save()
        res.status(200).json({
            _id: updatedUser._id, 
            name: updatedUser.name, 
            email: updatedUser.email, 
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
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