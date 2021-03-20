import React, { useEffect, useState } from 'react'

export default function Home() {
	const [loaded, setLoaded] = useState(false)

	useEffect(() => setLoaded(true), [])

	let homePage = <div>Home loading...</div>
	if (loaded) {
		homePage = <h1>Home Page</h1>
	}
	return (
		<div id='home'>
			{homePage}
		</div>
	)
}
