interface BadgeProps {
  name: string;
  className?: string;
}

function Badge({ name, className = "" }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 
        border 
        rounded-lg 
        text-sm font-medium
        bg-transparent
        border-gray-300
        text-gray-700
        ${className}
      `}
    >
      {name}
    </span>
  );
}

export default Badge;
