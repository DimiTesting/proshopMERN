import dotenv from 'dotenv'
dotenv.config()
import connectDB from '../backend/config/db.js'
connectDB()
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import users from './data/users.js'
import products from './data/products.js'
import colors from 'colors'

const importData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        const importedUsers = await User.insertMany(users)
        const adminUserId = importedUsers[0]._id
        const sampleProducts = products.map((product) => {return {...product, user: adminUserId}})

        await Product.insertMany(sampleProducts)
        console.log('Data has been imported'.green.inverse)
        process.exit()
    } catch (error) {
        console.log(`Error :${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()
        console.log('Data destroyed'.green.inverse)
        process.exit()
    } catch (error) {
        console.log(`Error :${error}`.red.inverse)
        process.exit(1)
    }
}

if(process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}