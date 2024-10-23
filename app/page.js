// pages/index.js
import { SocketProvider } from "@/context/SocketContext";

export default function Home() {
  return (
    <main className="p-10 box-border">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Home Page</h1>
      <p className="text-lg">
        This is the main content area. Replace this text with your actual
        content.
      </p>
    </main>
  );
}
