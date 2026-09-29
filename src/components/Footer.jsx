function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
  <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
    
    {/* Application Name */}
    <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white text-4xl">
      <span>MovieApp</span>
    </div>

    {/* Copyright Information */}
    <p>© 2026 MovieApp. All rights reserved.</p>

    {/* Optional Social / GitHub Links */}
    <div className="flex items-center gap-4 text-xs font-medium">
      <a 
        href="https://github.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        GitHub
      </a>
      <a 
        href="https://twitter.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        Twitter
      </a>
      <a 
        href="https://tvmaze.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        API Source
      </a>
    </div>

  </div>
</footer>
  );
}

export default Footer;
