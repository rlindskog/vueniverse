export default function ({ store, redirect }) {
  if (!store.state.user.isAuthenticated) {
    return redirect('/users/auth/sign-in')
  }
}
