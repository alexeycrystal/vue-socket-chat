export default function guest({next, store}) {
  if (store.getters["auth/getToken"]) {
    return next({
      name: 'dashboard'
    })
  }

  return next()
}
