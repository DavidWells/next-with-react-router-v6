import * as React from 'react'
import { Link } from 'react-router-dom'
import NextLink from 'next/link'

const routes = [
	{ 
		href: '/',
		type: 'react-router',
	},
	{ 
		href: '/users',
		type: 'react-router',
	},
	{ 
		href: '/users/12345-xyz',
		type: 'react-router',
	},
	{ 
		href: '/users/me',
		type: 'react-router',
	},
	{ 
		href: '/client-only',
		type: 'react-router',
	},
	{ 
		href: '/foo',
		type: 'react-router',
	},
	{ 
		href: '/foo/bar',
		type: 'react-router',
	},
	{ 
		href: '/get-static-props',
		type: 'next',
	},
	{ 
		href: '/get-server-side-props',
		type: 'next',
	},
	{ 
		href: '/about',
		type: 'next',
	},
	{ 
		href: '/fake-page-to-404',
		type: 'react-router',
	},
	{ 
		href: '/api/example',
		type: 'next-api',
	},
	{ 
		href: '/.netlify/functions/hello',
		type: 'netlify-function',
	},
]

export default function Navigation() {
	return (
		<section style={{ display: 'flex' }}>
			<div style={{ marginRight: 70 }}>
				<h2>Using React Router &lt;Link&gt;</h2>
				{routes.map(({ href, type }) => (
					<div key={href}>
						<Link to={href}>
							<span>{href} - ({type}) - <i>&lt;Link&gt;</i></span>
						</Link>
					</div>
				))}
			</div>
			<div style={{ marginRight: 70 }}>
				<h2>Using NextJS &lt;NextLink&gt;</h2>
				{routes.map(({ href, type }) => (
					<div key={href}>
						<NextLink href={href}>
							<a>{href} - ({type}) - <i>&lt;NextLink&gt;</i></a>
						</NextLink>
					</div>
				))}
			</div>
			<div>
				<h2>Using Normal &lt;a&gt; tag</h2>
				{routes.map(({ href, type }) => (
					<div key={href}>
						<a href={href}>
							{href} - ({type}) - <i>&lt;a&gt;</i>
						</a>
					</div>
				))}
			</div>
		</section>
	)
}
