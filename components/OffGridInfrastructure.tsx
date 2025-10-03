export default function OffGridInfrastructure() {
  const systems = [
    {
      title: 'Water Systems',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.5 2a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM3 4.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zm11.5-2a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM12 4.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zM5.5 12a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM3 14.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zm11.5-2a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM12 14.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z" clipRule="evenodd" />
        </svg>
      ),
      color: 'blue',
      items: [
        {
          subtitle: 'Well Drilling',
          description: 'Professional geological survey and water table assessment. Drilled wells with submersible pumps and pressure systems. Water quality testing and treatment planning.'
        },
        {
          subtitle: 'Rainwater Harvesting',
          description: 'Roof catchment systems with first-flush diverters. Storage tanks with filtration and UV purification. Integration with household plumbing and irrigation.'
        },
        {
          subtitle: 'Creek & River Access',
          description: 'Water rights assessment and permitting. Intake systems with screening and filtration. Seasonal flow considerations and backup systems.'
        }
      ]
    },
    {
      title: 'Septic & Wastewater',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      ),
      color: 'green',
      items: [
        {
          subtitle: 'Septic System Design',
          description: 'Percolation testing and soil analysis. Properly sized septic tanks and drain fields. Compliance with county health department regulations.'
        },
        {
          subtitle: 'Alternative Systems',
          description: 'Aerobic treatment units for challenging soils. Mound systems for high water tables. Composting toilets and greywater systems where appropriate.'
        },
        {
          subtitle: 'Maintenance Planning',
          description: 'Access points for pumping and inspection. Regular monitoring schedules. Guest education materials for proper system use.'
        }
      ]
    },
    {
      title: 'Hydroelectric Power',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      ),
      color: 'indigo',
      items: [
        {
          subtitle: 'Site Assessment',
          description: 'Flow rate measurements across all seasons. Head pressure calculations and elevation surveys. Environmental impact and fish passage considerations.'
        },
        {
          subtitle: 'Micro-Hydro Systems',
          description: 'Turbine sizing and intake design. Penstock routing and powerhouse placement. Grid-tie or battery storage integration with solar.'
        },
        {
          subtitle: 'Permitting & Rights',
          description: 'Water rights verification and documentation. Federal, state, and local permits. Environmental compliance and monitoring requirements.'
        }
      ]
    },
    {
      title: 'Site Preparation',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      color: 'orange',
      items: [
        {
          subtitle: 'Access & Roads',
          description: 'Grading and road construction for equipment access. Utility trenching for buried lines. Erosion control and drainage management.'
        },
        {
          subtitle: 'Foundation Work',
          description: 'Soil testing and bearing capacity analysis. Frost depth considerations for footings. Excavation for basements or crawl spaces.'
        },
        {
          subtitle: 'Coordination',
          description: 'Scheduling well drilling before foundation work. Septic field placement away from water sources. Utility routing that minimizes excavation.'
        }
      ]
    }
  ]

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      icon: 'text-blue-600',
      heading: 'text-blue-900'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-600',
      icon: 'text-green-600',
      heading: 'text-green-900'
    },
    indigo: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-600',
      icon: 'text-indigo-600',
      heading: 'text-indigo-900'
    },
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-500',
      icon: 'text-orange-600',
      heading: 'text-orange-900'
    }
  }

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Off-Grid Infrastructure
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete water, waste, and power systems engineered for your property
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {systems.map((system, index) => {
            const colors = colorClasses[system.color as keyof typeof colorClasses]
            return (
              <div key={index} className={`${colors.bg} p-8 rounded-xl border-l-4 ${colors.border}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={colors.icon}>
                    {system.icon}
                  </div>
                  <h3 className={`text-2xl font-bold ${colors.heading}`}>
                    {system.title}
                  </h3>
                </div>

                <div className="space-y-6">
                  {system.items.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h4 className="font-bold text-gray-900 mb-2">{item.subtitle}</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 bg-gray-50 p-8 rounded-xl">
          <h3 className="text-2xl font-bold mb-4 text-center">Integrated Systems Planning</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">Site Survey</div>
              <p className="text-gray-600">Comprehensive assessment of water, soil, topography, and flow resources</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">Engineering</div>
              <p className="text-gray-600">Custom system design coordinated with building plans and energy systems</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">Permitting</div>
              <p className="text-gray-600">Complete handling of environmental, health, and water rights applications</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
