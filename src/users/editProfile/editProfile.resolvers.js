import { createWriteStream } from "fs"
import client from "../../client"
import bcrypt from "bcrypt"
import { protectedResolver } from "../users.utils"
import { uploadToS3 } from "../../shared/shared.utils"

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser }
) => {
  let avatarUrl = null
  let avatarKey = null
  if (avatar) {
    const { location, key } = await uploadToS3(avatar, loggedInUser.id, "avatars")
    avatarUrl = location
    avatarKey = key
    // AWS아닌 백앤드 자체에 사진 올리는법
    // const { filename, createReadStream } = await avatar
    // const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`
    // const readStream = createReadStream()
    // const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename)
    // readStream.pipe(writeStream)
    // avatarUrl = `http://localhost:4000/static/${newFilename}`
  }
  let uglyPassword = null
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10)
  }

  const updatedUser = await client.user.update({
    where: { id: loggedInUser.id },
    data: {
      firstName,
      lastName,
      username,
      email,
      bio,
      ...(uglyPassword && { password: uglyPassword }),
      ...(avatarUrl && { avatar: avatarUrl }),
      ...(avatarKey && { avatarKey: avatarKey }),
    },
  })

  if (updatedUser.id) {
    return {
      ok: true,
    }
  } else {
    return {
      ok: false,
      error: "프로필을 업데이트 할 수 없습니다.",
    }
  }
}

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
}
