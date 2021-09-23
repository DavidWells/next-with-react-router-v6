import React from 'react'
import { checkAuth } from '../utils/auth'
import { Navigate } from 'react-router-dom'

export default function WithAuthFunc(Component) {
  return function WithAuthComponent({ ...props }) {
		const authed = checkAuth()
    if (!authed) {
			// return <div>Not allowed</div>
			return <Navigate to='/login' />
		}
    return <Component {...props} />;
  }
}