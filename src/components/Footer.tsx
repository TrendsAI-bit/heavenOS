export default function Footer() {
  return (
    <footer className="border-t-2 border-black bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="text-center mb-8">
          <div className="font-pixel text-sm mb-4">
            Heaven OS
          </div>
          <p className="font-mono text-xs text-gray-600 mb-6 max-w-md mx-auto">
            Boot to clouds. Work in pixels. Experience computing the way it was meant to be.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-8 mb-8">
          <a
            href="https://twitter.com/heavenos"
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-button text-xs px-4 py-2 hover:bg-halo-gold transition-colors"
            aria-label="Follow Heaven OS on Twitter"
          >
            Twitter
          </a>
          <a
            href="https://github.com/heavenos/heavenos"
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-button text-xs px-4 py-2 hover:bg-halo-gold transition-colors"
            aria-label="View Heaven OS source code on GitHub"
          >
            GitHub
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="font-mono text-xs text-gray-500">
              © 2024 Heaven OS. Made with pixels and love.
            </div>
            
            <div className="flex space-x-6">
              <a
                href="/privacy"
                className="font-mono text-xs text-gray-500 hover:text-halo-gold transition-colors"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="font-mono text-xs text-gray-500 hover:text-halo-gold transition-colors"
              >
                Terms
              </a>
              <a
                href="/docs"
                className="font-mono text-xs text-gray-500 hover:text-halo-gold transition-colors"
              >
                Docs
              </a>
            </div>
          </div>
        </div>

        {/* Version Info */}
        <div className="text-center mt-6">
          <div className="font-mono text-xs text-gray-400">
            v1.0.0 • Built with Next.js & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
}
