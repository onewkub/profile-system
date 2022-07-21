import bcrypt from 'bcrypt'

const hashPassword = async (password: string) => {
    const SALT = 10
    const hashedPassword = await bcrypt.hash(password, SALT)
    return hashedPassword
}

const matchPassword = async (password: string, comparer: string) => {
    return await bcrypt.compare(password, comparer)
}

const passwordHelper = { hashPassword, matchPassword }

export default passwordHelper
