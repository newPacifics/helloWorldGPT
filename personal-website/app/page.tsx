import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center" style={{ marginTop: '10vh' }}>
      <h1 className="text-6xl font-extrabold mb-8">Sev'Log</h1>
      <p>Welcome to Sev'Log. This is the default page.</p>
    </div>
  );
}
