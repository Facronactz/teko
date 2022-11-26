import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Poppins } from '@next/font/google';
import AuthContext from '@teko/components/authContext';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <head />
      <body><AuthContext>
        {children}
      </AuthContext></body>
    </html>
  );
}
