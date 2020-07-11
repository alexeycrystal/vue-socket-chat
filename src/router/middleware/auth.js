export default function auth ({ next, store }){
  if(!store.getters["auth/getToken"]){
    return next({
      name: 'login'
    })
  }

  return next();
}
