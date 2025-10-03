export default function ContactCTA() {
  return (
    <section id="contact" className="py-12 px-6 bg-gradient-to-br from-orange-600 to-orange-800 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Transform Your Land?
        </h2>
        <p className="text-lg md:text-xl mb-6 opacity-95">
          Schedule a free property assessment to explore your land's income potential. No cost, no obligation—just honest analysis.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
      </div>
    </section>
  )
}
