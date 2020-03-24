export interface IOAuthParams {
    clientID: string
    responseType: string
    scope: string
    [paramName: string]: any
}

export interface IOAuthConfig {
    providerName: string
    oauthURL: string
    params: IOAuthParams
    search: string[]
}
