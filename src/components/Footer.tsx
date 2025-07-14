import { Link } from "react-router-dom";
import australianCoatOfArms from "@/assets/australian-coat-of-arms.png";

const Footer = () => {
  return (
    <footer className="bg-mygov-footer-bg text-white mt-auto">
      {/* Top section with links */}
      <div className="border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap gap-6 text-sm">
            <Link to="/terms" className="hover:underline">Terms of use</Link>
            <Link to="/privacy" className="hover:underline">Privacy and security</Link>
            <Link to="/copyright" className="hover:underline">Copyright</Link>
            <Link to="/accessibility" className="hover:underline">Accessibility</Link>
          </div>
        </div>
      </div>

      {/* Bottom section with branding and acknowledgment */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
          {/* Left side - Government branding */}
          <div className="flex items-center space-x-4">
            <img 
              src={australianCoatOfArms} 
              alt="Australian Government" 
              className="h-10 w-10"
            />
            <div className="flex items-center space-x-2">
              {/* White arrow design */}
              <div className="flex items-center">
                <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent"></div>
                <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
              </div>
              <span className="text-2xl font-normal tracking-wide">myGov</span>
            </div>
          </div>

          {/* Right side - Acknowledgment */}
          <div className="text-sm max-w-2xl">
            <p>
              We acknowledge the Traditional Custodians of the lands we live on. We pay our respects to 
              all Elders, past and present, of all Aboriginal and Torres Strait Islander nations.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;