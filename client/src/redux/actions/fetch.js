/**
 * Generic action generator for resource fetching actions
 * @param {string} resourceName Resource name
 */
export const getFetchResourceActionList = (resourceName) => [
    `REQUEST_${resourceName}`,
    `REQUEST_${resourceName}_SUCCESS`,
    `REQUEST_${resourceName}_FAILURE`,
    `REQUEST_${resourceName}_CANCEL`,
]
