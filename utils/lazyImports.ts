import * as React from 'react'

/**
 * Defer loading of components & routes
 * named imports for React.lazy: https://github.com/facebook/react/issues/14603#issuecomment-726551598
 * @param factory - Component import resolver
 * @param name - Name of import key
 * @returns React component
 * @example
 * // Usage
 * const { Home } = lazyImport(() => import("./Home"), "Home");
 */
export function lazyImport<
  T extends React.ComponentType<any>,
  I extends { [K2 in K]: T },
  K extends keyof I
>(factory: () => Promise<I>, name: K): I {
  return Object.create({
    [name]: React.lazy(() => factory().then((module) => ({ default: module[name] }))),
  });
}