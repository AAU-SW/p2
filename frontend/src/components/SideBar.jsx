import { useState } from "react";
import { Link } from "wouter";
import '../styles/SideBar.css';
import LOGO from '../assets/LOGO.svg';
import people from '../assets/people.svg';

export const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false); 

    return (
    <div>
        <div className="SideBar">
        <img src={LOGO} className="SideBarImg"/>
            <ul> 
                <li className="liSideBar"> 
                    <img src={people}/> 
                    <Link href="/" className="liSidebarA">Overview</Link>
                </li>
                <li className="liSideBar"> 
                    <img src={people}/> 
                    <Link href="/advice" className="liSidebarA">Advice</Link>
                </li>
                <li className="liSideBar"> 
                    <img src={people}/> 
                    <Link href="/activities" className="liSidebarA">Activities</Link>
                </li>
                <li className="liSideBar"> 
                    <img src={people}/> 
                    <Link href="/expenses" className="liSidebarA">Expenses</Link>
                </li>
            </ul>
        </div>
        <div className="bottom-menu"> 
            <ul>
                <li className="bottom-menu-li"> 
                    <img src={people}/> 
                    <Link href="/settings" className="liSidebarA">Settings</Link>
                </li>
                <li className="bottom-menu-li">
                    <img src={people}/> 
                    <Link href="/Log-out" className="liSidebarA">Log out</Link>
                </li>
            </ul>
        </div>
    </div>
    );
}