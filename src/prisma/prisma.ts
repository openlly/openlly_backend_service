import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export const connectDB = async () => {
    let attempt = 0
    while (attempt < 10) {
        try {
            await prisma.$connect()
            return
        } catch (error) {
            attempt++
            console.log(`Error connecting to database, attempt ${attempt} of 10. Error: ${error}`)
            await new Promise(resolve => setTimeout(resolve, 500))
        }
    }
    throw new Error('Failed to connect to database after 10 attempts')
}

export const disconnectDB = async () => {
    await prisma.$disconnect()
}
