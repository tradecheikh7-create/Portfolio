export function Arrow({ diagonal = false }) {
  return (
    <span aria-hidden="true" className={diagonal ? 'text-xl leading-none' : 'text-lg'}>
      {diagonal ? '↗' : '→'}
    </span>
  )
}
