import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import createPersistedState from 'use-persisted-state';


const isBrowser = typeof window !== 'undefined'

const AUTH_KEY = 'authed'
const useAuthState = createPersistedState('AUTH_KEY');

export function checkAuth() {
  return isBrowser && Boolean(localStorage.getItem(AUTH_KEY))
}

function login() {
  return isBrowser && localStorage.setItem(AUTH_KEY, 'true')
}

function logout() {
  return isBrowser && localStorage.removeItem(AUTH_KEY)
}

export function useAuth() {
  const [ isLoading, setLoading ] = useState(false)
  const [ auth, setAuthed ] = useAuthState(checkAuth())
  const navigate = useNavigate()

  return {
    isLoading,
    auth,
    login: () => {
      setAuthed(true)
      login()
    },
    logout: () => {
      setAuthed(false)
      logout()
    },
    checkAuth: async () => {
      setLoading(true);
      let authStatus = auth
      try {
        authStatus = checkAuth()
      } catch (error) {
        console.log('error', error);
        navigate('/login');
      } finally {
        setAuthed(authStatus)
        setLoading(false);
      }
    },
  };
}