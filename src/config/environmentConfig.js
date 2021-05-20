const DEFAULT_API_VERSION = process.env.REACT_APP_DEFAULT_API_VERSION

const getBaseApiUrl = () => {
    switch (ENVIRONMENT) {
        case "production":
            return `${process.env.REACT_APP_PRODUCTION_URL}/${DEFAULT_API_VERSION}`
        case "dev":
            return `${process.env.REACT_APP_DEV_URL}/${DEFAULT_API_VERSION}`
        case "local-dev":
            return `${process.env.REACT_APP_LOCAL_DEV_URL}/${DEFAULT_API_VERSION}`
        default:
            return `${process.env.REACT_APP_PRODUCTION_URL}/${DEFAULT_API_VERSION}`
    }
}

export const ENVIRONMENT = process.env.REACT_APP_ENV
export const LONGDO_MAP_KEY = process.env.REACT_APP_LONGDO_MAP_KEY
export const LONGDO_MAP_URL = process.env.REACT_APP_MAP_URL
export const BASE_API_URL = getBaseApiUrl()
export const FIREBASE_CLIENT_CONFIG = {
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    authDomain: process.env.REACT_APP_GOOGLE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_GOOGLE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_GOOGLE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_GOOGLE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_GOOGLE_APP_ID,
    measurementId: process.env.REACT_APP_GOOGLE_MEASUREMENT_ID
}
