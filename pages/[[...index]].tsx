import React from 'react'
import { Route, Routes, Link, Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import dynamic from 'next/dynamic'
import { checkAuth, useAuth } from '../utils/auth'
// include home component for instant loading
import Home from '../views/Home'
import ForkMe from '../components/ForkMe'

/* Higher order component private routes */
import PrivateWithAuth from '../views/PrivateWithAuth'
import PrivateWithAuthClass from '../views/PrivateWithClassHoc'

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

const Posts = dynamic(() => import('../views/Posts'), dynamicOptions)
const Post = dynamic(() => import('../views/Post'), dynamicOptions)
const PostLists = dynamic(() => import('../components/PostList'), dynamicOptions)

const Public = () => <div><h1>Public</h1></div>
const Private = () => <div><h1>private</h1></div>
const PrivateContents = () => {
  return (
    <div>
      <h1>PrivateContents</h1>
      <Link to='/login' state={{ more: 'stuff' }}>Go to login</Link>
    </div>
  )
}

const Login = (props) => {
  const { auth, login } = useAuth();
  const location = useLocation()
  console.log('useLocation', location) // <-- doesnt contain state from <Navigate>
  console.log('history?.state?.options?.pathname', history?.state?.options?.pathname)
  function handleLogin() {
    login()
    console.log('useLocation', location)
    console.log('redirect to', history?.state?.options?.pathname)
  }

  if (auth) {
    return <Navigate to="/" replace />
  }

  return (
    <div>
      <h1>Please login</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

function PrivateOutlet() {
  const location = useLocation()
  console.log('location.pathname', location.pathname)
  const auth = checkAuth()
  return auth ? <Outlet /> : <Navigate to="/login" state={{ pathname: location.pathname }} replace />
}

function PrivateRoute({ children }) {
  const location = useLocation()
  console.log('location.pathname', location.pathname)

  const auth = checkAuth()
  return auth ? children : <Navigate to="/login" state={{ pathname: location.pathname }} replace />
}

/**
 * This page acts as a SPA
 * If `fallback: false`, then it can be exported with `next export`
 */
export default function SPA() {
  const { isLoading, auth, logout } = useAuth();
  console.log('isLoading', isLoading)
  console.log('auth', auth)

  if (isLoading) {
    return <div>Loading</div>
  }

  const app = (
    <>
      <ForkMe url="https://github.com/DavidWells/next-with-react-router-v6" />
      <div id="header"> 
        <Link to='/'>
          Home
        </Link>
        {'  '}
        <Link to='/public'>
          Public
        </Link>
        {'  '}
        <Link to='/private-nested'>
          Private
        </Link>
        {'  '}
        <Link to='/doesnt-exist'>
          404
        </Link>
        {'  '}
        {auth && <button onClick={logout}>Logout</button>}
        <h3>
          Next.js SPA using React Router v6
        </h3>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/public" element={<Public />} />
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
        <Route path="/private-with-auth" element={<PrivateWithAuth />} />
        <Route path="/private-with-auth-class" element={<PrivateWithAuthClass />} />

        <Route path="/login" element={<Login />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/users/*" element={<Users />} />
        <Route path="/foo" element={<Foo />} />
        <Route path="/foo/bar" element={<FooBar />} />
        <Route path="/client-only" element={<ClientOnly />} />
        {/* Dynamic slugs example */}
        <Route path="/posts" element={<Posts />}>
          <Route path="/posts" element={<PostLists />} />
          <Route path="/posts/:slug" element={<Post />} />
        </Route>
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
