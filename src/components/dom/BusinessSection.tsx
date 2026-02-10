"use client";

import GlassCard from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

export default function BusinessSection() {
    return (
        <section className="w-full py-24 px-6 md:px-24 relative z-10 flex justify-center">
            <GlassCard intensity="medium" className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center p-12">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-px w-12 bg-brand-gold"></div>
                        <span className="text-brand-gold text-sm tracking-[0.2em] uppercase">02 / Business Setup</span>
                    </div>

                    <h2 className="font-serif text-5xl md:text-6xl text-white mb-8">
                        Бизнес <br />
                        <span className="text-white/50">без границ.</span>
                    </h2>

                    <p className="text-lg text-white/70 font-light leading-relaxed mb-8">
                        Открытие компании в ОАЭ — это шаг к глобальному рынку. Мы берем на себя
                        все бюрократические вопросы, налоговое структурирование и банковское сопровождение.
                    </p>

                    <div className="grid grid-cols-2 gap-8 mb-10">
                        <div>
                            <div className="text-3xl font-serif text-brand-gold mb-2">0%</div>
                            <div className="text-xs uppercase tracking-wider text-white/50">Налогов</div>
                        </div>
                        <div>
                            <div className="text-3xl font-serif text-brand-gold mb-2">100%</div>
                            <div className="text-xs uppercase tracking-wider text-white/50">Владения</div>
                        </div>
                    </div>

                    <button className="bg-brand-gold text-brand-black px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-white transition-colors">
                        Открыть бизнес
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="h-[400px] border border-white/10 flex items-center justify-center bg-white/5 rounded-xl"
                >
                    <div className="text-center">
                        <p className="text-white/20 font-serif italic text-2xl mb-2">UAE</p>
                        <p className="text-brand-gold/50 text-xs uppercase tracking-widest">Global Hub</p>
                    </div>
                </motion.div>

            </GlassCard>
        </section>
    );
}
