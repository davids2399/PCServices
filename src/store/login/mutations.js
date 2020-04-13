export function login (state, payload) {
    state.user.isCompany = payload
    state.user.loggedIn = true
}
