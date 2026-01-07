const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Modern education/scholarship logo (graduation cap + open book, flat style)
  const logoUrl = "https://media.istockphoto.com/id/2161295230/vector/education-logo-template-education-university-logo-with-graduation-hat-and-book.jpg?s=612x612&w=0&k=20&c=Xz38cwbG5VTeMGGs5MYJh2UkLBC5Ug9iECT8N9GqQyw=";

  const quickLinks = [
    { label: 'Home', url: '/' },
    { label: 'All Scholarships', url: '/scholarships' },
    { label: 'About Us', url: '/about' },
    { label: 'Contact', url: '/contact' },
    { label: 'Privacy Policy', url: '/privacy' },
    { label: 'Terms of Service', url: '/terms' },
  ];

  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com', icon: 'https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png' },
    { name: 'Twitter/X', url: 'https://x.com', icon: 'https://img.icons8.com/?size=50&id=phOKFKYpe00C&format=png&color=ffffff' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'https://img.icons8.com/ios-filled/50/ffffff/linkedin.png' },
    { name: 'YouTube', url: 'https://youtube.com', icon: 'https://img.icons8.com/ios-filled/50/ffffff/youtube-play.png' },
  ];

  return (
    <footer className="bg-gradient-to-t from-gray-950 to-gray-900 text-white py-16 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={logoUrl}
                alt="ScholarHub Logo"
                className="h-20 w-auto object-contain"
              />
              <div>
                <h3 className="text-3xl font-extrabold">ScholarHub</h3>
                <p className="text-lime-400 text-sm font-medium">Empowering Futures</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted platform for discovering and applying to scholarships worldwide. 
              Education without limits.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-lime-400">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    className="text-gray-300 hover:text-white transition duration-200 ease-in-out"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-lime-400">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get the latest scholarship alerts and tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-lime-500 transition"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-lime-500 hover:bg-lime-600 rounded-lg font-medium transition shadow-md"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-lime-400">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-lime-600 hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  <img src={social.icon} alt={social.name} className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} ScholarHub Inc. All rights reserved. Made with ❤️ for students worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;