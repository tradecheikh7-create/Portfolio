import { forwardRef } from 'react'

export const Magnetic = forwardRef(function Magnetic({ children, className = '', as: Tag = 'a', strength = 0.25, ...props }, forwardedRef) {
  function handleMouseMove(e) {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  function handleMouseLeave(e) {
    e.currentTarget.style.transform = 'translate(0px, 0px)'
  }

  return (
    <Tag
      ref={forwardedRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnetic inline-flex ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
})