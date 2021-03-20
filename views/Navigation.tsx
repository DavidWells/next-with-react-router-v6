import * as React from 'react'
import { Link } from 'react-router-dom'
import NextLink from 'next/link'

const routes = [
	{ href: '/',
		type: 'react-router',
	},
	{ href: '/users',
		type: 'react-router',
	},
	{ href: '/users/12345-xyz',
		type: 'react-router',
	},
	{ href: '/users/me',
		type: 'react-router',
	},
	{ href: '/other',
		type: 'react-router',
	},
	{ href: '/foo',
		type: 'react-router',
	},
	{ href: '/foo/bar',
		type: 'react-router',
	},
	{ href: '/get-static-props',
		type: 'next',
	},
	{ href: '/get-server-side-props',
		type: 'next',
	},
	{ href: '/about',
		type: 'next',
	},
	{ href: '/fake-page-to-404',
		type: 'react-router',
	}
]

export default function Navigation() {
	return (
		<section style={{ display: 'flex' }}>
			<div style={{ marginRight: 70 }}>
				<h2>Using React Router "Link" component</h2>
				{routes.map(({ href, type }) => (
					<div>
						<Link key={href} to={href}>
							<span>{href} - ({type}) - <i>&lt;Link&gt;</i></span>
						</Link>
					</div>
				))}
			</div>
			<div>
				<h2>Using NextJS "Link" component</h2>
				{routes.map(({ href, type }) => (
					<div>
						<NextLink key={href} href={href}>
							<a>{href} - ({type}) - <i>&lt;NextLink&gt;</i></a>
						</NextLink>
					</div>
				))}
			</div>
		</section>
	)
}
