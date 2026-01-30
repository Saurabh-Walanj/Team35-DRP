import { Link } from "react-router-dom";

export const Footer1 = () => {
    return (
        <footer className="bg-[#1A1A2E] text-white py-12 px-8">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-[#DAA520]">About</h3>
                        <p className="text-sm text-gray-300">
                            Digital RationSahayata Portal - Ensuring transparent and efficient food distribution for all citizens.
                        </p>
                    </div>


                    <div>
                        <h3 className="text-lg font-bold mb-4 text-[#DAA520]">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/about" className="hover:text-[#FF6B35] transition-colors">About Us</Link></li>
                            <li><Link to="/how-it-works" className="hover:text-[#FF6B35] transition-colors">How It Works</Link></li>
                            <li><Link to="/contact" className="hover:text-[#FF6B35] transition-colors">Contact</Link></li>
                            <li><Link to="/faq" className="hover:text-[#FF6B35] transition-colors">FAQ</Link></li>
                        </ul>
                    </div>


                    <div>
                        <h3 className="text-lg font-bold mb-4 text-[#DAA520]">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-[#FF6B35] transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-[#FF6B35] transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-[#FF6B35] transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>


                    <div>
                        <h3 className="text-lg font-bold mb-4 text-[#DAA520]">Contact Us</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li> support@rationsahayata.in</li>
                            <li> 1800-2000-1245 (Toll Free)</li>
                            <li>Food & Public Distribution</li>
                        </ul>
                    </div>
                </div>


                <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; 2026 RationShayata Portal. All rights reserved. | @Team 35</p>
                </div>
            </div>
        </footer>
    );
};