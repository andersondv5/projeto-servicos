import Logo from "../../atoms/logo";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import FooterLink from "../../atoms/footerLink";
import SocialIconFooter from "../../atoms/socialIconFooter";

export default function Footer() {
  return (
    <footer className="bg-(--main-color) text-(--text-color) px-10 pt-16 pb-10 flex flex-col items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 text-center lg:text-left">
        <div>
          <h3 className="font-semibold text-lg mb-3">Navegação Rápida</h3>
          <ul className="space-y-2">
            <li>
              <FooterLink text="Serviços" />
            </li>
            <li>
              <FooterLink text="Profissionais" />
            </li>
            <li>
              <FooterLink text="Minha Conta" />
            </li>
            <li>
              <FooterLink text="Agendar Serviços" />
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-3">Sobre a Plataforma</h3>
          <ul className="space-y-2">
            <li>
              <FooterLink text="Quem Somos" />
            </li>
            <li>
              <FooterLink text="Como Funciona" />
            </li>
            <li>
              <FooterLink text="Nossa Equipe" />
            </li>
            <li>
              <FooterLink text="Fale Conosco" />
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-3">Políticas e Termos</h3>
          <ul className="space-y-2">
            <li>
              <FooterLink text="Termos de Uso" />
            </li>
            <li>
              <FooterLink text="Política de Privacidade" />
            </li>
            <li>
              <FooterLink text="Política de Cancelamento" />
            </li>
            <li>
              <FooterLink text="Segurança e Garantias" />
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-3">Redes Sociais</h3>
          <div className="flex space-x-6 text-2xl mb-10">
            <SocialIconFooter icon={<FaFacebookF />} ariaLabel="Facebook" />
            <SocialIconFooter icon={<FaInstagram />} ariaLabel="Instagram" />
            <SocialIconFooter icon={<FaTwitter />} ariaLabel="Twitter" />
            <SocialIconFooter icon={<FaLinkedinIn />} ariaLabel="LinkedIn" />
          </div>
        </div>
      </div>

      <div className="mb-10">
        <Logo variant="white" size="lg" />
      </div>

      <div className="border-t border-white pt-10 w-full text-center">
        © {new Date().getFullYear()} Profissa. Todos os direitos reservados.
      </div>
    </footer>
  );
}
