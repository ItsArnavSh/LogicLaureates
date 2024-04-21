const authbaseUrl = 'http://localhost:4000/api/v1/auth';
const landBaseUrl = 'http://localhost:4000/api/v1/storage';
const adminBaseUrl = 'http://localhost:4000/api/v1/admin';

export const authEndpoints  = {
    sendOtp: authbaseUrl + '/sendOtp',
    signup: authbaseUrl + '/signup',
    login: authbaseUrl + '/login',
    changePassword: authbaseUrl + '/changePassword',
    resetPasswordToken: authbaseUrl + '/resetPasswordToken',
    resetPassword: authbaseUrl + '/resetPassword',
    loginToken: authbaseUrl + '/login-token',
}

export const landEndpoints = {
    createLand: landBaseUrl + '/create-storage',
    getPendingLands: adminBaseUrl + '/get-draft-lands'
}