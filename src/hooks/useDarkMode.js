import { useState, useEffect } from 'react'

export default function useDarkMode() {
  const [theme, setTheme] = useState('dark')
  // think of it as a toogle
  const colorTheme = theme === 'dark' ? 'light' : 'dark'
  useEffect(() => {
    console.log('loop')
    const root = window.document.documentElement
    root.classList.remove(colorTheme)
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme, colorTheme])

  return [colorTheme, setTheme]
}
