import React from 'react'
import { checkAuth } from '../utils/auth'

export default function withAuth(WrappedComponent) {
	class WithAuth extends React.Component {
		constructor (props, context) {
			super(props, context)
			this.state = {
				authed: checkAuth()
			}
		}
		componentDidMount() {
			console.log('with auth loaded')
		}
    componentDidUpdate(prevProps) {
      console.log('Current props: ', this.props)
      console.log('Previous props: ', prevProps)
    }
    render() {
			 // @ts-ignore
			const { authed } = this.state
			console.log('withAuth render auth', authed)
			if (!authed) {
				return <div>Not allowed</div>
			}
      // Wraps the input component in a container, without mutating it. Good!
      return <WrappedComponent {...this.props} />;
    }
  }
  // @ts-ignore
  WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`
	return WithAuth
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}