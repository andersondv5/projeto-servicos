import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../atoms/logo";
import Button from "../../atoms/button";
import HeaderLink from "../../atoms/headerLink";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/">
            <Logo size="lg" />
          </Link>

          {/* Links de navegação - desktop */}
          <nav className="hidden md:flex space-x-8">
            <HeaderLink text="Serviços" to="/services"></HeaderLink>
            <HeaderLink text="Como Funciona" to="/how-it-works"></HeaderLink>
            <HeaderLink
              text="Para Profissionais"
              to="/professional"
            ></HeaderLink>
            <HeaderLink text="Categorias" to="/faq"></HeaderLink>
          </nav>

          {/* Botão Entrar e menu mobile */}
          <div className="flex items-center space-x-4">
            <Button
              variant="primary"
              to="/login"
            >
              Entrar
            </Button>

            {/* Menu hamburger - mobile */}
            <button
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menu mobile dropdown */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <HeaderLink
                text="Serviços"
                to="/services"
                className="block"
              ></HeaderLink>
              <HeaderLink
                text="Como Funciona"
                to="/how-it-works"
                className="block"
              ></HeaderLink>
              <HeaderLink
                text="Para Profissionais"
                to="/professional"
                className="block"
              ></HeaderLink>
              <HeaderLink
                text="Categorias"
                to="/faq"
                className="block"
              ></HeaderLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
