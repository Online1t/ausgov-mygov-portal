
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import australianCoatOfArms from "@/assets/australian-coat-of-arms.png";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  return (
    <header className="bg-[#0055A4] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left side - Government branding */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/5acabbd1-aa0f-4300-928d-1ddc9d9a9999.png" 
                alt="Australian Government myGov" 
                className="h-24 w-auto font-bold"
              />
            </Link>
          </div>

          {/* Right side - Navigation and Help */}
          <div className="flex items-center space-x-6">
            {isHomePage && (
              <nav className="hidden md:flex items-center space-x-6">
                <Link to="/home" className="text-white hover:underline">Home</Link>
                <Link to="/browse" className="text-white hover:underline">Browse</Link>
                <Link to="/search" className="text-white hover:underline">Search</Link>
                <Link to="/my-account" className="text-white hover:underline">My account</Link>
              </nav>
            )}
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 hover:text-white font-medium underline"
            >
              Help
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
