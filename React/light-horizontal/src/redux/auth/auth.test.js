import { expectSaga } from 'redux-saga-test-plan';

import { fetchJSON } from '../../helpers/api';
import * as actions from './actions';
import authReducer from './reducers';
import { watchLoginUser, watchRegisterUser, watchForgetPassword } from './saga';

describe('login flow', () => {
    const user = { "id": 1, "username": "test", "password": "test", "firstName": "Test", "lastName": "User", "role": "Admin" };
    it("success", () => {
        return expectSaga(watchLoginUser)
            .withReducer(authReducer)
            .provide({
                call(effect, next) {
                    // Check for the API call to return fake value
                    if (effect.fn === fetchJSON) {
                        if (effect.args[0] === '/users/authenticate') {
                            return user;
                        }
                    }
                    // Allow Redux Saga to handle other `call` effects
                    return next();
                },
            })
            .dispatch(actions.loginUser("test", "test"))
            .hasFinalState({ user: user, loading: false, error: null })
            .silentRun();
    });

    it("error", () => {
        const error = new Error('Username or password is incorrect');

        return expectSaga(watchLoginUser)
            .withReducer(authReducer)
            .provide({  
                call(effect, next) {
                    // Check for the API call to return fake value
                    if (effect.fn === fetchJSON) {
                        if (effect.args[0] === '/users/authenticate') {
                            throw error;
                        }
                    }
                    // Allow Redux Saga to handle other `call` effects
                    return next();
                },
            })
            .dispatch(actions.loginUser("test1", "test"))
            .hasFinalState({ user: null, loading: false, error: error })
            .silentRun();
    });
});


describe('register flow', () => {
    const user = { "id": 1, "username": "test", "password": "test", "firstName": "Test", "lastName": "User", "role": "Admin" };
    it("success", () => {
        return expectSaga(watchRegisterUser)
            .withReducer(authReducer)
            .provide({
                call(effect, next) {
                    // Check for the API call to return fake value
                    if (effect.fn === fetchJSON) {
                        if (effect.args[0] === '/users/register') {
                            return user;
                        }
                    }
                    // Allow Redux Saga to handle other `call` effects
                    return next();
                },
            })
            .dispatch(actions.registerUser("Test", "test", "test"))
            .hasFinalState({ user: user, loading: false, error: null })
            .silentRun();
    });
});


describe('forget password flow', () => {
    const successMessage = "We've sent you a link to reset password to your registered email.";
    const error = new Error('Sorry, we could not find any registered user with entered username');

    it("success", () => {
        return expectSaga(watchForgetPassword)
            .withReducer(authReducer)
            .provide({
                call(effect, next) {
                    // Check for the API call to return fake value
                    if (effect.fn === fetchJSON) {
                        if (effect.args[0] === '/users/password-reset') {
                            return { message: successMessage }
                        }
                    }
                    // Allow Redux Saga to handle other `call` effects
                    return next();
                },
            })
            .dispatch(actions.forgetPassword("test"))
            .hasFinalState({ user: null, passwordResetStatus: successMessage, loading: false, error: null })
            .silentRun();
    });

    it("error", () => {
        return expectSaga(watchForgetPassword)
            .withReducer(authReducer)
            .provide({
                call(effect, next) {
                    // Check for the API call to return fake value
                    if (effect.fn === fetchJSON) {
                        if (effect.args[0] === '/users/password-reset') {
                            throw error;
                        }
                    }
                    // Allow Redux Saga to handle other `call` effects
                    return next();
                },
            })
            .dispatch(actions.forgetPassword("test1"))
            .hasFinalState({ user: null, error: error, loading: false })
            .silentRun();
    });
});