import './globals.css';

export const metadata = {
  title: 'Entre Nós',
  description: 'Um cantinho nosso, mesmo quando existe distância.',
  themeColor: '#fbf3ee',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
