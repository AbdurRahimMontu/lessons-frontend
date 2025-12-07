const sampleLessons = [
  {
    id: 1,
    title: "Be Kind Even When It's Hard",
    description: "A simple act of kindness can change someone's entire day.",
    category: "Relationships",
    saves: 120,
    createdAt: "2 days ago",
  },
  {
    id: 2,
    title: "Failure Builds Strong Character",
    description: "Every mistake you make is a lesson shaping your future self.",
    category: "Growth",
    saves: 98,
    createdAt: "1 week ago",
  },
  {
    id: 3,
    title: "Time Is Your Most Valuable Asset",
    description: "Spend your time wisely because you can't earn it back.",
    category: "Mindset",
    saves: 87,
    createdAt: "4 days ago",
  },
];

const MostSavedLessons = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
        Most Saved Lessons
      </h2>
      <p className="text-center text-gray-600 mb-10">
        Lessons that inspired the most people this week.
      </p>

      {sampleLessons.length === 0 ? (
        <p className="text-center text-gray-500">No saved lessons found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleLessons.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-white border shadow-md rounded-xl hover:shadow-xl transition cursor-pointer"
            >
              {/* Category Badge */}
              <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                {item.category}
              </span>

              {/* Title */}
              <h3 className="text-xl font-semibold mt-3">{item.title}</h3>

              {/* Description */}
              <p class-sName="text-gray-600 text-sm mt-2">
                {item.description}
              </p>

              {/* Stats */}
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-pink-600 text-lg">❤️</span>
                  <span className="font-medium">{item.saves} saved</span>
                </div>

                <span className="text-gray-500 text-xs">
                  {item.createdAt}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MostSavedLessons;
