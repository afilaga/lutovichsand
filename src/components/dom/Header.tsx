import Link from "next/link";
import { Menu } from "lucide-react";

export default function Header() {
    const links = [
        { name: "Услуги", href: "#services" },
        { name: "Партнеры", href: "#partners" },
        { name: "Блог", href: "/blog" },
        { name: "Новости", href: "/news" },
        { name: "Контакты", href: "/contacts" },
        { name: "Блог о чае", href: "/tea", special: true },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference text-brand-white">
            {/* Brand / Logo */}
            <div className="font-serif text-xl tracking-widest font-bold">
                <Link href="/">LYUTOVICH</Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-8 text-sm uppercase tracking-wide font-medium">
                {links.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`hover:text-brand-gold transition-colors ${link.special ? "text-brand-gold" : ""
                            }`}
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
                <span className="text-xs font-bold cursor-pointer hover:text-brand-gold">
                    RU / EN
                </span>
                <button className="md:hidden">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </header>
    );
}
