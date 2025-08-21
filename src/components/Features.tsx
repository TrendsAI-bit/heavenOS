export default function Features() {
  const features = [
    {
      title: "Heaven Prompt",
      description: "Command palette that responds instantly. Press Ctrl/⌘-K to summon divine productivity.",
      icon: "⌘",
      details: "Smart search • Quick actions • Keyboard-first"
    },
    {
      title: "Halo Bar",
      description: "Essential actions at your fingertips. No hunting through menus or endless clicking.",
      icon: "◉",
      details: "One-click access • Context aware • Minimal design"
    },
    {
      title: "Cloud Desk",
      description: "Draggable pixel windows that feel solid and responsive. Organize your workspace your way.",
      icon: "☁",
      details: "Pixel perfect • Snap to grid • Multi-window"
    },
    {
      title: "Quiet Mode",
      description: "Monochrome focus theme that eliminates distractions. Pure concentration, zero noise.",
      icon: "◐",
      details: "Distraction-free • Eye-friendly • Toggle anywhere"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-pixel mb-4">
            Features
          </h2>
          <p className="text-sm font-mono text-gray-600 max-w-2xl mx-auto">
            Every feature designed with intention. No bloat, no confusion, just pure functionality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="pixel-window bg-white p-6 hover:shadow-lg transition-shadow"
            >
              {/* Icon */}
              <div className="text-3xl mb-4 text-halo-gold">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-pixel mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm font-mono text-gray-700 mb-4 leading-relaxed">
                {feature.description}
              </p>

              {/* Details */}
              <div className="text-xs font-mono text-gray-500 border-t border-gray-200 pt-3">
                {feature.details}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
