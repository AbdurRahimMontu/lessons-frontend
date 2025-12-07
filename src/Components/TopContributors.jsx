

const contributors = [
  {
    id: 1,
    name: "Sarah Khan",
    photo: "https://i.pravatar.cc/150?img=1",
    lessons: 14,
  },
  {
    id: 2,
    name: "Aminul Islam",
    photo: "https://i.pravatar.cc/150?img=5",
    lessons: 11,
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    photo: "https://i.pravatar.cc/150?img=8",
    lessons: 9,
  },
];


const TopContributors = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
        Top Contributors of the Week
      </h2>
      <p className="text-center text-gray-600 mb-10">
        Recognizing community members who shared the most valuable life lessons this week.
      </p>

      {contributors.length === 0 ? (
        <p className="text-center text-gray-500">No contributors this week.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contributors.map((user, idx) => (
            <div
              key={user.id}
              className="p-6 bg-white shadow-md border rounded-xl flex items-center gap-4 hover:shadow-xl transition"
            >
              {/* Profile Image */}
              <img
                src={user.photo}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border"
              />

              {/* User Info */}
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-600">
                  {user.lessons} Lessons Shared
                </p>
                <p className="text-xs text-blue-600 font-medium mt-1">
                  Rank #{idx + 1}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TopContributors;
