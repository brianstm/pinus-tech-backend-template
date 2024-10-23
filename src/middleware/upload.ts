import multer from "multer"
import { bucket } from "../config/firebase"
import { Request, Response, NextFunction } from "express"

export const uploadToFirebase = (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        return next()
    }
    
    const file = req.file
    const filename = `${Date.now()}_${file.originalname}`
    const fileUpload = bucket.file(filename)

    const stream = fileUpload.createWriteStream({
        metadata: {
            contentType: file.mimetype
        }
    })

    stream.on("error", (error: any) => {
        next(error)
    })

    stream.on("finish", async () => {
        try {
            await fileUpload.makePublic()
            req.body.imageUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`
            next()
        } catch (error: any) {
            next(error)
        }
    })

    stream.end(file.buffer)
}