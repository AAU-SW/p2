import { Route, Switch, useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import './App.css';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { LearnMore } from './pages/LearnMore';
import { Home } from './pages/Home';
import { Advice } from './pages/Advice';
import { TimePlan } from './pages/TimePlan';
import { Expenses } from './pages/Expenses';
import { MyBudget } from './pages/MyBudget';
import { Settings } from './pages/Settings';
import { Sidebar } from './components/SideBar';
import { PrivateRoute } from './components/PrivateRoute';
import { GlobalLoader } from './components/GlobalLoader';
import { CookieConsent } from './components/CookieConsent';
import { checkAuth } from './utils/checkAuth';
import { Header } from './components/Header';

const App = () => {
  const [location, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const pageTitles = [
    {
      route: '/',
      title: 'Overview',
    },
    {
      route: '/expenses',
      title: 'Expenses',
      subTitle: 'Control your spending, shape your freedom',
    },
    {
      route: '/budget',
      title: 'Budgets',
      subTitle: 'Budget with purpose, spend with confidence, live with freedom',
    },
    {
      route: '/settings',
      title: 'Settings',
    },
    {
      route: '/advice',
      title: 'Advice',
    },
    {
      route: '/timeplan',
      title: 'Income',
      subTitle: 'Grow your income, guide your budget, and own your future',
    },
  ];

  const currentRoute = pageTitles.find((route) => {
    if (route.route === location) {
      return true;
    }
  });

  useEffect(() => {
    checkAuth()
      .then((res) => setIsAuthenticated(res))
      .finally(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    const publicPaths = ['/login', '/sign-up'];

    if (isAuthenticated) {
      // logged in → avoid auth pages
      if (publicPaths.includes(location)) {
        setLocation('/', { replace: true });
        return;
      }
    } else {
      // not logged in → protect pages
      if (!publicPaths.includes(location)) {
        setLocation('/login', { replace: true });
      }
    }
  }, [isAuthenticated, location, setLocation, isLoaded]);

  if (!isLoaded) {
    return <GlobalLoader></GlobalLoader>;
  }

  return (
    <main style={{ display: 'flex', height: '100%', overflowX: 'hidden' }}>
      {isAuthenticated && <Sidebar />}
      <div
        style={{
          width: '100%',
          overflowY: 'scroll',
          padding: isAuthenticated && currentRoute && '16px',
        }}
      >
        {isAuthenticated && currentRoute && (
          <Header title={currentRoute.title} subTitle={currentRoute.subTitle} />
        )}
        <Switch>
          {/* Public */}
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/learn-more">
            <LearnMore />
          </Route>

          <PrivateRoute
            path="/"
            isAuthenticated={isAuthenticated}
            redirectPath="/login"
          >
            <Home />
          </PrivateRoute>
          <PrivateRoute
            path="/timeplan"
            isAuthenticated={isAuthenticated}
            redirectPath="/login"
          >
            <TimePlan />
          </PrivateRoute>
          <PrivateRoute
            path="/advice"
            isAuthenticated={isAuthenticated}
            redirectPath="/login"
          >
            <Advice />
          </PrivateRoute>
          <PrivateRoute
            path="/expenses"
            isAuthenticated={isAuthenticated}
            redirectPath="/login"
          >
            <Expenses />
          </PrivateRoute>
          <PrivateRoute
            path="/budget"
            isAuthenticated={isAuthenticated}
            redirectPath="/login"
          >
            <MyBudget />
          </PrivateRoute>
          <PrivateRoute
            path="/settings"
            isAuthenticated={isAuthenticated}
            redirectPath="/login"
          >
            <Settings />
          </PrivateRoute>

          <PrivateRoute isAuthenticated={isAuthenticated} redirectPath="/login">
            <div>Not found</div>
          </PrivateRoute>
        </Switch>
      </div>
      <CookieConsent />
    </main>
  );
};

export default App;
