import React from 'react'
import { Route, Routes } from 'react-router-dom'
import dynamic from 'next/dynamic'

const Home = dynamic(() => import('../views/Home'))
const Foo = dynamic(() => import('../views/Foo'))
const FooBar = dynamic(() => import('../views/FooBar'))
const NotFound = dynamic(() => import('../views/NotFound'))

/**
 * This page acts as a SPA
 * If `fallback: false`, then it can be exported with `next export`
 */
export default function SPA() {
	return (
		<section>
			<h1>SPA - Single SPA with StaticProps</h1>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/foo" element={<Foo />} />
				<Route path="/foo/bar" element={<FooBar />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</section>
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
		{ params: { index: ['foo'] } },
		{ params: { index: ['foo', 'bar'] } },
		{ params: { index: ['foo', 'bar', 'baz'] } },
	],
	fallback: false,
})
