"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ClubSection() {
    return (
        <section className="relative w-full py-24 px-6 md:px-24 border-t border-brand-charcoal/20 backdrop-blur-md relative z-10">
            <div className="max-w-4xl w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <span className="text-brand-gold text-xs font-bold tracking-widest uppercase mb-2 block">
                        03 / Intellectual Club
                    </span>
                    <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-12">
                        Культура переговоров <br /> и окружение
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 text-left">
                    <div className="p-6 border-l border-brand-gold/30">
                        <h3 className="font-serif text-xl mb-2 text-brand-gold">Чайная дипломатия</h3>
                        <p className="text-sm text-white/60">Chinese tea connecting people. Авторские наборы и коллекционный чай.</p>
                    </div>
                    <div className="p-6 border-l border-brand-gold/30">
                        <h3 className="font-serif text-xl mb-2 text-brand-gold">Диалоги о главном</h3>
                        <p className="text-sm text-white/60">Интервью с выдающимися современниками (Георгий Пинхасов и др).</p>
                    </div>
                    <div className="p-6 border-l border-brand-gold/30">
                        <h3 className="font-serif text-xl mb-2 text-brand-gold">Сообщество</h3>
                        <p className="text-sm text-white/60">Telegram-канал «Дубайский дневник» — смыслы и инсайды.</p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-16"
                >
                    <button className="text-brand-gold font-bold uppercase tracking-wider text-sm hover:underline underline-offset-4 flex items-center gap-2 mx-auto">
                        Перейти в «Дубайский Дневник»
                        <ArrowUpRight className="w-4 h-4" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
