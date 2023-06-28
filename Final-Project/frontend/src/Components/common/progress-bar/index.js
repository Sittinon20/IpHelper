import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

export const ProgressBar = ({ progress, maxWidth }) => {
  const x = useMotionValue(0)
  const xRange = useTransform(x, [0, 1], [0, maxWidth - 80])
  const pathLength = useSpring(xRange, { stiffness: 400, damping: 90 })

  useEffect(() => {
    x.set(progress)
  }, [progress])

  return (
    <div
      className='w-full'
      style={{
        width: pathLength,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#efefef',
        bottom: 20,
        left: 20
      }}
    >
      <motion.div
        style={{
          width: pathLength,
          height: 6,
          borderRadius: 3,
          backgroundColor: '#0272d5',
          bottom: 20,
          left: 20
        }}
      />
    </div>
  )
}

ProgressBar.defaultProps = {
  maxWidth: 500
}
