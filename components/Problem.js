'use client'

import { motion } from 'framer-motion'

export default function Problem() {
  const problems = [
    {
      title: "Inflated Budgets",
      description: "You pay a $1,000 group dinner. Traditional apps show you spent $1,000 on dining, destroying your budget accuracy.",
      color: "text-red-400",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500/50"
    },
    {
      title: "Lost Reimbursements",
      description: "No way to track who owes you money. Manual tracking in spreadsheets is painful and error-prone.",
      color: "text-orange-400",
      bgColor: "bg-orange-500/20",
      borderColor: "border-orange-500/50"
    },
    {
      title: "Meaningless Analytics",
      description: "Your spending reports include everyone else's expenses, making financial insights completely useless.",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
      borderColor: "border-yellow-500/50"
    }
  ]

  return (
    <section id="problem" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            The <span className="gradient-text">Problem</span> with Current Finance Apps
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-effect p-6 rounded-xl"
                >
                  <h3 className={`text-xl font-semibold mb-3 ${problem.color}`}>
                    {problem.title}
                  </h3>
                  <p className="text-gray-300">{problem.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-effect p-8 rounded-xl">
                <h4 className="text-lg font-semibold mb-4">Traditional App View</h4>
                <div className="space-y-4">
                  <div className="bg-red-500/20 p-4 rounded-lg border border-red-500/50">
                    <div className="flex justify-between items-center">
                      <span>Monthly Dining</span>
                      <span className="text-2xl font-bold text-red-400">$3,847</span>
                    </div>
                    <div className="text-sm text-gray-400 mt-1">184% over budget!</div>
                  </div>
                  <div className="bg-orange-500/20 p-4 rounded-lg border border-orange-500/50">
                    <div className="flex justify-between items-center">
                      <span>Random Income</span>
                      <span className="text-xl">+$2,100</span>
                    </div>
                    <div className="text-sm text-gray-400 mt-1">Unexplained deposits</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}