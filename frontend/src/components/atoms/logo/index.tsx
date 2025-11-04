import logoNormal from "../../../assets/images/logo.svg";
import logoWhite from "../../../assets/images/logo-white.svg";

interface LogoProps {
  variant?: "normal" | "white";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Logo({
  variant = "normal",
  className = "",
  size = "md",
}: LogoProps) {
  const logo = variant === "white" ? logoWhite : logoNormal;

  const sizeClasses = {
    sm: "w-24 h-8",
    md: "w-32 h-10",
    lg: "w-40 h-12",
    xl: "w-48 h-14",
  };

  return (
    <div className={`inline-block ${sizeClasses[size]} ${className}`}>
      <img src={logo} alt="Logo Profissa" className="w-full h-full object-contain" />
    </div>
  );
}
