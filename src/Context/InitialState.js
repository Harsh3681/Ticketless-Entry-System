export const initialState = {
    user:null,
    success:null,
    isLoggedIn:null,
    localStorageUser:null,
    uid:null,
    mode:null,
}

export const reducer = (data,action) => {
    switch (action.type) {
        case 'user': {
          return {
            ...data, 
            user: action.user,
          };
        }
        default: {
          throw Error('Unknown action: ' + action.type);
        }
      }
}

  