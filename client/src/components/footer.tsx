import { Droplet, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { SITE_CONFIG, CONTACT_INFO } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Droplet className="text-primary text-2xl mr-2" />
              <span className="font-bold text-xl">{SITE_CONFIG.name}</span>
            </div>
            <p className="text-gray-400 mb-4">
              {SITE_CONFIG.description}
            </p>
            <div className="flex space-x-4">
              <Facebook className="text-gray-400 hover:text-primary cursor-pointer" size={20} />
              <Twitter className="text-gray-400 hover:text-primary cursor-pointer" size={20} />
              <Instagram className="text-gray-400 hover:text-primary cursor-pointer" size={20} />
              <Linkedin className="text-gray-400 hover:text-primary cursor-pointer" size={20} />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Water Delivery</a></li>
              <li><a href="#" className="hover:text-white">Subscription Plans</a></li>
              <li><a href="#" className="hover:text-white">Bulk Orders</a></li>
              <li><a href="#" className="hover:text-white">Corporate Solutions</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Track Order</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center">
                <span className="mr-2">📞</span>
                {CONTACT_INFO.phone}
              </p>
              <p className="flex items-center">
                <span className="mr-2">✉️</span>
                {CONTACT_INFO.email}
              </p>
              <p className="flex items-center">
                <span className="mr-2">📍</span>
                {CONTACT_INFO.address}
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 {SITE_CONFIG.name}. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
