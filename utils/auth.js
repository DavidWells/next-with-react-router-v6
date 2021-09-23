

export function checkAuth() {
  return Boolean(localStorage.getItem('authed'))
}
