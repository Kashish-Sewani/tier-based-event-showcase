export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-4">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center">
        
        <p className="text-sm">
         Copyright © {new Date().getFullYear()} Tierly. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
