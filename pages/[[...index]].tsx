import React from 'react'
import { Route, Routes, Link, useParams, useMatch } from 'react-router-dom'
import dynamic from 'next/dynamic'
// include home component for instant loading
import Home from '../views/Home'
import ForkMe from '../components/ForkMe'
// Async component loading
const Foo = dynamic(() => import('../views/Foo'))
const FooBar = dynamic(() => import('../views/FooBar'))
const NotFound = dynamic(() => import('../views/NotFound'))
const Other = dynamic(() => import('../views/Other'))

/**
 * This page acts as a SPA
 * If `fallback: false`, then it can be exported with `next export`
 */
export default function SPA() {
	return (
			<div>
        <ForkMe url="https://github.com/DavidWells/next-with-react-router-v6" />
				<h1>Next.js SPA using React Router v6</h1>
				<p>https://github.com/DavidWells/next-with-react-router-v6</p>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/users/*" element={<Users />} />
					<Route path="/foo" element={<Foo />} />
					<Route path="/foo/bar" element={<FooBar />} />
					<Route path="/other" element={<Other />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
	)
}

function SafeHydrate({ children }) {
	// Must be a div, can't be a fragment 😑🤦‍♂️
  return (
    <div suppressHydrationWarning>
      {typeof document === 'undefined' ? null : children}
    </div>
  )
}

function Users() {
  return (
    <div>
      <nav>
        <Link to="me">My Profile</Link>
      </nav>
      <Routes>
        <Route path="/" element={<UserHome />} />
				<Route path="me" element={<div>User me page</div>} />
        <Route path=":userId" element={<UserProfile />} />
      </Routes>
    </div>
  )
}

function UserHome() {
  return (
		<div>
			User index page
		</div>
  )
}

function UserProfile() {
	const params = useParams()
  return (
		<div>
			User profile "{params.userId}" page
		</div>
  )
}

export function getStaticProps() {
	return {
		props: {},
	}
}

export const getStaticPaths = async () => ({
	paths: [
		{ params: { index: [] } },
		{ params: { index: ['other'] } },
		{ params: { index: ['users'] } },
		{ params: { index: ['foo'] } },
		{ params: { index: ['foo', 'bar'] } },
		{ params: { index: ['foo', 'bar', 'baz'] } },
	],
	fallback: false,
})
