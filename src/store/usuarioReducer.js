const INITIAL_STATE = {
    usuarioEmail: '',
    usuarioLogado: 0,
    popUpState: false,
}

function usuarioReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "LOG_IN":
            return { ...state, usuarioLogado: 1, usuarioEmail: action.usuarioEmail, popUpState: false }
        case "LOG_OUT":
            return { ...state, usuarioLogado: 0, usuarioEmail: null, popUpState: true }
        default:
            return state;
    }
}

export default usuarioReducer;