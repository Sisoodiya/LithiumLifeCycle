import { Link } from "wouter";
import { Battery, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center">
              <Battery className="text-primary-400 h-6 w-6 mr-2" />
              <span className="font-bold text-xl text-white">EcoBatt</span>
            </div>
            <p className="mt-4 text-gray-400">
              Leading the way in sustainable lithium-ion battery recycling and reuse solutions.
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">Services</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/sell-battery">
                  <a className="text-gray-400 hover:text-white">Sell Your Battery</a>
                </Link>
              </li>
              <li>
                <Link href="/business">
                  <a className="text-gray-400 hover:text-white">Business Solutions</a>
                </Link>
              </li>
              <li>
                <Link href="/marketplace">
                  <a className="text-gray-400 hover:text-white">Marketplace</a>
                </Link>
              </li>
              <li>
                <Link href="/contribute">
                  <a className="text-gray-400 hover:text-white">Partnerships</a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Battery Guides</a>
              </li>
              <li>
                <Link href="/subsidies">
                  <a className="text-gray-400 hover:text-white">Government Programs</a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Sustainability Report</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Careers</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Contact</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Press Kit</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} EcoBatt. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
