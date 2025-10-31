'use client'

import { useState } from 'react'
import ConsultationForm from './components/ConsultationForm'
import ConsultationResult from './components/ConsultationResult'

export default function Home() {
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formData: any) => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.error) {
        setResult(`Error: ${data.error}`)
      } else {
        setResult(data.advice)
      }
    } catch (error) {
      setResult('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🏋️ AI Fitness & Nutrition Coach
          </h1>
          <p className="text-xl text-gray-600">
            Get personalized fitness and nutrition advice powered by AI
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <ConsultationForm onSubmit={handleSubmit} loading={loading} />
          {loading && (
            <div className="mt-8 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Analyzing your profile and generating personalized advice...</p>
            </div>
          )}
          {result && !loading && <ConsultationResult result={result} />}
        </div>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>⚠️ This is for informational purposes only. Consult healthcare professionals before making significant changes to your fitness or nutrition routine.</p>
        </footer>
      </div>
    </main>
  )
}
