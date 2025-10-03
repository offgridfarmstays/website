'use client'

import { useState } from 'react'

export default function ContactCTA() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    preferredContact: 'email',
    projectDescription: '',
    technologies: [] as string[],
  })

  const technologyOptions = [
    'Solar Energy Systems',
    'Hydroelectric Power',
    'Geothermal Heating/Cooling',
    'Bitcoin Mining Integration',
    'Heat Reuse Systems',
    'Off-Grid Water Systems',
    'Septic Systems',
    'Energy Storage/Batteries',
    'Guest Rental Integration',
  ]

  const handleTechnologyToggle = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter(t => t !== tech)
        : [...prev.technologies, tech]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic will be added later
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contact" className="py-12 px-6 bg-gradient-to-br from-orange-600 to-orange-800 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Land?
          </h2>
          <p className="text-lg md:text-xl opacity-95">
            Schedule a free property assessment to explore your land's income potential. No cost, no obligation—just honest analysis.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 md:p-8 text-gray-900">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold mb-2">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold mb-2">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="address" className="block text-sm font-semibold mb-2">
              Property Address *
            </label>
            <input
              type="text"
              id="address"
              required
              placeholder="Start typing address..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Preferred Contact Method *
            </label>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="preferredContact"
                  value="email"
                  checked={formData.preferredContact === 'email'}
                  onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                  className="mr-2"
                />
                Email
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="preferredContact"
                  value="phone"
                  checked={formData.preferredContact === 'phone'}
                  onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                  className="mr-2"
                />
                Phone
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="projectDescription" className="block text-sm font-semibold mb-2">
              Project Description *
            </label>
            <textarea
              id="projectDescription"
              required
              rows={5}
              placeholder="Site characteristics, desired features, existing considerations..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-vertical"
              value={formData.projectDescription}
              onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3">
              Technologies of Interest
            </label>
            <div className="grid md:grid-cols-2 gap-3">
              {technologyOptions.map((tech) => (
                <label key={tech} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.technologies.includes(tech)}
                    onChange={() => handleTechnologyToggle(tech)}
                    className="mr-2"
                  />
                  {tech}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-8 py-4 bg-bitcoin text-white text-lg font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            Request Free Assessment
          </button>
        </form>
      </div>
    </section>
  )
}
