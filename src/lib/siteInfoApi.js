import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

const siteInfoRef = doc(db, 'settings', 'site')

export const DEFAULT_SITE_INFO = {
  heroTagline:
    "Développeur Web & Mobile et UI/UX Designer basé à Dakar. Je construis des identités et produits numériques qui restent en tête.",
  availabilityText: 'Disponible pour de nouveaux projets',
  aboutText:
    "J'allie la rigueur du développement front-end à une sensibilité d'image pour faire exister des interfaces singulières — de l'idée à la dernière micro-interaction.",
  skills: [
    { title: 'Stratégie', text: 'Recherche, positionnement, architecture produit.' },
    { title: 'Design', text: 'UI/UX, identité visuelle, direction artistique.' },
    { title: 'Build', text: 'React, mobile, design systems, prototypes.' },
  ],
  contactText: 'Pour un projet, une collaboration ou simplement échanger autour du design et du code.',
  email: 'cheikhhero221ka@gmail.com',
  behance: 'https://behance.net/cheikhkz',
  linkedin: 'https://www.linkedin.com/in/cheikh-sadibouka-0412a4248',
  github: 'https://github.com/tradecheikh7-create',
}

export function subscribeToSiteInfo(callback) {
  return onSnapshot(siteInfoRef, (snap) => {
    callback(snap.exists() ? { ...DEFAULT_SITE_INFO, ...snap.data() } : DEFAULT_SITE_INFO)
  })
}

export async function getSiteInfo() {
  const snap = await getDoc(siteInfoRef)
  return snap.exists() ? { ...DEFAULT_SITE_INFO, ...snap.data() } : DEFAULT_SITE_INFO
}

export function updateSiteInfo(data) {
  return setDoc(siteInfoRef, data, { merge: true })
}