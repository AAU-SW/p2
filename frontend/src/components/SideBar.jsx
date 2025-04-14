import { Link } from "wouter";
import LOGO from "../assets/LOGO.svg";
import {
  FaHome,
  FaMoneyBill,
  FaChartPie,
  FaCog,
  FaSignOutAlt,
  FaChartLine,
} from "react-icons/fa";
import { MdPeople } from "react-icons/md";

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
            <SidebarLink text="Overview" icon={<FaHome />} href="/" />
            <SidebarLink text="Advice" icon={<MdPeople />} href="/advice" />
            <SidebarLink
              text="Activities"
              icon={<FaChartLine />}
              href="/activities"
            />
            <SidebarLink
              text="Expenses"
              icon={<FaMoneyBill />}
              href="/expenses"
            />
            <SidebarLink
              text="My Budget"
              icon={<FaChartPie />}
              href="/mybudget"
            />
          </ul>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <SidebarLink text="Settings" icon={<FaCog />} href="/settings" />
            <SidebarLink
              text="Log out"
              icon={<FaSignOutAlt />}
              href="/Log-out"
            />
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
        <div style={{ fontSize: "24px", display: "flex" }}>{icon}</div>
        <p>{text}</p>
      </Link>
    </li>
  );
};
