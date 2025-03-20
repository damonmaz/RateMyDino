"use client";

export default function ReviewUs() {
  const emailSubject = encodeURIComponent("User Review For RateMyDino!");
  const emailBody = encodeURIComponent(
    "Hey! Here below is how I found RateMyDinos, helpful or unhelpful:"
  );

  const handleClick = () => {
    window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
  };

  return (
    <div className="text-center pointer-events-auto" onClick={handleClick}>
      <h2 className="text-3xl font-bold text-white mb-3">Send a Review</h2>
      <p className="text-lg text-gray-300 mb-5">Click to send us a review for RateMyDino!</p>
    </div>
  );
}
