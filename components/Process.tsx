export default function Process() {
  const phases = [
    {
      number: '01',
      title: 'Discovery & Assessment',
      description: 'Free property evaluation, solar potential analysis, and feasibility report.',
      timeline: 'Week 1-2',
    },
    {
      number: '02',
      title: 'Custom Design',
      description: '3D renderings, floor plans, energy system design, and itemized budget.',
      timeline: 'Week 3-6',
    },
    {
      number: '03',
      title: 'Permitting',
      description: 'Complete handling of zoning applications, building permits, and regulatory approvals.',
      timeline: 'Week 7-18',
    },
    {
      number: '04',
      title: 'Construction',
      description: 'Foundation to finish, contractor management, energy system installation.',
      timeline: 'Week 19-34',
    },
    {
      number: '05',
      title: 'Launch & Earn',
      description: 'AirBTC listing activation, bitcoin mining commissioning, revenue starts flowing.',
      timeline: 'Week 35-38',
    },
  ]

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From consultation to first guest in 6-8 months
          </p>
        </div>

        <div className="mb-12">
          <img
            src="/assets/diagrams/construction_timeline.png"
            alt="Construction Timeline"
            className="w-full max-w-5xl mx-auto rounded-xl shadow-lg"
          />
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {phases.map((phase, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="text-4xl font-bold text-bitcoin mb-3">{phase.number}</div>
                <h3 className="text-lg font-bold mb-2">{phase.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{phase.description}</p>
                <div className="text-xs font-semibold text-primary">{phase.timeline}</div>
              </div>
              {index < phases.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-bitcoin transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
