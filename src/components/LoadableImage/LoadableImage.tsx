import React, { useRef, useState, useEffect, useMemo } from 'react'
import block from 'bem-cn'
import { motion } from 'framer-motion'

import useOnScreen from 'shared/hooks/useOnScreen'

import './LoadableImage.scss'

interface ILoadableImageProps {
  src: string
  alt?: string
  className?: string
  classNameContainer?: string
  hidden?: boolean
  animationType?: 'smallToBig' | 'slide' | 'appearance'
}

const b = block('loadable-image')

function LoadableImage(props: ILoadableImageProps) {
  const {
    src,
    alt = '',
    className = '',
    hidden = false,
    classNameContainer = '',
    animationType = '',
  } = props

  const [isLoaded, setIsLoaded] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef(null)
  const isVisible = useOnScreen(containerRef)

  useEffect(() => {
    if (!isVisible || isLoaded) {
      return
    }
    if (imageRef.current) {
      imageRef.current.onload = () => {
        if (imageRef.current) {
          setIsLoaded(true)
        }
      }
    }
  }, [isVisible, isLoaded])

  const variants = useMemo(() => {
    switch (animationType) {
      case 'smallToBig':
        return {
          visible: { opacity: 1, scale: 1 },
          hidden: { opacity: 0.95, scale: 0.85 },
        }
      case 'slide':
        return {
          visible: { opacity: 1, left: 0 },
          hidden: { opacity: 0.95, left: 150 },
        }
      case 'appearance':
        return {
          visible: { opacity: 1 },
          hidden: { opacity: 0.1 },
        }
      default:
        return { visible: { opacity: 1, scale: 1 }, hidden: { opacity: 0, scale: 1 } }
    }
  }, [animationType])

  return (
    <motion.div
      ref={containerRef}
      className={b('container', {
        loaded: isLoaded,
      }).mix(classNameContainer)}
      initial="hidden"
      animate={isLoaded ? 'visible' : 'hidden'}
      transition={{ duration: 0.2, ease: 'easeIn' }}
      variants={variants}>
      {(isVisible || isLoaded) && (
        <img
          ref={imageRef}
          className={b('image', {
            loaded: isLoaded,
            hidden,
          }).mix(className)}
          src={src}
          alt={alt}
        />
      )}
    </motion.div>
  )
}

export default LoadableImage
