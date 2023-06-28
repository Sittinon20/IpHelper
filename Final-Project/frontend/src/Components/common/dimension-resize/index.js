import { useEffect, useState, useLayoutEffect } from 'react'

export const useDimensionsResize = (myRef) => {
  const getDimensions = () => ({
    width: myRef.current ? myRef.current.offsetWidth : 0,
    height: myRef.current ? myRef.current.offsetHeight : 0
  })

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const handleResize = () => {
    setDimensions(getDimensions())
  }

  useLayoutEffect(() => {
    const time = setTimeout(() => {
      if (myRef.current) {
        setDimensions(getDimensions())
      }
    }, 1000)

    if (myRef.current) {
      setDimensions(getDimensions())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(time)
      window.removeEventListener('resize', handleResize)
    }
  }, [myRef, myRef.current?.offsetWidth])

  return dimensions
}
