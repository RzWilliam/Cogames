// components/NavLink.js
import Link from "next/link";

const NavLink = ({ href, children }) => {
  return (
    <li>
      <Link href={href} className="text-lg hover:text-gray-400">
        {children}
      </Link>
    </li>
  );
};

export default NavLink;
