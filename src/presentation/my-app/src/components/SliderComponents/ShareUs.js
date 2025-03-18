"use client";

export default function ShareUs() {
  const emailSubject = encodeURIComponent("Check out RateMyDino!");
  const emailBody = encodeURIComponent(
    "Hey! I found this awesome site called RateMyDino where you can find reviews on University of Calgary professors. Check it out: https://ratemydino.com"
  );

  const handleClick = () => {
    window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
  };

  return (
    <div className="text-center pointer-events-auto" onClick={handleClick}>
      <h2 className="text-3xl font-bold text-white mb-3">Share RateMyDino</h2>
      <p className="text-lg text-gray-300 mb-5">Click to share via email!</p>
    </div>
  );
}
