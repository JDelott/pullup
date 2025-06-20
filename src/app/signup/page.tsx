'use client'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-neutral-900 border border-gray-800">
        <h1 className="text-2xl font-bold text-white mb-6">Sign Up</h1>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 bg-neutral-800 text-white border border-gray-700"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-neutral-800 text-white border border-gray-700"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-neutral-800 text-white border border-gray-700"
          />
          <button className="w-full py-3 bg-[#00FFD1] text-black font-bold">
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
}