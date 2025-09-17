export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        {/* Left Side - Company Name */}
        <p className="text-sm">
          © {new Date().getFullYear()} <span className="text-indigo-400 font-semibold">NebulaConvert</span>. All rights reserved.
        </p>

        {/* Right Side - Links */}
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition"
          >
            Twitter
          </a>
          <a
            href="mailto:support@nebulaconvert.com"
            className="hover:text-indigo-400 transition"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
