import * as React from 'react'

export default function ClientOnly() {
	return (
		<section>
			<h1>Client only page</h1>
			<p>This page is not statically generated on build and only lives in react bundle</p>
		</section>
	)
}
