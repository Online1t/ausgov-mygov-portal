import { Link } from "react-router-dom";
import australianCoatOfArms from "@/assets/australian-coat-of-arms.png";

const Footer = () => {
  return (
    <footer className="bg-mygov-footer-dark text-white mt-auto">
      {/* Top section with links */}
      <div className="border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <Link to="/terms-of-use" className="hover:underline">Terms of use</Link>
            <Link to="/privacy-and-security" className="hover:underline">Privacy and security</Link>
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
              className="h-12 w-12"
            />
            <div className="flex items-center space-x-3">
              {/* Double white arrow design */}
              <div className="flex items-center">
                <div className="w-0 h-0 border-l-[14px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent"></div>
                <div className="w-0 h-0 border-l-[14px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
              </div>
              <span className="text-3xl font-normal tracking-wide text-white">myGov</span>
            </div>
          </div>

          {/* Right side - Acknowledgment */}
          <div className="text-sm max-w-2xl text-center lg:text-right">
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