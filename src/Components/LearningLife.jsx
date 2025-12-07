const LearningLife = () => {
  const benefits = [
    {
      title: "Gain Real-World Wisdom",
      desc: "Life lessons teach you what no book can — practical knowledge you can apply instantly.",
      icon: "💡",
    },
    {
      title: "Grow Emotionally",
      desc: "Understanding your experiences helps build emotional strength and resilience.",
      icon: "🌱",
    },
    {
      title: "Make Better Decisions",
      desc: "Learning from mistakes and successes improves judgment over time.",
      icon: "🎯",
    },
    {
      title: "Improve Relationships",
      desc: "Life experiences help you communicate, connect, and understand others better.",
      icon: "🤝",
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
        Why Learning From Life Matters
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((item, idx) => (
          <div
            key={idx}
            className="p-6 bg-white shadow-md rounded-xl border hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LearningLife;
