"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

export default function Hero() {
    return (
        <section className="relative w-full flex flex-col justify-center px-6 md:px-24 pt-20">
            <motion.div
                className="max-w-4xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
                <GlassCard intensity="low" className="p-8 md:p-12 -ml-8 md:-ml-12 rounded-3xl">
                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-brand-gold/80 tracking-[0.2em] text-xs uppercase font-medium">Основатель 2088 Real Estate</span>
                        <div className="h-px w-12 bg-brand-gold/30"></div>
                    </div>

                    <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white mb-6 leading-[0.9]">
                        Константин <br />
                        <span className="text-brand-gold italic">Лютович</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/60 font-light mb-12 max-w-2xl">
                        Предприниматель · Инвестор · Основатель
                    </p>

                    <div className="flex gap-12 mb-16 border-l border-white/10 pl-6">
                        <div>
                            <div className="text-4xl font-serif text-brand-gold mb-1">15+</div>
                            <div className="text-xs tracking-wider text-white/40 uppercase">Лет в ОАЭ</div>
                        </div>
                        <div>
                            <div className="text-4xl font-serif text-brand-gold mb-1">50+</div>
                            <div className="text-xs tracking-wider text-white/40 uppercase">Агентов</div>
                        </div>
                    </div>

                    <div className="pl-6 border-l-2 border-brand-gold/50">
                        <p className="text-lg text-white/80 italic font-light italic">
                            «Мы не продаём квадратные метры.<br />
                            Мы управляем доходностью.»
                        </p>
                    </div>
                </GlassCard>

                <div className="flex gap-6 mt-12 pl-4">
                    <button className="bg-brand-gold text-brand-black px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-white transition-colors">
                        Связаться
                    </button>
                    <button className="border border-white/20 text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-white/10 transition-colors">
                        Об экосистеме
                    </button>
                </div>
            </motion.div>
        </section>
    );
}
