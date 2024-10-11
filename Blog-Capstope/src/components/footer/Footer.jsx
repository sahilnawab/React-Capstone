import { NavLink } from "react-router-dom";


function Footer() {
  return (
    <footer className="bg-slate-50 text-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Column */}
          <div>
            <h2 className="text-xl font-bold mb-4">Contact Me</h2>
            <p className="text-sm">Phone: (123) 456-7890</p>
            <p className="text-sm">Email: example@example.com</p>
          </div>
          {/* Social Sites Column */}
          <div>
            <h2 className="text-xl font-bold mb-4">Social Sites</h2>
            <ul>
              <li className="mb-2">
                <NavLink to="/github" className="text-gray-600 hover:text-gray-900">
                  <i className="fab fa-github"></i> GitHub
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/linkedin" className="text-gray-600 hover:text-gray-900">
                  <i className="fab fa-linkedin"></i> LinkedIn
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/instagram" className="text-gray-600 hover:text-gray-900">
                  <i className="fab fa-instagram"></i> Instagram
                </NavLink>
              </li>
            </ul>
          </div>
          {/* Navigation Column */}
          <div>
            <h2 className="text-xl font-bold mb-4">Navigation</h2>
            <ul>
              <li className="mb-2">
                <NavLink to="/" className={({isActive})=>isActive? "text-purple-600":"text-green-800"}
                
                >
                  Home
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/contact" className={({isActive})=>isActive? "text-purple-600":"text-green-800"}>
                  Contact
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/about" className={({isActive})=>isActive? "text-purple-600":"text-green-800"}>
                  About
                </NavLink>
              </li>
             
            </ul>
          </div>
        </div>
        <div className="text-center text-sm text-gray-600 mt-8">
          <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
        </div>
      </div>  
    </footer>
  );
}

export default Footer