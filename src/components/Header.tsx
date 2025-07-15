import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import australianCoatOfArms from "@/assets/australian-coat-of-arms.png";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  return (
    <header className="bg-mygov-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Government branding */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/43066187-6405-4d52-a24f-24378c5d209e.png" 
                alt="Australian Government myGov" 
                className="h-12"
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
              className="text-mygov-light-blue hover:bg-white/10 hover:text-mygov-light-blue font-medium"
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