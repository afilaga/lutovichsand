"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

export default function RealEstateSection() {
    return (
        <section className="min-h-screen flex items-center justify-center p-6 relative z-10 w-full">
            <GlassCard intensity="high" className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center p-8 md:p-12">
                <motion.div
                    className="relative aspect-[4/5] overflow-hidden"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Placeholder for image or just text */}
                    <div className="absolute inset-0 bg-brand-charcoal/20"></div>
                    {/* img tag self-closing or paired? self-closing is void element. */}
                    <img
                        src="/images/real-estate-placeholder.jpg"
                        alt="Real Estate"
                        className="object-cover w-full h-full opacity-80 hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-white/20 text-9xl font-serif">2088</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-px w-12 bg-brand-gold"></div>
                        <span className="text-brand-gold text-sm tracking-[0.2em] uppercase">01 / 2088 Real Estate</span>
                    </div>

                    <h2 className="font-serif text-5xl md:text-6xl text-brand-white mb-8 leading-tight">
                        Мы не продаем <br />
                        <span className="text-brand-white/50">квадратные метры.</span>
                    </h2>

                    <p className="text-lg text-brand-white/70 font-light leading-relaxed mb-8">
                        Мы управляем доходностью. В мире, где каждый метр имеет цену, мы находим те,
                        которые имеют ценность. Наш подход основан на глубокой аналитике и понимании
                        рынка ОАЭ.
                    </p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-12"
                    >
                        <button className="flex items-center gap-2 text-brand-gold font-bold uppercase tracking-wider text-sm hover:gap-4 transition-all">
                            Получить инвестиционный разбор
                            <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                </motion.div>
            </GlassCard>
        </section>
    );
}
