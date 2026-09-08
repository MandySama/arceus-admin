import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'

export const useResize = () => {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isMobile = breakpoints.smaller('md')
  const isTablet = breakpoints.between('md', 'lg')

  return {
    isMobile,
    isTablet,
  }
}
