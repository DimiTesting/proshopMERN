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
import { protect, admin } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.post('/logout', logoutUser)
router.route('/profile').put(protect, updateUserProfile).get(protect, getUserProfile)
router.route('/:id').get(protect, admin, getUserById).delete(protect, admin, deleteUser).put(protect, admin, updateUser)


export default router