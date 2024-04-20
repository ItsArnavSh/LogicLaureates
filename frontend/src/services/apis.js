const baseUrl = process.env.BASE_URL+ '/auth';

export const authEndpoints  = {
    sendOtp: baseUrl + '/sendOtp',
    signup: baseUrl + '/signup',
    login: baseUrl + '/login',
    changePassword: baseUrl + '/changePassword',
    resetPasswordToken: baseUrl + '/resetPasswordToken',
    resetPassword: baseUrl + '/resetPassword',
    loginToken: baseUrl + '/login-token',
}