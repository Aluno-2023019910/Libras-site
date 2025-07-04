
import LayCli from './layoucli';
import SessionWrapper from '@/components/sessionprovider'
import "@/globals.css";

export const metadata = {
  title: "Libras para todos",
  description: "Trabalho para a materia de framework de web",
};

export default function RootLayout({ children }) {
  return (
    <html lang="PT-BR">

      <body>
        <SessionWrapper>  
          <LayCli>          
            {children}
          </LayCli>
        </SessionWrapper>

      </body>
    
    </html>
  )
}
