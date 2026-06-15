type Props = {
  size?: number;
  className?: string;
};

export const AppIcon = ({ size = 32, className = '' }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect x="5" y="15" width="22" height="13" rx="2.5" fill="#D97706" />
      <rect x="4" y="11.5" width="24" height="5.5" rx="1.75" fill="#F59E0B" />
      <path
        d="M16 11.5V28"
        stroke="#FEF3C7"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <path
        d="M4 14.25H28"
        stroke="#FEF3C7"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <path
        d="M11.25 11.5C9.25 11.5 8 10.15 8 8.75C8 7.1 9.55 6 11.25 6.5C12.35 6.85 13.35 8.1 16 11.5C18.65 8.1 19.65 6.85 20.75 6.5C22.45 6 24 7.1 24 8.75C24 10.15 22.75 11.5 20.75 11.5"
        stroke="#FBBF24"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="11.5" r="2.25" fill="#FEF3C7" />
    </svg>
  );
};
