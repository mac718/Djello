const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const bucket = process.env.AWS_S3_BUCKET
const mime = require('mime')
const path = require('path')
const md5 = require('md5')
const fs = require('fs')
const _ = require('lodash')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

const PHOTO_DATA_PATH = path.resolve('./data/photos.json')

const _writePhotoDataFile = (photos) => {
  fs.writeFileSync(PHOTO_DATA_PATH, JSON.stringify(photos, null, 2))
}

if (!fs.existsSync(PHOTO_DATA_PATH)) {
  _writePhotoDataFile({})
}

const FileUploader = {}

FileUploader.upload = (file) => {
  const extension = mime.extension(file.mimetype)

  const filename = path.parse(file.name).name

  return new Promise((resolve, reject) => {
    const options = {
      Bucket: bucket,
      Key: `${filename}-${md5(Date.now())}.${extension}`,
      Body: file.data,
    }

    s3.upload(options, (err, data) => {
      if (err) {
        reject(err)
      } else {
        const photos = require(PHOTO_DATA_PATH)
        const photo = {
          url: data.Location,
          name: data.key,
        }
        photos[data.key] = photo
        _writePhotoDataFile(photos)

        resolve(photo)
      }
    })
  })
}

FileUploader.remove = (id) => {
  const options = {
    Bucket: bucket,
    Key: id,
  }

  return new Promise((resolve, reject) => {
    s3.deleteObject(options, (err, data) => {
      if (err) {
        reject(err)
      } else {
        const photos = require(PHOTO_DATA_PATH)
        const photo = _.clone(photos[id])
        delete photos[id]
        _writePhotoDataFile(photos)
        resolve(photo)
      }
    })
  })
}

FileUploader.single = (field) => upload.single(field)

module.exports = FileUploader
