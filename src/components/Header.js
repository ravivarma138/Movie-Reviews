import React from 'react'

const Header = (props) => {
    return (
        <section className="header">
            <nav>
                <h2>Welcome</h2>
                <button onClick={props.handleLogOut}>LogOut</button>
            </nav>
        </section>
    )
}

export default Header;
