import React from 'react'
import { Route, Routes, Link, useParams, Navigate, Outlet } from 'react-router-dom'
import dynamic from 'next/dynamic'
// include home component for instant loading
import Home from '../views/Home'
import ForkMe from '../components/ForkMe'

// Async component loading
function Loading(props: any) {
	return <div>Loading page.... 😃</div>
}
const dynamicOptions = {
  loading: () => <Loading /> 
}
const Foo = dynamic(() => import('../views/Foo'), dynamicOptions)
const FooBar = dynamic(() => import('../views/FooBar'), dynamicOptions)
const NotFound = dynamic(() => import('../views/NotFound'), dynamicOptions)
const ClientOnly = dynamic(() => import('../views/ClientOnly'), dynamicOptions)

const Public = () => <div>public</div>;
const Private = () => <div>private</div>;
const PrivateContents = () => <div>private PrivateContents</div>;

const Login = () => <div>login</div>;

function PrivateOutlet() {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
}

function useAuth() {
  return true;
}

/**
 * This page acts as a SPA
 * If `fallback: false`, then it can be exported with `next export`
 */
export default function SPA() {
  const app = (
    <>
      <ForkMe url="https://github.com/DavidWells/next-with-react-router-v6" />
      <h1>Next.js SPA using React Router v6</h1>
      <p>https://github.com/DavidWells/next-with-react-router-v6</p>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/private-outlet" element={<PrivateOutlet />}>
          <Route element={<PrivateContents />} />
        </Route>
        <Route
          path="/private-nested"
          element={
            <PrivateRoute>
              <Private />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/users/*" element={<Users />} />
        <Route path="/foo" element={<Foo />} />
        <Route path="/foo/bar" element={<FooBar />} />
        <Route path="/client-only" element={<ClientOnly />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )

  // Fix "Expected server HTML to contain a matching <div> in <div>." warning in dev mode
  if (process.env.NODE_ENV === 'development') {
    return (
      <SafeHydrate>
        {app}
      </SafeHydrate>
    )
  }

  return app
}

function SafeHydrate({ children }) {
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
        <Link to="/users">User home</Link>&nbsp;
        <Link to="me">My Profile</Link>&nbsp;
      </nav>
      <Routes>
        <Route path="/" element={<UserHome />} />
				<Route path="me" element={<UserMe />} />
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

function UserMe() {
  return (
		<div>
			User me page. <Link to="/users/123456">Link to user/123456</Link>
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

/* Define the routes you want to statically render during next build here */
export const getStaticPaths = async () => ({
	paths: [
		{ params: { index: [] } },
    // Default loading view set in netlify.toml
    { params: { index: ['loading'] } },
		{ params: { index: ['users'] } },
		{ params: { index: ['foo'] } },
		{ params: { index: ['foo', 'bar'] } },
		{ params: { index: ['foo', 'bar', 'baz'] } },
	],
	fallback: false,
})
