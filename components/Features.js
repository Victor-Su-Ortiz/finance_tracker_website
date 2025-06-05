'use client'

import { motion } from 'framer-motion'
import { Split, UserPlus, PieChart, MessageSquare, Shield, Sparkles } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: <Split className="w-6 h-6" />,
      title: "Smart Expense Splitting",
      description: "Automatically detect and split shared expenses with AI-powered categorization"
    },
    {
      icon: <UserPlus className="w-6 h-6" />,
      title: "Real-time Debt Tracking",
      description: "Know who owes what with live updates and automated reimbursement matching"
    },
    {
      icon: <PieChart className="w-6 h-6" />,
      title: "Accurate Personal Budgets",
      description: "See your true spending by excluding shared expenses from personal budgets"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Conversational AI",
      description: "Manage finances naturally through chat - ask questions, split bills, track debts"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Bank-Level Security",
      description: "End-to-end encryption with OAuth 2.0 and complete data sovereignty"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Group Insights",
      description: "Understand your social spending patterns and optimize group finances"
    }
  ]

  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Powerful <span className="gradient-text">Features</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="glass-effect p-6 rounded-xl"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}