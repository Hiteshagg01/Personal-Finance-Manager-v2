import '../styles/componentsStyles/footer.css'

import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer id="footer">
        <p>&copy; 2024 PFM. All rights reserved.</p>
        <nav>
            <Link to='#'>Terms of Service</Link>
            <Link to='#'>Privacy</Link>
        </nav>
    </footer>
  )
}

export default Footer