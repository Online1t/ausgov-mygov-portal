import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import australianCoatOfArms from "@/assets/australian-coat-of-arms.png";

const Header = () => {
  return (
    <header className="bg-mygov-teal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Government branding */}
          <div className="flex items-center space-x-4">
            {/* Australian Government logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src={australianCoatOfArms} 
                alt="Australian Government" 
                className="h-10 w-10"
              />
              <div className="flex flex-col text-sm leading-tight">
                <span className="font-medium">Australian Government</span>
              </div>
            </Link>
            
            {/* myGov logo */}
            <div className="flex items-center space-x-2 ml-6">
              {/* White arrow design */}
              <div className="flex items-center">
                <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent"></div>
                <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
              </div>
              <span className="text-2xl font-normal tracking-wide">myGov</span>
            </div>
          </div>

          {/* Right side - Help link */}
          <div className="flex items-center">
            <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
              Help
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;