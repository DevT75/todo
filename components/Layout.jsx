import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { user, handleLogout } = useAuth();
  return (
    <div className="min-h-screen w-full bg-custom-gradient filter-custom-filter overflow-x-hidden flex flex-col justify-center items-center">
      <div className="z-10 w-full h-8 top-0 absolute flex flex-row justify-between items-center p-8 bg-white/30 backdrop-blur-lg shadow-md">
        <div className="ml-10 p-2.5 w-60 items-center justify-center flex text-white text-4xl">Todo App</div>
        <div className="right-0 text-text-black font-semibold hover:text-black bg-white rounded p-2 hover:cursor-pointer" onClick={handleLogout}>Logout</div>
      </div>
      {children}
    </div>
  );
};

export default Layout;