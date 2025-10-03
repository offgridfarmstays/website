export default function ContactCTA() {
  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-br from-orange-600 to-orange-800 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Transform Your Land?
        </h2>
        <p className="text-xl mb-8 opacity-95">
          Schedule a free property assessment to explore your land's income potential. No cost, no obligation—just honest analysis.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <a
            href="mailto:offgridfarmstays@gmail.com?subject=Free Land Assessment Request"
            className="inline-block px-8 py-4 bg-bitcoin text-white text-lg font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            Request Free Assessment
          </a>
          <a
            href="mailto:offgridfarmstays@gmail.com?subject=General Inquiry"
            className="inline-block px-8 py-4 bg-white text-primary text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            General Inquiry
          </a>
        </div>

        <div className="text-center opacity-90">
          <p className="mb-2">Contact us:</p>
          <a
            href="mailto:offgridfarmstays@gmail.com"
            className="text-xl font-semibold hover:text-bitcoin transition-colors"
          >
            offgridfarmstays@gmail.com
          </a>
        </div>
      </div>
    </section>
  )
}
