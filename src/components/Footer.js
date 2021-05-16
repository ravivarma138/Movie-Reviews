import React from 'react'

function Footer() {

    const date = new Date().getFullYear();

    const fontChange = {
        fontFamily: "Nunito"
    }
    return (
        <div>
            <footer className="footer">
  <label style={fontChange}>Copyright &copy; {date}, Rohit Peela</label>
</footer>
        </div>
    )
}

export default Footer
