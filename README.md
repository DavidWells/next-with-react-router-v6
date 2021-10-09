<h1>Next.js SPA with react router v6
<a href="https://app.netlify.com/start/deploy?repository=https://github.com/DavidWells/next-with-react-router-v6">
  <img align="right" src="https://camo.githubusercontent.com/be2eb66bb727e25655f1dcff88c2fdca82a77513/68747470733a2f2f7777772e6e65746c6966792e636f6d2f696d672f6465706c6f792f627574746f6e2e737667" 
  class="deploy-button" 
  alt="deploy to netlify">
</a>
</h1>

Exports static routes for app and uses react router v6 for client side routing.

Inspired by [this gist](https://gist.github.com/tannerlinsley/65ac1f0175d79d19762cf06650707830#gistcomment-3500046). Props to [eddyw](https://github.com/eddyw) and [tannerlinsley](https://github.com/tannerlinsley) for the idea & code ❤️

## How to use

**Install deps**

```
yarn
```

**Run locally**

```
yarn dev
```

**Build**

```
yarn build
```

## Auth Methods

Here are various ways to have protected routes

### Route switcher

Via [bulletproof-react](https://github.com/alan2207/bulletproof-react/tree/11f069d38eda2868d8c2c8edddceeb05f808a668/src/routes)

```ts
import { useAuth } from '@/lib/auth';

const { ProtectedRoutes } = lazyImport(() => import('./ProtectedRoutes'), 'ProtectedRoutes');
const { PublicRoutes } = lazyImport(() => import('./PublicRoutes'), 'PublicRoutes');

export const AppRoutes = () => {
  const auth = useAuth();
  return auth.user ? <ProtectedRoutes /> : <PublicRoutes />;
};

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
  })
}
```

Private Routes

```js
// ProtectedRoutes.js
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { MainLayout } from '@/components/Layout';
import { DiscussionsRoutes } from '@/features/discussions';
import { Landing, Dashboard } from '@/features/misc';
import { Profile, Users } from '@/features/users';

const App = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/app" element={<App />}>
        <Route path="/discussions/*" element={<DiscussionsRoutes />} />
        <Route path="/users/*" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
      <Route path="/" element={<Landing />} />
    </Routes>
  );
};
```

```js
// @/features/discussions DiscussionsRoutes
import { Route, Routes } from 'react-router-dom';

import { Discussion } from './Discussion';
import { Discussions } from './Discussions';

export const DiscussionsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Discussions />} />
      <Route path=":discussionId" element={<Discussion />} />
    </Routes>
  );
};
```

Public Routes

```js
// PublicRoutes.js
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '@/features/auth';
import { Landing } from '@/features/misc';

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/" element={<Landing />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
```

```js
// features/auth Routes
import { Route, Routes } from 'react-router-dom';

import { Login } from './Login';
import { Register } from './Register';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};
```

## Alternative approaches

- Using react router v5 https://github.com/DavidWells/next-with-react-router-v5
- https://github.com/colinhacks/nextjs-react-router
- https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
- https://gist.github.com/tannerlinsley/65ac1f0175d79d19762cf06650707830