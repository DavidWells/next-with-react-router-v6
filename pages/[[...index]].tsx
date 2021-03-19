import React from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import dynamic from 'next/dynamic'
import Other from '../views/Other'

const Home = dynamic(() => import('../views/Home'))
const Foo = dynamic(() => import('../views/Foo'))
const FooBar = dynamic(() => import('../views/FooBar'))
const NotFound = dynamic(() => import('../views/NotFound'))
// const Other = dynamic(() => import('../views/Other'))

function SafeHydrate({ children }) {
	// Must be a div, can't be a fragment 😑🤦‍♂️
  return (
    <div suppressHydrationWarning>
      {typeof document === 'undefined' ? null : children}
    </div>
  )
}
/**
 * This page acts as a SPA
 * If `fallback: false`, then it can be exported with `next export`
 */
export default function SPA() {
	return (
		<SafeHydrate>
			<div>
				<h1>SPA - Single SPA with StaticProps</h1>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/users/*" element={<Users />} />
					<Route path="/foo" element={<Foo />} />
					<Route path="/foo/bar" element={<FooBar />} />
					<Route path="/other" element={<Other />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</SafeHydrate>
	)
}

function Users() {
  /* All <Route path> and <Link to> values in this
     component will automatically be "mounted" at the
     /users URL prefix since the <Users> element is only
     ever rendered when the URL matches /users/*
  */
  return (
    <div>
      <nav>
        <Link to="me">My Profile</Link>
      </nav>

      <Routes>
        <Route path="/" element={<div>User index</div>} />
        <Route path=":id" element={<div>User profile</div>} />
        <Route path="me" element={<div>User me</div>} />
      </Routes>
    </div>
  );
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
