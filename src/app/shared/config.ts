const BASE_URL: string = 'https://videoflix-backend.tobias-reize.de/';

export const config = {
    BASE_URL: BASE_URL,
    VIDEO_URL: BASE_URL + 'api/videos',
    MEDIA_VIDEO_URL: BASE_URL + 'media/videos/',
    REGISTRATION_URL: BASE_URL + 'api/auth/registration/',
    LOGIN_URL: BASE_URL + 'api/auth/login/',
    FORGOT_PASSWORD_URL: BASE_URL + 'api/auth/forgot-password/',
    RESET_PASSWORD_URL: BASE_URL + 'api/auth/reset-password/',
    USER_PROFILE_URL: BASE_URL + 'api/auth/profile/',
};
