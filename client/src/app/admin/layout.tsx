
import { AuthProvider } from "@/hooks/useAuth";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    
        <AuthProvider>{children}</AuthProvider>
  
    </html>
  );
}
