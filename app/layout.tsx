import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Offgrid Farmstays - Bitcoin-Powered Off-Grid Retreats',
  description: 'Turn idle land into passive income with bitcoin-powered off-grid retreats. Solar energy, geothermal systems, and guest booking integration.',
  keywords: 'off-grid, bitcoin mining, solar energy, geothermal, farmstays, land development, passive income, AirBTC',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
