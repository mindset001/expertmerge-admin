import ReduxProvider from "@/redux/ReduxProvider";
import "./globals.css";
import { ConfigProvider } from "antd";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={'font-aeonik'}>
        <ConfigProvider
        theme={{
          token: {
            colorPrimaryHover: '#0A424A',
            // colorPrimary: '#0a414a2d'
            colorPrimary: '#0A424A',
          } 
        }}
        >
          <ReduxProvider>
          {children}
          </ReduxProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
