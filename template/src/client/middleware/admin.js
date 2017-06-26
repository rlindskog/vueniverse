export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.user.isAuthenticated) {
    return redirect('/users/auth/sign-in')
  } else if (!store.state.user.admin) {
    return redirect(`/users/${store.state.user.username}`)
  }
}
