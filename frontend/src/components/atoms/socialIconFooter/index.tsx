import type { ReactNode } from 'react';

interface SocialIconFooterProps {
  icon: ReactNode;
  href?: string;
  ariaLabel?: string;
  className?: string;
}

export default function SocialIconFooter({ 
  icon,
  href = "#", 
  ariaLabel = "Social media",
  className = ""
}: SocialIconFooterProps) {
  return (
    <a 
      href={href} 
      aria-label={ariaLabel}
      className={`hover:text-(--link-hover-color) transition duration-300 ${className}`}
    >
      {icon}
    </a>
  );
}