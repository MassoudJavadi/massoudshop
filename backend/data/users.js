import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email:'admin@gmail.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin:true

    },
    {
        name: 'Ali Alavi',
        email:'ali@gmail.com',
        password: bcrypt.hashSync('123456',10),

    },
    {
        name: 'Hasan Hasani',
        email:'hasan@gmail.com',
        password: bcrypt.hashSync('123456',10),

    },

]

export default users