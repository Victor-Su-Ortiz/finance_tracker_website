'use client'

import { motion } from 'framer-motion'
import { Brain, Users, MessageSquare } from 'lucide-react'

export default function Solution() {
  const stats = [
    { value: "73%", label: "of millennials split expenses weekly" },
    { value: "$2.8K", label: "average annual shared expenses" },
    { value: "4.2x", label: "more accurate budgets" },
    { value: "92%", label: "debt collection rate" }
  ]

  const valueProps = [
    {
      icon: <Brain className="w-12 h-12" />,
      title: "AI-Powered Intelligence",
      description: "Automatically detects and categorizes shared expenses with advanced ML",
      color: "text-primary"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Social by Design",
      description: "Built from the ground up for how people actually manage money together",
      color: "text-secondary"
    },
    {
      icon: <MessageSquare className="w-12 h-12" />,
      title: "Conversational Control",
      description: "Natural language interface for all your financial management needs",
      color: "text-accent"
    }
  ]

  return (
    <section id="solution" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Enter <span className="gradient-text">SocialFin</span>
          </h2>

          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xl text-gray-300">
              We're building the first finance platform that understands modern spending is inherently social. 
              Track shared expenses, manage debts, and see your true financial picture.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {valueProps.map((prop, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect p-8 rounded-xl text-center"
              >
                <div className={`mx-auto mb-4 ${prop.color}`}>
                  {prop.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{prop.title}</h3>
                <p className="text-gray-300">{prop.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}