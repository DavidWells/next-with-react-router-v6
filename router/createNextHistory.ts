import NextRouter from 'next/router'
import { parsePath, createMemoryHistory, MemoryHistory, To } from 'history'

interface MemoryHistoryState {
	shallow?: boolean
	locale?: string | false
}
export type MemoryHistoryInstance = MemoryHistory<MemoryHistoryState>

function fromReactRouterToNextUrl(to: To) {
	const path = typeof to === 'string' ? parsePath(to) : to
	const nextPath = {
		hash: path.hash,
		pathname: path.pathname,
		search: path.search,
	}
	return nextPath
}

export function createNextHistory(asPath: string): MemoryHistoryInstance {
	const historyMemory = createMemoryHistory({ initialEntries: [asPath] }) as MemoryHistoryInstance

	const enhancedHistory: MemoryHistoryInstance = {
		get index() {
			return historyMemory.index
		},
		get action() {
			return historyMemory.action
		},
		get location() {
			return historyMemory.location
		},
		createHref: historyMemory.createHref,
		push(to, state) {
			// alert(JSON.stringify(to))
			const path = fromReactRouterToNextUrl(to)
			historyMemory.push(to, state)
			NextRouter.push(path, void 0, state as any)
		},
		replace(to, state) {
			const path = fromReactRouterToNextUrl(to)
			historyMemory.replace(to, state)
			NextRouter.replace(path, void 0, state as any)
		},
		go(_delta) {
			throw new Error(`history.go isn't supported`)
		},
		back() {
			historyMemory.go(-1)
			NextRouter.back()
		},
		forward() {
			throw new Error(`history.forward isn't supported`)
		},
		listen(listener) {
			function handleRouteChange(_url: string) {
				listener({
					action: historyMemory.action,
					location: historyMemory.location,
				})
			}
			NextRouter.events.on('routeChangeComplete', handleRouteChange)
			NextRouter.events.on('hashChangeComplete', handleRouteChange)

			return () => {
				NextRouter.events.off('routeChangeComplete', handleRouteChange)
				NextRouter.events.off('hashChangeComplete', handleRouteChange)
			}
		},
		block(_blocker) {
			throw new Error(`history.block isn't supported`)
		},
	}

	function handleRouteChangeFromNext(url: string) {
		const to = parsePath(url)
		historyMemory.push(to, { locale: NextRouter.locale })
	}
	NextRouter.events.on('routeChangeComplete', handleRouteChangeFromNext)
	NextRouter.events.on('hashChangeComplete', handleRouteChangeFromNext)

	return enhancedHistory
}
