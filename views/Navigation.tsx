import * as React from 'react'
import { Link } from 'react-router-dom'
import LinkNext from 'next/link'

const routes = ['/', '/foo', '/foo/bar', '/get-server-side-props']

export default function Navigation() {
	return (
		<section style={{ display: 'flex', flexDirection: 'column' }}>
			<h2>Using React Router "Link" component</h2>
			{routes.map(href => (
				<Link key={href} to={href}>
					{href}
				</Link>
			))}
			<h2>Using NextJS "Link" component</h2>
			{routes.map(href => (
				<LinkNext key={href} href={href}>
					{href}
				</LinkNext>
			))}
		</section>
	)
}
