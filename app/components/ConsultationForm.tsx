'use client'

import { useState } from 'react'

interface FormData {
  age: string
  weight: string
  height: string
  gender: string
  activityLevel: string
  goal: string
  dietaryRestrictions: string
  healthConditions: string
  consultationType: string
}

interface Props {
  onSubmit: (data: FormData) => void
  loading: boolean
}

export default function ConsultationForm({ onSubmit, loading }: Props) {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintain',
    dietaryRestrictions: '',
    healthConditions: '',
    consultationType: 'both'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age *
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="1"
            max="120"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="25"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight (kg) *
          </label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            min="20"
            max="300"
            step="0.1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="70"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Height (cm) *
          </label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
            min="100"
            max="250"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="170"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender *
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Activity Level *
          </label>
          <select
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="sedentary">Sedentary (little/no exercise)</option>
            <option value="light">Light (1-3 days/week)</option>
            <option value="moderate">Moderate (3-5 days/week)</option>
            <option value="active">Active (6-7 days/week)</option>
            <option value="very_active">Very Active (athlete)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Goal *
          </label>
          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="lose_weight">Lose Weight</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain_muscle">Gain Muscle</option>
            <option value="improve_fitness">Improve Fitness</option>
            <option value="improve_health">Improve Overall Health</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Consultation Type *
        </label>
        <select
          name="consultationType"
          value={formData.consultationType}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="both">Fitness & Nutrition</option>
          <option value="fitness">Fitness Only</option>
          <option value="nutrition">Nutrition Only</option>
        </select>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dietary Restrictions or Preferences
        </label>
        <textarea
          name="dietaryRestrictions"
          value={formData.dietaryRestrictions}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="e.g., vegetarian, vegan, gluten-free, lactose intolerant..."
        />
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Health Conditions or Concerns
        </label>
        <textarea
          name="healthConditions"
          value={formData.healthConditions}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="e.g., diabetes, high blood pressure, injuries..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Generating Your Plan...' : 'Get AI Consultation'}
      </button>
    </form>
  )
}
