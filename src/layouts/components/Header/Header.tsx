import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 right-0">
      <div className="flex justify-between items-center px-4">
        <div className="flex items-center gap-x-4">
          <Link to="/">
            <img src="/logo.png" className="w-16 h-16" />
          </Link>
        </div>
      </div>
    </header>
  );
}
