import { Link, useLocation } from 'wouter';
import LOGO from '../assets/LOGO.svg';
import {
  FaHome,
  FaMoneyBill,
  FaChartPie,
  FaCog,
  FaSignOutAlt,
  FaBusinessTime,
} from 'react-icons/fa';
import { MdPeople } from 'react-icons/md';

export const Sidebar = () => {
  const [_, navigate] = useLocation();
  const handleLogout = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) {
        console.error('Error logging out');
      } else {
        navigate('/sign-up');
      }
    } catch (err) {
      console.error('Error logging out: ', err);
    }
  };

  return (
    <div
      style={{
        width: '300px',
        height: '100%',
        borderRadius: '0 16px 16px 0',
        display: 'block',
        background: 'linear-gradient(to top, #0d313d, #4ca6c4)',
        marginRight: '16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <div>
          <img
            src={LOGO}
            className="logo"
            style={{ height: '53px', padding: '32px 16px' }}
          />
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <SidebarLink text="Overview" icon={<FaHome />} href="/" />
            <SidebarLink text="Advice" icon={<MdPeople />} href="/advice" />
            <SidebarLink
              text="Expenses"
              icon={<FaMoneyBill />}
              href="/expenses"
            />
            <SidebarLink text="Budget" icon={<FaChartPie />} href="/mybudget" />
            <SidebarLink
              text="Income"
              icon={<FaBusinessTime />}
              href="/timeplan"
            />
          </ul>
        </div>
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <SidebarLink text="Settings" icon={<FaCog />} href="/settings" />
          <SidebarLink
            onClick={() => {
              handleLogout();
            }}
            text="Log out"
            icon={<FaSignOutAlt />}
            href="#"
          />
        </ul>
      </div>
    </div>
  );
};

const SidebarLink = ({ text, icon, href, onClick }) => {
  const [location] = useLocation();
  const isActive = location === href; // tjekker om current location matcher linkets href

  return (
    <li style={{ color: 'white' }}>
      <Link
        href={href}
        onClick={(e) => {
          if (onClick) {
            onClick(e);
          }
        }}
        style={{
          textDecoration: 'none',
          display: 'flex',
          color: isActive ? 'white' : '#C0C2FF',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div
          style={{
            fontSize: '24px',
            display: 'flex',
            color: isActive ? 'white' : '#C0C2FF',
          }}
        >
          {icon}
        </div>
        <p>{text}</p>
      </Link>
    </li>
  );
};
