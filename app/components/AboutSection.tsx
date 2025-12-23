'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section className="relative flex min-h-screen w-screen flex-shrink-0 items-center justify-center bg-black px-8 py-20">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="mb-12 font-serif text-5xl font-bold text-white md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ABOUT
          </motion.h2>

          <motion.div
            className="space-y-8 font-sans text-lg leading-relaxed text-gray-300 md:text-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p>
              예술은 경계를 넘어서는 언어입니다. 그래픽 디자인, 일러스트레이션,
              순수 미술의 경계를 자유롭게 넘나들며, 각 매체의 고유한 특성을
              탐구하고 융합합니다.
            </p>

            <p>
              디지털과 아날로그의 만남, 추상과 구상의 대화, 색채와 형태의
              조화를 통해 새로운 시각적 경험을 만들어냅니다. 작품 하나하나가
              이야기를 담고 있으며, 관람자와의 대화를 기다립니다.
            </p>

            <p>
              미래를 향한 창의적 실험과 과거로부터의 영감을 결합하여, 독특하고
              감동적인 작품 세계를 구축하고 있습니다.
            </p>
          </motion.div>

          <motion.div
            className="mt-16 flex flex-wrap gap-6 font-sans text-sm text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div>
              <span className="font-semibold text-white">Contact:</span>{' '}
              <a
                href="mailto:artist@example.com"
                className="hover:text-white transition-colors"
              >
                artist@example.com
              </a>
            </div>
            <div>
              <span className="font-semibold text-white">Location:</span> Seoul,
              Korea
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

