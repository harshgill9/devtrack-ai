export default function StatCard({
  title,
  value,
  color = "bg-blue-600",
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="text-gray-500 text-sm">
        {title}
      </div>

      <div className={`mt-4 text-3xl font-bold ${color.replace("bg-", "text-")}`}>
        {value}
      </div>
    </div>
  );
}