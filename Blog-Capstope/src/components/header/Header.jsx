import { NavLink} from "react-router-dom";
import { useSelector } from "react-redux";
import {Container, Logo, LogoutBtn} from '../index'

function Header() {
    // useNavigate hook is used to navigate to different routes
    // const navigate = useNavigate();

  //auth status from the store is accessed using the useSelector hook
  const authStatus = useSelector((state) => {
    return state.auth.status;

  });
  console.log("authStatus is ",authStatus);
  
  //navitems is used to store the navigation links as an array of objects
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "About",
      slug: "/about",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
    {
      name: "Allposts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <>
      <header className="sticky z-50 top-0 w-full bg-offwhite shadow-md p-4 ">
     
     {/* Container component is used to wrap the header content */}
      <Container>
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-purple-600 font-bold ">
            <Logo />
          </div>
          <div className="text-gray-800 font-bold ml-4">
          <nav>
            <ul className="flex space-x-4">
              {navItems.map((item) =>
                item.active ? (
                    <li key={item.name}>

                    {/* <button
                    onClick={() => navigate(item.slug)}
                        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                    >{item.name}</button> */}
                     {/* Button component is used to render the navigation links */}
                    
                    {/* <Button bgColor="transperent" textColor="bg-slate-400" 
                    onClick={() => navigate(item.slug)} 
                    >{item.name}</Button> */}

                      <NavLink to={item.slug} 
                      className={({ isActive }) => isActive ? "text-purple-600" : "text-gray-800"}
                      >{item.name}</NavLink>

                  </li>
                ) : null
              )}
             {authStatus && (
              <li>
                <LogoutBtn />
              </li>
             )} 
            </ul>
          </nav>
          </div>
        </div>
        </Container>
      </header>
    </>
  );
}

export default Header;
