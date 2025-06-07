'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Receipt, Bell, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">Introducing the future of personal finance</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Your Money is <span className="gradient-text">Social</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            The first personal finance platform that understands shared expenses, 
            tracks social debts, and gives you accurate insights into your true spending.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-primary/80 px-8 py-4 rounded-full font-semibold flex items-center gap-2 mx-auto sm:mx-0"
            >
              Request Early Access <ArrowRight className="w-5 h-5" />
            </motion.button>
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-effect px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors"
            >
              Watch Demo
            </motion.button> */}
          </div>
        </motion.div>

        <div className="relative mt-20">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute left-10 top-0 glass-effect p-4 rounded-lg"
          >
            <Receipt className="w-6 h-6 mb-2 text-primary" />
            <p className="text-sm">Split: $142.50</p>
            <p className="text-xs text-gray-400">3 people</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute right-10 top-10 glass-effect p-4 rounded-lg"
          >
            <Bell className="w-6 h-6 mb-2 text-accent" />
            <p className="text-sm">John paid you back</p>
            <p className="text-xs text-gray-400">$47.50</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}