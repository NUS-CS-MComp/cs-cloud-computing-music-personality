import { useEffect, useState } from 'react'

const clientReady = typeof window === 'object'

/**
 * Helper function to get window size
 */
const getWindowSize = () => ({
    width: clientReady ? window.innerWidth : undefined,
    height: clientReady ? window.innerHeight : undefined,
})

/**
 * Custom hook to watch viewport size change
 */
const useViewportSize = () => {
    const [viewportSize, setViewportSize] = useState(getWindowSize())

    useEffect(() => {
        if (!clientReady) {
            return
        }
        const resizeHandler = () => setViewportSize(getWindowSize())
        window.addEventListener('resize', resizeHandler)
        // eslint-disable-next-line consistent-return
        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])

    return viewportSize
}

export default useViewportSize
