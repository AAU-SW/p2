import { Link } from "wouter";
import LOGO from "../assets/LOGO.svg";
import people from "../assets/people.svg";

export const Sidebar = () => {
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
            <SidebarLink text="Log out" icon={people} href="/Log-out" />
          </ul>
        </div>
      </div>
    </div>
  );
};

const SidebarLink = ({ text, icon, href }) => {
  return (
    <li style={{ color: "white" }}>
      <Link
        href={href}
        style={{
          color: "#C0C2FF",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <img src={icon} />
        <p>{text}</p>
      </Link>
    </li>
  );
};
