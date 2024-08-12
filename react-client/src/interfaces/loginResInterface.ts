export interface ILoginResInterface {
    uid: string,
    email: string,
    emailVerified: boolean,
    isAnonymous: boolean,
    providerData: [
        {
            providerId: string,
            uid: string,
            displayName: null | string,
            email: string,
            phoneNumber: null | string,
            photoURL: null | string
        }
    ],
    stsTokenManager: {
        refreshToken: string,
        accessToken: string,
        expirationTime: number
    },
    "createdAt": string | number,
    "lastLoginAt": string | number,
    "apiKey": string,
    "appName": string
}