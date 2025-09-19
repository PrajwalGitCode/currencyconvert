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
            href="https://api.frankfurter.app/currencies/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition"
          >
            https://api.frankfurter.app/currencies
          </a>
        </div>
      </div>
    </footer>
  );
}
