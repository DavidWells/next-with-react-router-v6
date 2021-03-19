import * as React from 'react'
import { Link } from 'react-router-dom'
import LinkNext from 'next/link'

const routes = [
	'/', 
	'/users', 
	'/users/me', 
	'/other', 
	'/foo', 
	'/foo/bar', 
	'/get-static-props', 
	'/get-server-side-props',
	'/about',
	'/fake-page-to-404',
]

export default function Navigation() {
	return (
		<section style={{ display: 'flex' }}>
			<div style={{ marginRight: 70 }}>
				<h2>Using React Router "Link" component</h2>
				{routes.map(href => (
					<div>
						<Link key={href} to={href}>
							{href}
						</Link>
					</div>
				))}
			</div>
			<div>
				<h2>Using NextJS "Link" component</h2>
				{routes.map(href => (
					<div>
						<LinkNext key={href} href={href}>
						{href}
						</LinkNext>
					</div>
				))}
			</div>
		</section>
	)
}
