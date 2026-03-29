import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export const useResize = () => {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isMobile = breakpoints.smallerOrEqual('md')

  return {
    isMobile,
  }
}
