"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const links = [
        { name: "Услуги", href: "#services" },
        { name: "Партнеры", href: "#partners" },
        { name: "Блог", href: "/blog" },
        { name: "Новости", href: "/news" },
        { name: "Контакты", href: "/contacts" },
        { name: "Блог о чае", href: "/tea", special: true },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 p-4 md:p-6 flex justify-between items-center mix-blend-difference text-brand-white">
                {/* Brand / Logo */}
                <div className="font-sans text-lg md:text-xl tracking-widest font-bold">
                    <Link href="/">LYUTOVICH</Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-6 lg:gap-8 text-sm uppercase tracking-wide font-medium">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`hover:text-brand-gold transition-colors ${link.special ? "text-brand-gold" : ""}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <span className="text-xs font-bold cursor-pointer hover:text-brand-gold hidden sm:block">
                        RU / EN
                    </span>
                    <button 
                        type="button"
                        className="md:hidden p-2"
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-brand-dark/95 backdrop-blur-lg md:hidden">
                    <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={closeMenu}
                                className={`text-2xl font-medium uppercase tracking-wide hover:text-brand-gold transition-colors ${link.special ? "text-brand-gold" : "text-white"}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="mt-8 pt-8 border-t border-white/20 w-48 text-center">
                            <span className="text-sm font-bold text-white/70 cursor-pointer hover:text-brand-gold">
                                RU / EN
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
