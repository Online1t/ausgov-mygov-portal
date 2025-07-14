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
            {/* Australian Government logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src={australianCoatOfArms} 
                alt="Australian Government" 
                className="h-12 w-12"
              />
              <div className="flex flex-col text-sm leading-tight">
                <span className="font-medium text-white">Australian Government</span>
              </div>
            </Link>
            
            {/* myGov logo with exact styling */}
            <div className="flex items-center space-x-3 ml-8">
              {/* Double white arrow design - exactly as in image */}
              <div className="flex items-center">
                <div className="w-0 h-0 border-l-[14px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent"></div>
                <div className="w-0 h-0 border-l-[14px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
              </div>
              <span className="text-3xl font-normal tracking-wide text-white">myGov</span>
            </div>
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