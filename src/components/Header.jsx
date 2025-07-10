function Header() {
  return (
    <header className="bg-radial-gradient shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-xl font-bold text-gray-100">StarSky</h1>


        <nav className="space-x-6">
          <a href="#" className="text-gray-300 hover:text-zinc-400 font-medium">Home</a>
          <a href="#" className="text-gray-300 hover:text-zinc-400 font-medium">About</a>
          <a href="#" className="text-gray-300 hover:text-zinc-400 font-medium">Docs</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
