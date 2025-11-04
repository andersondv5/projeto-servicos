import { Link } from "react-router-dom";

interface HeaderLinkProps {
  text: string;
  to: string;
  className?: string;
}

function HeaderLink({ text, to, className = "" }: HeaderLinkProps) {
  return (
    <Link
      to={to}
      className={`text-(--main-color) hover:text-gray-700 px-3 py-2 text-base font-medium transition duration-200 ${className}`}
    >
      {text}
    </Link>
  );
}

export default HeaderLink;