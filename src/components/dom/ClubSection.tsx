"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ClubSection() {
    return (
        <section className="relative w-full py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24 border-t border-brand-charcoal/20 backdrop-blur-md relative z-10">
            <div className="max-w-4xl w-full mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <span className="text-brand-gold text-xs font-bold tracking-widest uppercase mb-2 block">
                        03 / Intellectual Club
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-6 md:mb-12">
                        Культура переговоров <br /> и окружение
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-4 md:gap-8 text-left mb-8 md:mb-12">
                    <div className="p-4 md:p-6 border-l border-brand-gold/30">
                        <h3 className="font-serif text-lg md:text-xl mb-2 text-brand-gold">Чайная дипломатия</h3>
                        <p className="text-sm text-white/60 leading-relaxed">
                            Раздел о чае представляет собой систематизированное пространство с материалами о природе чая как культурного, гастрономического и технологического феномена.
                        </p>
                    </div>
                    <div className="p-4 md:p-6 border-l border-brand-gold/30">
                        <h3 className="font-serif text-lg md:text-xl mb-2 text-brand-gold">Диалоги о главном</h3>
                        <p className="text-sm text-white/60">Интервью с выдающимися современниками (Георгий Пинхасов и др).</p>
                    </div>
                    <div className="p-4 md:p-6 border-l border-brand-gold/30">
                        <h3 className="font-serif text-lg md:text-xl mb-2 text-brand-gold">Сообщество</h3>
                        <p className="text-sm text-white/60">Telegram-канал «Дубайский дневник» — смыслы и инсайды.</p>
                    </div>
                </div>

                {/* Extended Tea Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-brand-charcoal/30 rounded-xl p-5 md:p-8 text-left mb-8 md:mb-12"
                >
                    <h3 className="font-serif text-xl md:text-2xl text-brand-gold mb-3 md:mb-4">О разделе «Чай»</h3>
                    <p className="text-sm md:text-base text-white/70 font-light leading-relaxed mb-3 md:mb-4">
                        Раздел о чае на сайте представляет собой систематизированное пространство, в котором собраны материалы, объясняющие природу чая как культурного, гастрономического и технологического феномена. Он создан для того, чтобы читатель мог ориентироваться в сложном и многослойном мире чайных традиций, сортов и методов обработки, опираясь не на рекламные формулы, а на фактические знания и структурированный подход.
                    </p>
                    <p className="text-sm md:text-base text-white/70 font-light leading-relaxed mb-3 md:mb-4">
                        В отличие от развлекательных блогов, эта категория работает как образовательная платформа, которая постепенно углубляет понимание темы. Материалы категории служат отправной точкой для тех, кто ищет последовательное изложение чайной темы.
                    </p>
                    <div className="grid sm:grid-cols-3 gap-3 md:gap-4 mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/10">
                        <div className="text-center sm:text-left">
                            <span className="text-brand-gold text-xs uppercase tracking-wider block mb-1">Задачи</span>
                            <span className="text-white/60 text-xs md:text-sm">Фундаментальные сведения о чае</span>
                        </div>
                        <div className="text-center sm:text-left">
                            <span className="text-brand-gold text-xs uppercase tracking-wider block mb-1">Принципы</span>
                            <span className="text-white/60 text-xs md:text-sm">Влияние на вкус и качество</span>
                        </div>
                        <div className="text-center sm:text-left">
                            <span className="text-brand-gold text-xs uppercase tracking-wider block mb-1">Подход</span>
                            <span className="text-white/60 text-xs md:text-sm">Аналитика без упрощений</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 md:mt-16"
                >
                    <button 
                        type="button"
                        className="text-brand-gold font-bold uppercase tracking-wider text-sm hover:underline underline-offset-4 flex items-center gap-2 mx-auto"
                    >
                        Перейти в «Дубайский Дневник»
                        <ArrowUpRight className="w-4 h-4" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
