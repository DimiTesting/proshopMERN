import path from 'path'
import multer from 'multer'
import express from 'express'

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
      },
      filename: function (req, file, cb) {
        cb(null, `${file.originalname}`)
      }
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Images only!')
    }
}

const upload = multer({ storage: storage })

router.post('/', upload.single('image'), (req,res) => {
    res.send({
        message: 'Image Uploaded',
        image: `/${req.file.path}`
    })
})

export default router