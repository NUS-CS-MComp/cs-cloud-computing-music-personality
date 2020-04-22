export interface IOAuthParams {
    clientID?: string
    responseType?: string
    scope?: string
    state?: Record<string, string>
    [paramName: string]: string
}

export interface IOAuthConfig {
    providerName: string
    oauthURL: string
    search: string[]
    nameMap?: Record<string, string>
    params?: IOAuthParams
    resolveMap?: Record<string, Function>
}
