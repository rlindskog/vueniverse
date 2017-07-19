export default function ({ error, store }) {
  // If the user is not authenticated
  if (!store.state.user.isAuthenticated) {
    return error({ statusCode: 404 })
  } else if (store.state.user.role !== 'admin') {
    return error({ statusCode: 404 })
  }
}
