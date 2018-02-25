export default function getAvatar (seed = '', size = 'thumb') {
  let intVal = 0
  String(seed).split('').forEach((l) => {
    intVal += String(l.charCodeAt(0))
  })
  const gender = intVal % 2 ? 'women' : 'men'
  const face = intVal % 100
  let apiPictureSize
  switch (size) {
    case 'thumbnail':
      apiPictureSize = '/thumb'
      break
    case 'medium':
      apiPictureSize = '/med'
      break
    default:
      apiPictureSize = ''
      break
  }
  return `https://randomuser.me/api/portraits${apiPictureSize}/${gender}/${face}.jpg`
}
