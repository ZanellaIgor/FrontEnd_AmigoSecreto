import Link from 'next/link';
import { IconType } from 'react-icons';

type Props = {
  IconElement: IconType;
  onClick?: () => void;
  label?: string;
  href?: string;
  target?: string;
  replace?: boolean;
};

export const ItemButton = ({
  IconElement,
  onClick,
  label,
  href,
  target,
  replace,
}: Props) => {
  const content = (
    <>
      <IconElement aria-hidden />
      {label && <span>{label}</span>}
    </>
  );

  const className =
    'flex flex-col items-center justify-center gap-1 rounded p-3 text-sm transition-colors hover:bg-gray-800 md:flex-row md:gap-2';

  if (href && !onClick) {
    return (
      <Link
        href={href}
        target={target}
        replace={replace}
        className={className}
        aria-label={label}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} cursor-pointer`}
      aria-label={label}
    >
      {content}
    </button>
  );
};
