
export const metadata = {
  title: "Libras para todos",
  description: "Trabalho para a materia de framework de web",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
