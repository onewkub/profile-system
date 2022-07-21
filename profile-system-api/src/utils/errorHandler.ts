import { Response } from 'express'
import { BAD_REQUEST, INTERNAL_ERROR, UNAUTHORIZE } from './responseHelper'

const errorHandler = (res: Response, error: any) => {
    console.log(error)
    if (error?.status === 401) {
        UNAUTHORIZE(res, error.message)
    } else if (error?.status === 400) {
        BAD_REQUEST(res, error.message)
    } else {
        INTERNAL_ERROR(res, error.message)
    }
}

export default errorHandler
