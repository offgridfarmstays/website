export default function Process() {
  const phases = [
    {
      number: '01',
      title: 'Discovery & Assessment',
      description: 'Site survey including water resources (wells, creeks, rainfall), soil percolation testing, solar potential, and topography analysis.',
      timeline: 'Week 1-2',
    },
    {
      number: '02',
      title: 'Custom Design',
      description: '3D renderings, floor plans, energy systems (solar, hydro), water supply, septic design, and integrated systems engineering.',
      timeline: 'Week 3-6',
    },
    {
      number: '03',
      title: 'Permitting',
      description: 'Building permits, septic approvals, well drilling permits, water rights verification, and environmental compliance.',
      timeline: 'Week 7-18',
    },
    {
      number: '04',
      title: 'Construction',
      description: 'Well drilling, septic installation, utility trenching, foundation work, building construction, solar and hydro systems.',
      timeline: 'Week 19-34',
    },
    {
      number: '05',
      title: 'Launch & Earn',
      description: 'System commissioning, water quality testing, rental listing activation, bitcoin mining setup.',
      timeline: 'Week 35-38',
    },
  ]

  return (
    <section className="py-8 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
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
