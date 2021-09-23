import React from 'react'
import withAuth from '../components/WithAuth'

function PrivateWithAuth() {
	return (
		<div>
			<h1>Private</h1>
			<p>This page is protected by withAuth higher order component</p>
		</div>
	)
}

export default withAuth(PrivateWithAuth)