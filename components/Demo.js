'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function Demo() {
  const [activeDemo, setActiveDemo] = useState('split')

  const demoScreens = {
    split: {
      title: "Split Any Expense",
      description: "AI detects shared expenses and suggests splits",
      benefits: [
        "Instant expense recognition",
        "Automated debt tracking",
        "Real-time synchronization"
      ],
      content: (
        <div className="space-y-4">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-300">Uber Eats</span>
              <span className="font-semibold">$142.50</span>
            </div>
            <div className="text-xs text-gray-400">Group dinner detected</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3 bg-primary/20 rounded-lg p-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-xs">JD</div>
              <span className="flex-1">John Doe</span>
              <span>$35.63</span>
            </div>
            <div className="flex items-center gap-3 bg-primary/20 rounded-lg p-3">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-xs">SM</div>
              <span className="flex-1">Sarah Miller</span>
              <span>$35.63</span>
            </div>
            <div className="flex items-center gap-3 bg-accent/20 rounded-lg p-3">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-xs">You</div>
              <span className="flex-1">You</span>
              <span>$35.63</span>
            </div>
          </div>
        </div>
      )
    },
    chat: {
      title: "Natural Language Control",
      description: "Just ask your AI assistant anything",
      benefits: [
        "Conversational interface",
        "Smart debt reminders",
        "Instant insights"
      ],
      content: (
        <div className="space-y-4">
          <div className="bg-primary/20 rounded-lg p-3 self-end max-w-[80%] ml-auto">
            <p className="text-sm">How much do I owe Sarah?</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-3 max-w-[80%]">
            <p className="text-sm mb-2">You owe Sarah $127.50 from 3 transactions:</p>
            <ul className="text-xs space-y-1 text-gray-300">
              <li>• Dinner at Nobu: $85.00</li>
              <li>• Uber to airport: $22.50</li>
              <li>• Coffee supplies: $20.00</li>
            </ul>
          </div>
          <div className="bg-primary/20 rounded-lg p-3 self-end max-w-[80%] ml-auto">
            <p className="text-sm">Send her a payment reminder</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-3 max-w-[80%]">
            <p className="text-sm">✓ Reminder sent to Sarah!</p>
          </div>
        </div>
      )
    },
    insights: {
      title: "True Personal Spending",
      description: "See your actual expenses, not inflated group totals",
      benefits: [
        "Accurate budgets",
        "Spending insights",
        "Financial clarity"
      ],
      content: (
        <div className="space-y-4">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-3">December Dining Budget</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Traditional View</span>
                  <span className="text-red-400">$1,847</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-red-400 h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Your Actual Spending</span>
                  <span className="text-green-400">$423</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{width: '42%'}}></div>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">$1,424 was for group expenses you'll be reimbursed for</p>
          </div>
        </div>
      )
    }
  }

  return (
    <section id="demo" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            See it in <span className="gradient-text">Action</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap gap-4 mb-8">
                {Object.keys(demoScreens).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveDemo(key)}
                    className={`px-6 py-3 rounded-full transition-all ${
                      activeDemo === key 
                        ? 'bg-primary text-white' 
                        : 'glass-effect hover:bg-white/20'
                    }`}
                  >
                    {demoScreens[key].title}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDemo}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-semibold mb-3">{demoScreens[activeDemo].title}</h3>
                  <p className="text-gray-300 mb-6">{demoScreens[activeDemo].description}</p>
                  
                  <div className="space-y-4">
                    {demoScreens[activeDemo].benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl"></div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="relative glass-effect p-8 rounded-2xl"
              >
                <div className="bg-gray-900/50 rounded-xl p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeDemo}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {demoScreens[activeDemo].content}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}