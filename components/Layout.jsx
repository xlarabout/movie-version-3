'use client';
import React from 'react'
import Link from 'next/link'

const menus = [
    {
        label: 'Home',
        href: '/'
    },

    {
        label: 'Movie',
        href: '/movies'
    },

    {
        label: 'Webseries',
        href: '/webseries'
    },

    {
        label: 'ContuctUs',
        href: '/contuctus'
    },
    
]


const Layout = () => {
    return (
        <div>
            <nav>
                <div className="nav-container">
                    
                    <div className="nav-logo">Movie4U</div>
                    
                    <input type="checkbox" id="menu-toggle" className="menu-toggle" />
                    <label htmlFor="menu-toggle" className="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                    <div className="nav-links">
                        {
                            menus.map((item, index) => (
                                <Link href={item.href} key={index} >{item.label}</Link>
                            ))
                        }
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Layout
