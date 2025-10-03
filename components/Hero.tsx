export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-white">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/assets/banners/heat_flow_lifestyle.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight whitespace-nowrap">
          Turn Idle Land Into Passive Income
        </h1>

        <p className="text-xl md:text-2xl mb-8 opacity-95 max-w-3xl mx-auto">
          We build bitcoin-powered off-grid retreats with solar energy, geothermal systems, and guest booking integration—handling permitting, construction, and everything in between.
        </p>

        <a
          href="#contact"
          className="inline-block px-10 py-4 bg-bitcoin text-white text-lg font-semibold rounded-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
        >
          Get Your Free Land Assessment
        </a>

        <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Custom Engineering</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Dual Revenue Streams</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Full Permitting Support</span>
          </div>
        </div>
      </div>
    </section>
  )
}
