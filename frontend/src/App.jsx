import { Route, Switch, useLocation} from "wouter";
import { useEffect } from "react";
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
import axios from "axios";

export const user = {
  userName: "Kevin",
  age: "18",
  email: "kevin@gmail.com",
  phone: "+4512345678",
}

const App = () => {
  const [location] = useLocation();

  // Følgende funktion skal slettes når Login page er sat op, men er her for nu for at teste funktioner med egen bruger:
 
useEffect(() => {
    const login = async () => {
      try {
        const response = await axios.post("http://localhost:4000/auth/Login",
          {
            email: "mathavs0810@gmail.com",
            password: "Test123",
          }, {
            withCredentials: true,
          });
        console.log("Login Succesful:", response.data);
      } catch (error) {
        console.error("Error during login", error.response);
      }
    }
    login();
  }, []); 
 
  return (
    <main style={{ display: 'flex'}}>
      {!(location === "/login" || location === "/signup") && <Sidebar />}
      <div>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/login"> 
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/activities">
            <Activities></Activities>
          </Route>
          <Route path="/Timeplan">
            <TimePlan></TimePlan>
          </Route>
          <Route path="/advice">
            <Advice></Advice>
          </Route>
          <Route path="/expenses">
            <Expenses></Expenses>
          </Route>
          <Route path="/mybudget">
            <MyBudget />
          </Route>
          <Route path="/log-out">
            <LogOut></LogOut>
          </Route>
          <Route path="/settings">
            <Settings></Settings>
          </Route>

          <Route>Not Found</Route>
        </Switch>
      </div>
    </main>
  );
};

export default App;
