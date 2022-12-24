import constants from "../constants";

const initial_state = {
  success: false,
  isLoggedIn: false,
  loading: false,
  contact: [],
};

export default function contacts(state = initial_state, action: any): any {
  switch (action.type) {
    case constants("contacts").reducers.login.load:
      return {
        ...state,
        loading: true,
      };
    case constants("auth").reducers.login.success:
      return {
        ...state,
        loading: false,
        success: true,
        isLoggedIn: true,
        contact: action.payload.data,
      };
    case constants("auth").reducers.login.error:
      return {
        ...state,
        loading: false,
        success: false,
        isLoggedIn: false,
        data: {
          message: action.payload.message,
        },
      };
    case constants("auth").reducers.login.unload:
      return {
        ...state,
        loading: false,
      };
    case constants("auth").reducers.signUp.success:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.data,
        userId: action.payload?.id,
        userType: action.payload?.type,
      };
    case constants("auth").reducers.signUp.error:
      return {
        ...state,
        isLoggedIn: false,
      };
    case constants("auth").reducers.logout.success:
      return {
        ...initial_state,
        user: null,
      };
    default:
      return state;
  }
}
