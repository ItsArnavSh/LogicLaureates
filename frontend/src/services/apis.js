const baseUrl = 'http://localhost:3000/api/v1/auth';

export const authEndpoints  = {
    sendOtp: baseUrl + '/sendOtp',
    signup: baseUrl + '/signup',
    login: baseUrl + '/login',
    changePassword: baseUrl + '/changePassword',
    resetPasswordToken: baseUrl + '/resetPasswordToken',
    resetPassword: baseUrl + '/resetPassword',
    loginToken: baseUrl + '/login-token',
}