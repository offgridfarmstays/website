export default function Footer() {
  return (
    <footer className="bg-dark text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Offgrid Farmstays</h3>
            <p className="text-gray-400 leading-relaxed">
              Building wealth from land, powered by sunshine and bitcoin.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Custom Design & Engineering</li>
              <li>Solar & Geothermal Systems</li>
              <li>Bitcoin Mining Integration</li>
              <li>Permitting & Compliance</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="mailto:offgridfarmstays@gmail.com"
                  className="hover:text-bitcoin transition-colors"
                >
                  offgridfarmstays@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Offgrid Farmstays. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
