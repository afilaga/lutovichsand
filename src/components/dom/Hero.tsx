"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative w-full flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-24 pt-20 pb-12">
            <motion.div
                className="max-w-5xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Logo */}
                <div className="mb-6 md:mb-8">
                    <Image 
                        src="https://lyukos.com/wp-content/themes/konstantin_lyutovich/assets/img/logo.svg"
                        alt="Lyutovich"
                        width={180}
                        height={60}
                        className="w-32 md:w-44 h-auto"
                        priority
                    />
                </div>

                <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <span className="text-brand-gold/90 tracking-[0.15em] text-xs uppercase font-medium">Основатель 2088 Real Estate</span>
                    <div className="h-px w-8 md:w-12 bg-brand-gold/40"></div>
                </div>

                <h1 className="font-sans text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-brand-black mb-4 md:mb-6 leading-[0.95] font-bold">
                    Константин <br />
                    <span className="text-brand-gold">Лютович</span>
                </h1>

                <p className="text-lg md:text-xl lg:text-2xl text-brand-black/70 font-normal mb-6 md:mb-10 max-w-2xl">
                    Предприниматель · Инвестор · Основатель
                </p>

                <div className="flex flex-wrap gap-6 md:gap-12 mb-8 md:mb-12 border-l-2 border-brand-gold/30 pl-4 md:pl-6">
                    <div>
                        <div className="text-3xl md:text-4xl font-sans text-brand-gold mb-1 font-bold">15+</div>
                        <div className="text-xs tracking-wider text-brand-black/50 uppercase">Лет в ОАЭ</div>
                    </div>
                    <div>
                        <div className="text-3xl md:text-4xl font-sans text-brand-gold mb-1 font-bold">50+</div>
                        <div className="text-xs tracking-wider text-brand-black/50 uppercase">Агентов</div>
                    </div>
                    <div>
                        <div className="text-3xl md:text-4xl font-sans text-brand-gold mb-1 font-bold">20+</div>
                        <div className="text-xs tracking-wider text-brand-black/50 uppercase">Награды застройщиков</div>
                    </div>
                </div>

                <div className="pl-4 md:pl-6 border-l-2 border-brand-gold/60 mb-8 md:mb-12">
                    <p className="text-base md:text-lg text-brand-black/80 font-normal">
                        «Мы не продаём квадратные метры.<br />
                        Мы управляем доходностью.»
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button type="button" className="bg-brand-gold text-white px-6 md:px-8 py-3 md:py-4 text-sm font-bold tracking-widest uppercase hover:bg-brand-gold/90 transition-colors w-full sm:w-auto text-center">
                        Связаться
                    </button>
                    <button type="button" className="border-2 border-brand-black/20 text-brand-black px-6 md:px-8 py-3 md:py-4 text-sm font-bold tracking-widest uppercase hover:bg-brand-black/5 transition-colors w-full sm:w-auto text-center">
                        Об экосистеме
                    </button>
                </div>
            </motion.div>
        </section>
    );
}
