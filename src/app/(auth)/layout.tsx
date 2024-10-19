import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Management next js | login",
  description: "User Management login page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-[100vh] flex justify-center items-center">
      {children}
    </div>
  );
}





