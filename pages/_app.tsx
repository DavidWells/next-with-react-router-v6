import App, { AppProps } from 'next/app'
import CustomBrowserRouter from '../router/CustomBrowserRouter'
import Navigation from '../components/Navigation'
import onRouteChange from '@analytics/router-utils'

onRouteChange((newRoutePath) => {
  console.log('new route path', newRoutePath)
})

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
