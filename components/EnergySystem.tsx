export default function EnergySystem() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Integrated Energy Systems
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Solar, geothermal, and bitcoin mining working together for maximum efficiency
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/assets/diagrams/energy_flow.png"
              alt="Energy Flow Diagram"
              className="w-full rounded-xl shadow-lg"
            />
          </div>

          <div className="space-y-8">
            <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                Solar Energy Production
              </h3>
              <p className="text-gray-700">
                Oversized solar arrays generate clean electricity. Your retreat uses 30-40%, bitcoin mining uses 50-60%, and batteries store the rest for nighttime use.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-600">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                </svg>
                Geothermal Climate Control
              </h3>
              <p className="text-gray-700">
                Underground pipes tap Earth's constant 50-55°F temperature for ultra-efficient heating and cooling. Reduces energy consumption by 75% vs. traditional HVAC.
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-bitcoin">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <svg className="w-6 h-6 text-bitcoin" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Immersion Cooling & Heat Reuse
              </h3>
              <p className="text-gray-700">
                ASIC miners submerged in dielectric fluid capture 95% of heat energy through heat exchangers. This free heat provides domestic hot water, radiant floor heating, and spa/hot tub warming year-round.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
