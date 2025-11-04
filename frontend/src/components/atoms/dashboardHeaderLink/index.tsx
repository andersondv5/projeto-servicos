import { Link } from "react-router-dom";

interface HeaderLinkProps {
  text: string;
  to: string;
  className?: string;
}

function DashboardHeaderLink({ text, to, className = "" }: HeaderLinkProps) {
  return (
    <Link
      to={to}
      className={`group flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:hover:bg-(--third-color) hover:tex-(--main-color) active:bg-(--buttons-color) ${className}`}
    >
      {text}
    </Link>
  );
}

export default DashboardHeaderLink;