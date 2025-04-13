import { Recycle } from "lucide-react";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Recycle className="text-primary-400 h-6 w-6 mr-2" />
              <span className="font-heading font-bold text-xl text-white">BatteryCircle</span>
            </div>
            <p className="text-gray-300 mb-4">
              Revolutionizing lithium-ion battery recycling through innovative technology and sustainability.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/sell" className="text-base text-gray-300 hover:text-white">
                  Sell Your Battery
                </Link>
              </li>
              <li>
                <Link href="/business" className="text-base text-gray-300 hover:text-white">
                  Business Solutions
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-base text-gray-300 hover:text-white">
                  Battery Marketplace
                </Link>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Battery Assessment
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Recycling Services
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/subsidies" className="text-base text-gray-300 hover:text-white">
                  Government Subsidies
                </Link>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Battery Education
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Sustainability Reports
                </a>
              </li>
              <li>
                <Link href="/contribute" className="text-base text-gray-300 hover:text-white">
                  Partner With Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Research Publications
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-base text-gray-400 md:text-center">
            &copy; {new Date().getFullYear()} BatteryCircle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
