import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import "../globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Auth',
    desription: 'A Next.js 13 Meta threads Application'
}


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
    }) {
    return (
        <ClerkProvider>
            <html lang='en'>
                <body className={`${inter.className} bg-dark-1`}>
                    <div className="w-full flex items-center justify-center min-h-screen">
                     {children}
                    </div>
                </body>
            </html>
        </ClerkProvider>
    )
}