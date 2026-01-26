interface UseSmoothMouseOptions {
  /**
   * Damping coefficient - controls smoothing and response speed (0-1)
   * Lower = more damping = smoother/slower
   * Higher = less damping = snappier/faster
   * Physics: Amount of velocity applied per frame
   * @default 0.1
   */
  damping?: number
  /**
   * Range multiplier - scales the tracking distance
   * 0.5 = half distance, 1.0 = full distance, 2.0 = amplified
   * Physics: Movement amplitude factor
   * @default 1.0
   */
  range?: number
  /**
   * Epsilon - minimum distance threshold for stopping (pixels)
   * When distance to target < epsilon, animation stops
   * Physics: Convergence tolerance
   * @default 0.5
   */
  epsilon?: number
  /**
   * Whether to round output values to integers
   * @default true
   */
  roundValues?: boolean
}

interface SmoothMousePosition {
  x: number
  y: number
}

/**
 * Composable for smooth mouse tracking with physics-based interpolation
 *
 * @example
 * ```ts
 * const container = ref<HTMLElement>()
 * const { position, onMouseMove, onMouseLeave } = useSmoothMouse(container, {
 *   damping: 0.1,  // Smoothness (lower = smoother)
 *   range: 0.8,    // Tracking distance (1.0 = full)
 *   epsilon: 0.5,  // Stop threshold (pixels)
 * })
 * // Use position.x and position.y in your template
 * ```
 */
export default function useSmoothMouse(
  targetElement: Ref<HTMLElement | undefined | null>,
  options: UseSmoothMouseOptions = {},
) {
  const {
    damping = 0.1,
    range = 1.0,
    epsilon = 0.5,
    roundValues = true,
  } = options

  const currentX = ref(0)
  const currentY = ref(0)

  const targetX = ref(0)
  const targetY = ref(0)

  let animationFrameId: number | null = null
  let isAnimating = false

  const lerp = (start: number, end: number, dampingFactor: number): number => {
    return start + (end - start) * dampingFactor
  }

  const getDistance = (): number => {
    const dx = targetX.value - currentX.value
    const dy = targetY.value - currentY.value
    return Math.sqrt(dx * dx + dy * dy)
  }

  const animate = (): void => {
    const distance = getDistance()

    if (distance < epsilon) {
      currentX.value = targetX.value
      currentY.value = targetY.value
      isAnimating = false
      animationFrameId = null
      return
    }

    currentX.value = lerp(currentX.value, targetX.value, damping)
    currentY.value = lerp(currentY.value, targetY.value, damping)

    animationFrameId = requestAnimationFrame(animate)
  }

  const startAnimation = (): void => {
    if (!isAnimating) {
      isAnimating = true
      animate()
    }
  }

  // Cleanup
  onUnmounted(() => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
    isAnimating = false
  })

  /**
   * Mouse move handler - updates target position relative to element center
   */
  const onMouseMove = (event: MouseEvent): void => {
    if (!targetElement.value) {
      return
    }

    const { top, left, width, height } = targetElement.value.getBoundingClientRect()

    const displacementX = event.clientX - (left + Math.floor(width / 2))
    const displacementY = event.clientY - (top + Math.floor(height / 2))

    targetX.value = displacementX * range
    targetY.value = displacementY * range

    startAnimation()
  }

  /**
   * Mouse leave handler - resets target position to center
   */
  const onMouseLeave = (): void => {
    targetX.value = 0
    targetY.value = 0

    startAnimation()
  }

  // Computed position with optional rounding
  const position = computed((): SmoothMousePosition => ({
    x: roundValues ? Math.round(currentX.value) : currentX.value,
    y: roundValues ? Math.round(currentY.value) : currentY.value,
  }))

  return {
    position,
    onMouseMove,
    onMouseLeave,
  }
}
