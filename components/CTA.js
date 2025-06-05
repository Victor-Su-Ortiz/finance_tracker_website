'use client'

import { motion } from 'framer-motion'
import { Star, Shield } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-effect p-12 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Financial Life?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands waiting for the finance app that actually understands how you spend money.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-full bg-white/10 backdrop-blur border border-white/20 focus:outline-none focus:border-primary"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-primary hover:bg-primary/80 px-8 py-3 rounded-full font-semibold"
              >
                Get Early Access
              </motion.button>
            </form>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                No credit card required
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-green-400" />
                Bank-level security
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}