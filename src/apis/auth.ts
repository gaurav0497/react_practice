// import Libraries
import axios from 'axios';
import Environment from '../environment';

let instance = axios.create({
    baseURL: Environment.USER_URL,

    headers: {
        'Content-Type': 'application/json'
                }
    });

const log_prefix = "[Test Project]"

const VERBOSE = Environment.LOGS;

const messages = {
    start: "Starting request.",
    end: "End request.",
    non200x: "The request was made and the server responded with a status code that falls out of the range of 2xx.",
    noResp: "The request was made but no response was received.",
    badConfig: "Something happened in setting up the request that triggered an Error.",
}

const genericError = {
    message: "Something Went Wrong",
    status: 500
}

function logger(message: any, verbose: any, type: any) {
    if (verbose) {
        if (type === "error") {
            message = `[ERROR] ${message}`;
            type = "info"
        }
        if (process.env.NODE_ENV !== "production") {
            // console[type](message);
        }
    }
}

function defaultCatch(error: any, resolve: any) {
    if (error.response) {
        logger(`${log_prefix} ${messages.non200x}`, VERBOSE, "error");
        logger(`${log_prefix} evaluating(error.response) ${error.response}`, VERBOSE, "error");

        resolve(error.response)
    } else if (error.request) {
        logger(`${log_prefix} ${messages.noResp}`, VERBOSE, "error");
        logger(`${log_prefix} evaluating(http.ClientRequest) ${error.request}`, VERBOSE, "error");

        resolve(genericError)
    } else {
        logger(`${log_prefix} ${messages.badConfig}`, VERBOSE, "error");
        logger(`${log_prefix} evaluating(config) ${error.config}`, VERBOSE, "error");
        logger(`${log_prefix} evaluating(axios.instance) ${instance}`, VERBOSE, "error");

        resolve(genericError)
    }
}


export default class Auth {

    static login(values: any) {
        let payload = values;
        logger(`${log_prefix} ${messages.start} login`, VERBOSE, "info");
        return new Promise(resolve => {
            instance.post('users/v1/user/login', JSON.stringify(payload.data))
                .then(function (response) {
                    resolve(response)
                })
                .catch(function (error) {
                    defaultCatch(error, resolve)
                });
        });
    }


    //send reset pass link to email
    static sendResetPassLink({ email }: any) {
        logger(`${log_prefix} ${messages.start} sendResetPassLink`, VERBOSE, "info");
        return new Promise(resolve => {
            instance.post('users/v1/user/reset_password/',{
                email_resetpassword_link : email
            })
                .then(function (response) {
                    resolve(response)
                })
                .catch(function (error) {
                    defaultCatch(error, resolve)
                });
        });
    }
    
    //reset password
    static resetPassword({token,data}: any) {
        logger(`${log_prefix} ${messages.start} login`, VERBOSE, "info");

        return new Promise(resolve => {
            instance.post('users/v1/user/reset_password/verify_token/'+token, data)
                .then(function (response) {
                    resolve(response)
                })
                .catch(function (error) {
                    defaultCatch(error, resolve)
                });
        });
    }

    static signUp(values: any) {
        let payload = values;
        logger(`${log_prefix} ${messages.start} login`, VERBOSE, "info");
       
        return new Promise(resolve => {
            instance.post('users/v1/user', JSON.stringify(payload.data))
                .then(function (response) {
                    resolve(response)
                })
                .catch(function (error) {
                    defaultCatch(error, resolve)
                });
        });
    }

    static updateUser({data,account_id,cred}: any) {
        instance.defaults.headers.common["x-access-token"] = cred.session_token
        instance.defaults.headers.common["x-access-user"] = cred.account_id
        logger(`${log_prefix} ${messages.start} login`, VERBOSE, "info");

        return new Promise(resolve => {
            instance.patch('users/v1/user/'+account_id,data)
                .then(function (response) {
                    resolve(response)
                })
                .catch(function (error) {
                    defaultCatch(error, resolve)
                });
        });
    }

    static deleteUser({  account_id, cred }: any) {
        instance.defaults.headers.common["x-access-token"] = cred.session_token
        instance.defaults.headers.common["x-access-user"] = cred.account_id
        logger(`${log_prefix} ${messages.start} login`, VERBOSE, "info");

        return new Promise(resolve => {
            instance.delete('users/v1/user/' + account_id)
                .then(function (response) {
                    resolve(response)
                })
                .catch(function (error) {
                    defaultCatch(error, resolve)
                });
        });
    }


}