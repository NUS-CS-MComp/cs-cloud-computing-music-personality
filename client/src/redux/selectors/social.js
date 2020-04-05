import { createSelector } from 'reselect'

/**
 * Selector for all social post resources
 * @param {Record<string, string>} state Store state
 */
export const socialPostSelector = (state) => state.social

/**
 * Select for social post fetch task loading status
 */
export const socialPostLoadingSelector = createSelector(
    socialPostSelector,
    (data) =>
        Object.keys(data).reduce((acc, provider) => {
            const providerData = data[provider]
            if (
                typeof providerData === 'undefined' ||
                typeof providerData.is_loading === 'undefined'
            ) {
                return Object.assign(acc, { [provider]: false })
            }
            return Object.assign(acc, { [provider]: true })
        }, {})
)

/**
 * Selector for aggregated social post resources
 */
export const socialPostAggregatedSelector = createSelector(
    socialPostSelector,
    (data) =>
        Object.keys(data)
            .reduce((acc, provider) => {
                if (
                    typeof data[provider] !== 'undefined' &&
                    Array.isArray(data[provider])
                ) {
                    return [
                        ...acc,
                        ...data[provider].map((post) => ({
                            ...post,
                            provider,
                        })),
                    ]
                }
                return acc
            }, [])
            .sort((postA, postB) => postB.time - postA.time)
)
