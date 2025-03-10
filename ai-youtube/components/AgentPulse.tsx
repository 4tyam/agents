type AgentPulseProps = {
  size?: "small" | "medium" | "large";
  color?: "blue" | "green" | "purple";
};

function AgentPulse({ size = "medium", color = "blue" }: AgentPulseProps) {
  const sizeClasses = {
    small: "size-4",
    medium: "size-12",
    large: "size-16",
  };

  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
  };

  return (
    <div
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse`}
    />
  );
}

export default AgentPulse;
