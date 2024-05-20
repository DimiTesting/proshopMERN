import express from 'express'
import {
    authUser, 
    registerUser, 
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser, 
    updateUser
} from '../controllers/userControllers.js'

const router = express.Router()

router.route('/').post(registerUser).get(getUsers)
router.post('/login', authUser)
router.post('/logout', logoutUser)
router.route('/profile').put(updateUserProfile).get(getUserProfile)
router.route('/:id').get(getUserById).delete(deleteUser).put(updateUser)


export default router