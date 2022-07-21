import { NextFunction, Request, Response } from 'express'
import { OptionalObjectSchema } from 'yup/lib/object'

const validateModel =
    (schema: OptionalObjectSchema<any, any, any>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate(req.body)
            next()
        } catch (error) {
            return res.status(400).json({
                type: 'model.invalid',
                message: 'Invalid model',
            })
        }
    }

export default validateModel
