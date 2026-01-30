import type { KeenSliderInstance } from 'keen-slider'

/**
 * Keen Slider plugin that enables horizontal wheel/trackpad scrolling to navigate slides
 * Prevents vertical scrolling while horizontal gesture is active
 */
export function getCarouselSwipeControlsPlugin() {
  return (slider: KeenSliderInstance) => {
    let hTimeout: ReturnType<typeof setTimeout>
    let vTimeout: ReturnType<typeof setTimeout>
    let hLocked = false
    let vLocked = false

    const handleWheel = (e: WheelEvent) => {
      const dx = Math.abs(e.deltaX)
      const dy = Math.abs(e.deltaY)
      const isHorizontal = dx > 10 && dx > dy

      if (vLocked || (hLocked && isHorizontal)) {
        e.preventDefault()
        e.stopPropagation()
        return
      }

      if (hLocked || !isHorizontal) {
        return
      }

      hLocked = vLocked = true
      e.preventDefault()
      e.stopPropagation()

      e.deltaX > 0 ? slider.prev() : slider.next()

      clearTimeout(vTimeout)
      clearTimeout(hTimeout)
      vTimeout = setTimeout(() => {
        vLocked = false
      }, 250)
      hTimeout = setTimeout(() => {
        hLocked = false
      }, 1000)
    }

    slider.on('created', () => {
      slider.container.addEventListener('wheel', handleWheel, { passive: false })
    })

    slider.on('destroyed', () => {
      clearTimeout(hTimeout)
      clearTimeout(vTimeout)
      slider.container.removeEventListener('wheel', handleWheel)
    })
  }
}

export interface AutoplayControls {
  start: () => void
  stop: () => void
}

export interface AutoplayPluginOptions {
  /** Function that returns whether autoplay should be active */
  isActive: () => boolean
  /** Function that returns the interval in milliseconds between slides */
  interval: () => number
  /** Optional ref to expose start/stop controls */
  controls?: AutoplayControls
}

/**
 * Keen Slider plugin that automatically advances slides at a set interval
 * Pauses on mouse hover and when isActive returns false
 * Can be controlled externally via the controls ref
 */
export function getCarouselAutoplayPlugin(options: AutoplayPluginOptions) {
  const { isActive, interval, controls } = options

  return (slider: KeenSliderInstance) => {
    let timeout: ReturnType<typeof setTimeout> | undefined
    let mouseOver = false

    const clear = () => {
      if (timeout) {
        clearTimeout(timeout)
        timeout = undefined
      }
    }

    const schedule = () => {
      clear()
      if (!isActive() || mouseOver) {
        return
      }

      timeout = setTimeout(() => {
        if (!isActive() || mouseOver) {
          return
        }

        slider.next()
      }, interval())
    }

    const stop = () => {
      clear()
    }

    const start = () => {
      schedule()
    }

    // Expose controls if provided
    if (controls) {
      controls.start = start
      controls.stop = stop
    }

    const handleMouseOver = () => {
      mouseOver = true
      stop()
    }

    const handleMouseOut = () => {
      mouseOver = false
      start()
    }

    slider.on('created', () => {
      slider.container.addEventListener('mouseover', handleMouseOver)
      slider.container.addEventListener('mouseout', handleMouseOut)

      start()
    })

    slider.on('dragStarted', () => {
      stop()
    })

    slider.on('animationEnded', start)
    slider.on('updated', start)

    slider.on('destroyed', () => {
      stop()

      slider.container.removeEventListener('mouseover', handleMouseOver)
      slider.container.removeEventListener('mouseout', handleMouseOut)
    })
  }
}
