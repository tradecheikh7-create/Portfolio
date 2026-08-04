import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { ProjectsSection } from '../components/ProjectsSection'
import { AboutSection } from '../components/AboutSection'
import { ContactSection } from '../components/ContactSection'
import { ScrollProgress } from '../components/ScrollProgress'
import { subscribeToProjects } from '../lib/projectsApi'
import { subscribeToSiteInfo, DEFAULT_SITE_INFO } from '../lib/siteInfoApi'

export function Home() {
  const [projects, setProjects] = useState([])
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [siteInfo, setSiteInfo] = useState(DEFAULT_SITE_INFO)
  const [active, setActive] = useState('Tous')
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const unsubscribe = subscribeToProjects((list) => {
      setProjects(list)
      setLoadingProjects(false)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    const unsubscribe = subscribeToSiteInfo(setSiteInfo)
    return unsubscribe
  }, [])

  return (
    <main
      className={
        dark
          ? 'dark page-transition min-h-screen bg-[var(--bg)] text-[var(--ink)] transition-colors duration-500'
          : 'page-transition min-h-screen bg-[var(--bg)] text-[var(--ink)] transition-colors duration-500'
      }
    >
      <ScrollProgress />
      <Header dark={dark} onToggleDark={() => setDark(!dark)} />
      <Hero siteInfo={siteInfo} />
      {!loadingProjects && (
        <ProjectsSection projects={projects} active={active} onChangeActive={setActive} />
      )}
      <AboutSection siteInfo={siteInfo} />
      <ContactSection siteInfo={siteInfo} />
    </main>
  )
}