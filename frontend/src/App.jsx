import { Route, Switch, useLocation, Redirect } from 'wouter';
import { useEffect, useState } from 'react';
import './App.css';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';
import { Activities } from './pages/Activities';
import { Advice } from './pages/Advice';
import { TimePlan } from './pages/TimePlan';
import { Expenses } from './pages/Expenses';
import { MyBudget } from './pages/MyBudget';
import { LogOut } from './pages/LogOut';
import { Settings } from './pages/Settings';
import { Sidebar } from './components/SideBar';
import { PrivateRoute } from './components/PrivateRoute';
import { GlobalLoader } from './components/GlobalLoader';

const App = () => {
  const [location] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/auth/', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(data.status === true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Authentication check failed', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [location]); // Check auth when location changes

  if (loading) {
    return <GlobalLoader></GlobalLoader>;
  }

  return (
    <main style={{ display: 'flex' }}>
      {!(location === '/login' || location === '/signup') && <Sidebar />}
      <div>
        <Switch>
          {/* Public routes */}
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>

          {/* Protected routes */}
          <PrivateRoute
            path="/"
            isAuthenticated={isAuthenticated}
            redirectPath="/login"
          >
            <Home />
          </PrivateRoute>

          <PrivateRoute
            path="/activities"
            isAuthenticated={isAuthenticated}
            redirectPath="/login"
          >
            <Activities />
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
            path="/mybudget"
            isAuthenticated={isAuthenticated}
            redirectPath="/login"
          >
            <MyBudget />
          </PrivateRoute>

          <PrivateRoute
            path="/log-out"
            isAuthenticated={isAuthenticated}
            redirectPath="/login"
          >
            <LogOut />
          </PrivateRoute>

          <PrivateRoute
            path="/settings"
            isAuthenticated={isAuthenticated}
            redirectPath="/login"
          >
            <Settings />
          </PrivateRoute>

          {/* Not found route */}
          <PrivateRoute isAuthenticated={isAuthenticated} redirectPath="/login">
            <div>Not found</div>
          </PrivateRoute>
        </Switch>
      </div>
    </main>
  );
};

export default App;
