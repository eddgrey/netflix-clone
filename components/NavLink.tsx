import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  text: string;
}

export default function NavLink({ href, text }: Props) {
  const pathname = usePathname();
  return (
    <li
      className={`decoration-primary decoration-2 hover:underline hover:underline-offset-8 ${
        pathname === href ? "font-bold" : ""
      }`}
    >
      <Link href={href}>{text}</Link>
    </li>
  );
}
