import * as React from 'react'
import App, { AppProps } from 'next/app'
import CustomBrowserRouter from '../router/CustomBrowserRouter'
import Navigation from '../views/Navigation'

export default class CustomApp extends App<AppProps> {
	render() {
		const { Component, pageProps } = this.props

		return (
			<CustomBrowserRouter asPath={this.props.router.asPath}>
				<Component {...pageProps} />
				<Navigation />
			</CustomBrowserRouter>
		)
	}
}
