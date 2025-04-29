import { Route, Switch, useLocation, Redirect} from "wouter";
import { useEffect, useState } from "react";
import "./App.css";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import { Activities } from "./pages/Activities"; 
import { Advice } from "./pages/Advice";
import { TimePlan } from "./pages/TimePlan";
import { Expenses } from "./pages/Expenses";
import { MyBudget } from "./pages/MyBudget";
import { LogOut } from "./pages/LogOut";
import { Settings } from "./pages/Settings";
import { Sidebar } from "./components/SideBar";

const App = () => {
  const [location] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const checkAuth = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/auth/',{
        method: 'POST',
        credentials: 'include',
      });
      
      if(response.ok) {
        const data = await response.json();
        setIsAuthenticated(data.status === true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error){
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
    return <div>Loading...</div>;
  }
 
  return (
    <main style={{ display: 'flex'}}>
      {!(location === "/login" || location === "/signup") && <Sidebar />}
      <div>
      <Switch>
          {/* Public routes */}
          <Route path="/login">
            {isAuthenticated ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/signup">
            {isAuthenticated ? <Redirect to="/" /> : <SignUp />}
          </Route>
          
          {/* Protected routes */}
          <Route path="/">
            {isAuthenticated ? <Home /> : <Redirect to="/login" />}
          </Route>
          <Route path="/activities">
            {isAuthenticated ? <Activities /> : <Redirect to="/login" />}
          </Route>
          <Route path="/timeplan">
            {isAuthenticated ? <TimePlan /> : <Redirect to="/login" />}
          </Route>
          <Route path="/advice">
            {isAuthenticated ? <Advice /> : <Redirect to="/login" />}
          </Route>
          <Route path="/expenses">
            {isAuthenticated ? <Expenses /> : <Redirect to="/login" />}
          </Route>
          <Route path="/mybudget">
            {isAuthenticated ? <MyBudget /> : <Redirect to="/login" />}
          </Route>
          <Route path="/log-out">
            {isAuthenticated ? <LogOut /> : <Redirect to="/login" />}
          </Route>
          <Route path="/settings">
            {isAuthenticated ? <Settings /> : <Redirect to="/login" />}
          </Route>

          {/* Not found route */}
          <Route>
            {isAuthenticated ? <div>Not found</div> : <Redirect to="/login" />}
          </Route>     
        </Switch> 
      </div>
    </main>
  );
};

export default App;
