import React from 'react'
import withAuth from '../components/WithAuthClass'

function PrivateViaClass() {
	return (
		<div>
			<h1>Private Class Hoc</h1>
			<p>This page is protected by a class based withAuth HOC</p>
		</div>
	)
}

export default withAuth(PrivateViaClass)