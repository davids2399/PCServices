export default function guest ({ next, store }){
  if(!store.getters["login/auth"].loggedIn){
    return next({
      name: 'login'
    })
  }
    
  return next()
}