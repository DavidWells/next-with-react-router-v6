import React from 'react'

export default function SSGOnly(props: any) {
	const data = props || {}
	return (
		<section>
			<h1>Using file-system route and getStaticProps</h1>
			<pre>
				<code>{JSON.stringify(data, null, 2)}</code>
			</pre>
		</section>
	)
}

export async function getStaticProps() {
	return {
		props: { fromServer: new Date().toTimeString() },
	}
}
