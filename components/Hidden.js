"use client";

export default function AnimatedBanner() {
  return (
    <div className="flex items-center justify-center min-h-64 overflow-hidden m-2">
      {/* Confetti Animation */}
      <div className="confetti"></div>
      <div className="confetti"></div>
      <div className="confetti"></div>
      <div className="confetti"></div>

      {/* Banner */}
      <div className="relative bg-[#a355b8] rounded-3xl shadow-2xl p-8 w-full max-w-8xl text-center space-y-6">
        {/* 3D Party Icons */}
        <div className="flex justify-around items-center space-x-8">
          {/* Party Icon */}
          <div className="icon bg-[#f7bdbc]">🎊</div>

          {/* Money Icon */}
          <div className="icon bg-[#dfdfdf]">💰</div>

          {/* Celebration Icon */}
          <div className="icon bg-[#ffffff]">🥳</div>
        </div>

        {/* Main Text */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white animate-pulse mt-6">
          No Hidden Fees
        </h1>

        {/* Subtext */}
        <p className="text-lg text-[#dfdfdf]">
          Transparent Pricing, No Hidden Commissions. Celebrate the difference!
        </p>
      </div>

      {/* Inline Styles for Animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(to bottom right, #f7bdbc, #a355b8);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
          animation: float 3s infinite ease-in-out;
        }

        .confetti {
          width: 10px;
          height: 10px;
          background: radial-gradient(circle, #f7bdbc, transparent);
          position: absolute;
          animation: confetti 2s linear infinite;
        }

        @keyframes confetti {
          0% { transform: translateY(-100%) rotate(0); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }

        .confetti:nth-child(1) { left: 15%; animation-delay: 0s; }
        .confetti:nth-child(2) { left: 35%; animation-delay: 0.5s; }
        .confetti:nth-child(3) { left: 60%; animation-delay: 1s; }
        .confetti:nth-child(4) { left: 80%; animation-delay: 1.5s; }
      `}</style>
    </div>
  );
}
