import { createStore as reduxCreateStore } from "redux";
import fire from "../fire";
import _ from "lodash";

const reducer = (state, action) => {
  if (action.type === `INCREMENT`) {
    return Object.assign({}, state, {
      count: state.count + 1
    });
  }

  if (action.type === `CREATE_AND_SIGNIN_USER`) {
    fire
      .database()
      .ref("users/" + action.userId)
      .set({
        username: action.account_username,
        email: action.email,
        paypal_email: "",
        hasNotifications: false,
        seller: false,
        stripe: false
      });

    return {
      ...state,
      userId: action.userId,
      account_username: action.account_username,
      firstTimeLogin: true,
      isSeller: false,
      userAuthenticated: true
    };
  }

  if (action.type === `CLEAR_NOTIFICATIONS`) {
    return { ...state, hasNotifications: false };
  }

  if (action.type === `SET_CURRENT_USER`) {
    console.log(
      "setting current user",
      action.userId,
      action.username,
      action.name,
      action.email
    );

    return {
      ...state,
      userId: action.userId,
      email: action.email,
      username: action.username,
      name: action.name,
      authenticated: true
    };
  }

  if (action.type === `LOGOUT_USER`) {
    //document.cookie = "boardgrab_user" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    fire.auth().signOut();
    return {
      ...state,
      userId: "",
      account_username: "",
      userAuthenticated: false
    };
  }

  return state;
};

const initialState = {
  userId: "3M9czDt2fNVf2wWT34tFNrc7Z472",
  email: "rva.christian91@gmail.com",
  username: "rva.christian",
  name: "Christian Bryant",
  authenticated: true,
  isCompetitor: false,
	competitorType: 'Surf',
};

const createStore = () =>
  reduxCreateStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
export default createStore;
