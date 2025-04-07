import { Route, Switch } from "wouter";
import "./App.css";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import { Activities } from "./pages/Activities";
import { Advice } from "./pages/Advice";
import { Expenses } from "./pages/Expenses";
import { LogOut } from "./pages/LogOut";
import { Settings } from "./pages/Settings";
import { Sidebar } from "./components/Sidebar";

export const user = {
  userName: "Kevin",
  age: "18",
  email: "kevin@gmail.com",
  phone: "+4512345678",
}

const App = () => {
  return (
    <main style={{ display: 'flex'}}>
      <Sidebar />
      <div>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/activities">
            <Activities></Activities>
          </Route>
          <Route path="/advice">
            <Advice></Advice>
          </Route>
          <Route path="/expenses">
            <Expenses></Expenses>
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
