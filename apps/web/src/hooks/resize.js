import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'

export const useResize = () => {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isMobile = breakpoints.smaller('md')

  return {
    isMobile,
  }
}
