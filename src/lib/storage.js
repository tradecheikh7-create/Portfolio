// Image storage via Cloudinary (unsigned upload preset).
// Keeps the same function signatures as before so nothing else in the app needs to change.

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

// Resizes/compresses an image in the browser before upload so we stay well
// under Cloudinary's unsigned-upload size limit (10 MB), and so the site
// itself loads faster.
function compressImage(file, maxDimension = 2000, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      resolve(file)
      return
    }

    const img = new Image()
    const objectUrl = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(objectUrl)

      let { width, height } = img
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width)
          width = maxDimension
        } else {
          width = Math.round((width * maxDimension) / height)
          height = maxDimension
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Échec de la compression de l'image"))
            return
          }
          resolve(new File([blob], file.name.replace(/\.\w+$/, '.jpg'), { type: 'image/jpeg' }))
        },
        'image/jpeg',
        quality
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error("Impossible de lire l'image"))
    }

    img.src = objectUrl
  })
}

export async function uploadProjectImage(file, folder = 'misc') {
  const optimized = await compressImage(file)

  const formData = new FormData()
  formData.append('file', optimized)
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('folder', `projects/${folder}`)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Échec de l'upload Cloudinary: ${errText}`)
  }

  const data = await res.json()
  return data.secure_url
}

export async function deleteProjectImage() {
  // Cloudinary deletion requires a signed request (server-side, with API secret).
  // Skipped here since this app has no backend — old images just stay in your
  // Cloudinary media library. You can clean them up manually if needed, or
  // add a small serverless function later if this becomes a problem.
}