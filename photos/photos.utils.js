export const processHashtags = (caption) => {
  // #영어 추출
  // const hashtags = caption.match(/#[\w]+/g)
  // #한글+영어 추출
  const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g) || []
  return hashtags.map((hashtag) => ({ where: { hashtag }, create: { hashtag } }))
}
