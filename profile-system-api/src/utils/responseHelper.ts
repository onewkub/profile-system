import { Response } from 'express'

export const INTERNAL_ERROR = (res: Response, error: any) => {
    res.status(500).json({
        type: 'internal.error',
        error: error.message,
    })
}

export const OK = (res: Response, result: any) => {
    res.json(result)
}

export const UNAUTHORIZE = (
    res: Response,
    message: string = 'Not have permission'
) => {
    res.status(401).json({
        type: 'unauthorized',
        message,
    })
}

export const BAD_REQUEST = (res: Response, message: string = 'Bad request') => {
    res.status(400).json({
        type: 'bad_request',
        message,
    })
}
