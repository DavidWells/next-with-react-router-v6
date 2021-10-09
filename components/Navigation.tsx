import React from 'react'
import { Link } from 'react-router-dom'
import NextLink from 'next/link'

const routes = [
	{ 
		href: '/',
		type: 'react-router',
	},
	{ 
		href: '/public',
		type: 'react-router',
	},
	{ 
		href: '/private-nested',
		type: 'react-router',
	},
	{
		href: '/private-outlet',
		type: 'react-router',
	},
  {
    title: 'Private Functional HOC',
		href: '/private-with-auth',
		type: 'react-router',
	},
  {
    title: 'Private Class HOC',
		href: '/private-with-auth-class',
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

function AuthLinks({ component }) {
	const Component = component
	return (
		<>
			<Component to="/">Public</Component>
				{" | "}
			<Component to="/private-nested">Private Using Nested</Component>
				{" | "}
			<Component to="/private-outlet">Private Using Outlet</Component>
		</>
	)
}

function PostLinks() {
	return (
		<>
			<Link to="/posts">Posts</Link>
				{" | "}
			<Link to="/posts/1">post one</Link>
				{" | "}
			<Link to="/posts/2">post two</Link>
		</>
	)
}

export default function Navigation() {
	return (
		<div>

			<div style={{ 
        position: 'fixed',
        bottom: 0,
        paddingBottom: 20,
        background: 'white',
        borderTop: '2px solid black'
      }}>
        <h1>Link Tests</h1>
        <PostLinks />
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 70 }}>
            <h2>Using React Router &lt;Link&gt;</h2>
            {routes.map(({ href, title = '', type }) => (
              <div key={href} title={`Using <Link> component`}>
                <Link to={href}>
                  <span>{href} {title} - ({type})</span>
                </Link>
              </div>
            ))}
          </div>
          <div style={{ marginRight: 70 }}>
            <h2>Using NextJS &lt;NextLink&gt;</h2>
            {routes.map(({ href, type }) => (
              <div key={href} title={`Using <NextLink> component`}>
                <NextLink href={href}>
                  <a>{href} - ({type})</a>
                </NextLink>
              </div>
            ))}
          </div>
          <div>
            <h2>Using Normal &lt;a&gt; tag</h2>
            {routes.map(({ href, type }) => (
              <div key={href} title={`Using <a> tag`}>
                <a href={href}>
                  {href} - ({type})
                </a>
              </div>
            ))}
          </div>
        </div>
			</div>
		</div>
	)
}
