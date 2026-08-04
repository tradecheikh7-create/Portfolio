import { collection, addDoc, updateDoc, deleteDoc, doc, getDoc, onSnapshot, writeBatch } from 'firebase/firestore'
import { db } from '../firebase'

const projectsRef = collection(db, 'projects')

export async function getProject(id) {
  const snap = await getDoc(doc(db, 'projects', id))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() }
}

export function subscribeToProjects(callback) {
  return onSnapshot(projectsRef, (snapshot) => {
    const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    list.sort((a, b) => (a.order ?? a.createdAt ?? 0) - (b.order ?? b.createdAt ?? 0))
    callback(list)
  })
}

export function addProject(project) {
  return addDoc(projectsRef, { ...project, order: Date.now(), createdAt: Date.now() })
}

export function updateProject(id, project) {
  return updateDoc(doc(db, 'projects', id), project)
}

export function deleteProject(id) {
  return deleteDoc(doc(db, 'projects', id))
}

export async function reorderProjects(orderedList) {
  const batch = writeBatch(db)
  orderedList.forEach((project, index) => {
    batch.update(doc(db, 'projects', project.id), { order: index })
  })
  await batch.commit()
}