import AWS from "aws-sdk"

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
})

export const uploadToS3 = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file
  const readStream = createReadStream()
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`
  const upload = await new AWS.S3()
    .upload({
      Bucket: "instaclone-fold",
      Key: objectName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise()
  return { location: upload.Location, key: upload.Key }
}

// 삭제하려면 키를 따로 저장해야됨
export const deleteInS3 = async (fileKey) => {
  const Bucket = "instaclone-fold"
  await new AWS.S3()
    .deleteObject({
      Bucket,
      Key: fileKey,
    })
    .promise()
}
