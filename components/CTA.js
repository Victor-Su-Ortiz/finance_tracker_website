'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowRight, Copy, Check, Users, Sparkles} from 'lucide-react'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [stats, setStats] = useState({ totalCount: 0, recentSignups: [] })
  const [showAdvancedForm, setShowAdvancedForm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    userType: '',
    painPoint: ''
  })

  // Check for referral code in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const ref = urlParams.get('ref')
    if (ref) {
      sessionStorage.setItem('referralCode', ref)
    }
  }, [])

  // Fetch stats on mount
  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, 30000) // Update every 30s
    return () => clearInterval(interval)
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/waitlist')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch stats')
    }
  }

  const handleQuickSubmit = async (e) => {
    e.preventDefault()
    await submitForm({ email })
  }

  const handleAdvancedSubmit = async (e) => {
    e.preventDefault()
    await submitForm(formData)
  }

  const submitForm = async (data) => {
    setStatus('loading')
    setErrorMessage('')

    try {
      // Add referral code if exists
      const referralCode = sessionStorage.getItem('referralCode')
      if (referralCode) {
        data.referredBy = referralCode
      }

      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong')
      }

      setStatus('success')
      setUserInfo(result)
      setShowSuccess(true)
      setEmail('')
      setFormData({ email: '', firstName: '', userType: '', painPoint: '' })
      setShowAdvancedForm(false)
      
      // Update stats
      fetchStats()
      
    } catch (error) {
      setStatus('error')
      setErrorMessage(error.message)
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const copyReferralLink = () => {
    const link = `${window.location.origin}?ref=${userInfo.referralCode}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (showSuccess && userInfo) {
    return (
      <section id="cta" className="py-20 px-6">
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur rounded-3xl p-8 border border-primary/20">
            <h2 className="text-3xl font-bold mb-4">🎉 You're In!</h2>
            
            <div className="mb-6">
              <p className="text-5xl font-bold text-primary mb-2">#{userInfo.position}</p>
              <p className="text-gray-400">Your position in line</p>
            </div>

            <div className="bg-black/30 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-400 mb-2">Skip the line! Share your unique link:</p>
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={`${window.location.origin}?ref=${userInfo.referralCode}`}
                  className="flex-1 bg-white/10 rounded-lg px-3 py-2 text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyReferralLink}
                  className="bg-primary text-black px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </motion.button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Get 3 friends to sign up and jump ahead 10 spots!
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-2xl font-bold text-primary">{userInfo.totalCount}</p>
                <p className="text-xs text-gray-400">Total signups</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-2xl font-bold text-primary">0</p>
                <p className="text-xs text-gray-400">Your referrals</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-2xl font-bold text-primary">Q2 2025</p>
                <p className="text-xs text-gray-400">Launch date</p>
              </div>
            </div>

            <button
              onClick={() => setShowSuccess(false)}
              className="text-sm text-gray-400 hover:text-primary"
            >
              ← Back to site
            </button>
          </div>
        </motion.div>
      </section>
    )
  }

  return (
    <section id="cta" className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Finances?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands who are already managing money better together
          </p>

          {/* Live Stats */}
          <motion.div 
            className="flex items-center justify-center gap-8 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-400">
                <span className="text-primary font-semibold">{stats.totalCount}</span> people joined
              </span>
            </div>
            
            {stats.recentSignups.length > 0 && (
              <div className="hidden sm:flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">
                  {stats.recentSignups[0]?.first_name || 'Someone'} just joined
                </span>
              </div>
            )}
          </motion.div>

          {/* Quick Email Form */}
          {!showAdvancedForm && (
            <form onSubmit={handleQuickSubmit} className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-6 py-3 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-primary focus:bg-white/20 transition-all"
                required
                disabled={status === 'loading'}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={status === 'loading'}
                className="bg-primary hover:bg-primary/80 text-black px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    Joining...
                  </span>
                ) : (
                  <>
                    Get Early Access
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          )}

          {/* Link to advanced form */}
          {!showAdvancedForm && (
            <motion.button
              onClick={() => setShowAdvancedForm(true)}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-primary/50 bg-primary/10 hover:bg-primary/20 hover:border-primary text-sm font-medium transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              Want to tell us more about your needs?
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
          {/* Advanced Form */}
          <AnimatePresence>
            {showAdvancedForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleAdvancedSubmit}
                className="max-w-md mx-auto space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="px-4 py-3 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-primary"
                    required
                  />
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="px-4 py-3 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-primary"
                  />
                </div>

                <select
                  value={formData.userType}
                  onChange={(e) => setFormData({...formData, userType: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-white focus:outline-none focus:border-primary"
                >
                  <option value="">How do you manage money?</option>
                  <option value="individual">Just me</option>
                  <option value="couple">With my partner</option>
                  <option value="group">With friends/roommates</option>
                </select>

                <select
                  value={formData.painPoint}
                  onChange={(e) => setFormData({...formData, painPoint: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-white focus:outline-none focus:border-primary"
                >
                  <option value="">What's your biggest financial challenge?</option>
                  <option value="splitting">Splitting expenses fairly</option>
                  <option value="tracking">Tracking who owes what</option>
                  <option value="budgeting">Creating accurate budgets</option>
                  <option value="communication">Talking about money</option>
                </select>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex-1 bg-primary hover:bg-primary/80 text-black px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                  </motion.button>
                  <button
                    type="button"
                    onClick={() => setShowAdvancedForm(false)}
                    className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10"
                  >
                    Cancel
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Error Message */}
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-center mt-4"
            >
              <p>{errorMessage}</p>
            </motion.div>
          )}

          {/* Trust Signals */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              ✓ No credit card required
            </span>
            <span className="flex items-center gap-2">
              ✓ Early access benefits
            </span>
            <span className="flex items-center gap-2">
              ✓ Cancel anytime
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}