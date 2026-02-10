export default function Footer() {
    return (
        <footer className="py-24 px-6 md:px-24 border-t border-white/10 relative z-10">
            <div className="grid md:grid-cols-4 gap-12 text-sm text-white/60">
                <div className="md:col-span-2">
                    <h4 className="text-white font-serif text-xl mb-6">Konstantin Lyutovich</h4>
                    <p className="max-w-xs mb-6">
                        Предприниматель, инвестор и основатель агентства 2088 Real Estate.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-brand-gold transition-colors">Instagram</a>
                        <a href="#" className="hover:text-brand-gold transition-colors">Telegram</a>
                        <a href="#" className="hover:text-brand-gold transition-colors">YouTube</a>
                    </div>
                </div>

                <div>
                    <h5 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">Контакты</h5>
                    <p className="mb-2">The Opus by Omniyat — Tower A, Office 1006</p>
                    <p className="mb-2">Business Bay, Dubai</p>
                    <p className="text-brand-gold">+971 54 549 5353</p>
                </div>

                <div>
                    <h5 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">Меню</h5>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white transition-colors">Услуги</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Партнеры</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Блог</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Новости</a></li>
                    </ul>
                </div>
            </div>

            <div className="mt-24 pt-8 border-t border-white/5 flex justify-between text-xs opacity-40">
                <p>© 2088 Real Estate. All rights reserved.</p>
                <p>Designed by Antigravity</p>
            </div>
        </footer>
    );
}
