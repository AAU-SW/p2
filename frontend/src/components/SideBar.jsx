import { Link, useLocation } from "wouter";
import LOGO from "../assets/LOGO.svg";
import people from "../assets/people.svg";

export const Sidebar = () => {
  const [_, navigate] = useLocation();
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:4000/auth/logout", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        console.error("Error logging out");
      } else {
        navigate("/sign-up");
      }
    } catch (err) {
      console.error("Error logging out: ", err);
    }
  };

  return (
    <div
      style={{
        width: "300px",
        height: "100%",
        borderRadius: "0 16px 16px 0",
        display: "block",
        background: "linear-gradient(to top, #0d313d, #4ca6c4)",
      }}
    >
      <div
        className="sidebar"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <img
          src={LOGO}
          className="logo"
          style={{ height: "53px", padding: "32px 16px" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            paddingBottom: "32px",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <SidebarLink text="Overview" icon={people} href="/" />
            <SidebarLink text="Advice" icon={people} href="/advice" />
            <SidebarLink text="Activities" icon={people} href="/activities" />
            <SidebarLink text="Expenses" icon={people} href="/expenses" />
            <SidebarLink text="My Budget" icon={people} href="/mybudget" />
          </ul>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <SidebarLink text="Settings" icon={people} href="/settings" />
            <SidebarLink
              text="Log out"
              icon={people}
              onClick={() => handleLogout()}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

const SidebarLink = ({ text, icon, href, onClick }) => {
  return (
    <li style={{ color: "white" }}>
      {href ? (
        <Link
          href={href}
          style={{
            color: "#C0C2FF",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            textDecoration: "none",
          }}
        >
          <img src={icon} />
          <p>{text}</p>
        </Link>
      ) : (
        <button
          onClick={() => onClick()}
          style={{
            color: "#C0C2FF",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
            margin: 0,
          }}
        >
          <img src={icon} />
          <p style={{ fontSize: "16px" }}>{text}</p>
        </button>
      )}
    </li>
  );
};
