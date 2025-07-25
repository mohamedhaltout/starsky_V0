import StarskyIcon from '../../public/StarskyIcon.png';

function Header({ isLoggedIn, onLoginClick, onRegisterClick, onLogout, onViewSavedWebsites }) {
  return (
    <header className="bg-radial-gradient shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        <div className="flex items-center">
          <img src={StarskyIcon} alt="StarSky Logo" className="h-8 w-8 mr-2" />
          <h1 className="text-xl font-bold text-gray-100">StarSky</h1>
        </div>


        <nav className="space-x-6">
          <a href="#" className="text-gray-300 hover:text-zinc-400 font-medium">Home</a>
          <a href="#" className="text-gray-300 hover:text-zinc-400 font-medium">About</a>
          <a href="#" className="text-gray-300 hover:text-zinc-400 font-medium">Docs</a>
          {isLoggedIn ? (
            <>
              <button onClick={onViewSavedWebsites} className="text-gray-300 hover:text-zinc-400 font-medium">Saved Websites</button>
              <button onClick={onLogout} className="text-gray-300 hover:text-zinc-400 font-medium">Logout</button>
            </>
          ) : (
            <>
              <button onClick={onLoginClick} className="text-gray-300 hover:text-zinc-400 font-medium">Login</button>
              <button onClick={onRegisterClick} className="text-gray-300 hover:text-zinc-400 font-medium">Register</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
