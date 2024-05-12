import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin', 
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Test1', 
        email: 'test1@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
    {
        name: 'Test2', 
        email: 'test2@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    }
]

export default users