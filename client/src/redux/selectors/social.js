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
                typeof providerData.loading === 'undefined'
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
    (socialPosts) =>
        Object.keys(socialPosts)
            .reduce((acc, provider) => {
                if (
                    typeof socialPosts[provider].data !== 'undefined' &&
                    Array.isArray(socialPosts[provider].data)
                ) {
                    return [
                        ...acc,
                        ...socialPosts[provider].data.map((post) => ({
                            ...post,
                            provider,
                        })),
                    ]
                }
                return acc
            }, [])
            .sort((postA, postB) => postB.time - postA.time)
)
