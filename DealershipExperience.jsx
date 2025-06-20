import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, DollarSign, Phone, Info, Star, ClipboardCheck, Share2, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const vehicles = [
  {
    name: "2024 Toyota Corolla",
    type: "Commuter",
    price: "$22,000",
    rating: 4.6,
    features: ["Apple CarPlay", "Pre-Collision System", "Great MPG"],
    video: "https://www.youtube.com/embed/Xa0Q0J5tOP0",
    description: "Perfect for students and city dwellers. Compact, efficient, and tech-ready.",
    link: "https://www.toyota.com/corolla/"
  },
  {
    name: "2024 Toyota RAV4",
    type: "Adventure",
    price: "$29,000",
    rating: 4.8,
    features: ["AWD", "Roof Rails", "360° Camera"],
    video: "https://www.youtube.com/embed/B7ZRYs_7X_o",
    description: "Built for weekend getaways and outdoorsy lifestyles.",
    link: "https://www.toyota.com/rav4/"
  },
  {
    name: "2024 Toyota Tacoma",
    type: "Off-Road",
    price: "$35,000",
    rating: 4.9,
    features: ["Lift Kit", "Off-Road Tires", "Locking Rear Diff"],
    video: "https://www.youtube.com/embed/qB6KaHq-dSA",
    description: "Take on rough terrain with confidence and style.",
    link: "https://www.toyota.com/tacoma/"
  }
];

export default function DealershipExperience() {
  const [filter, setFilter] = useState("");
  const [hovered, setHovered] = useState(null);

  const filteredVehicles = filter
    ? vehicles.filter((v) => v.type === filter)
    : vehicles;

  const handleAction = (action, name) => {
    switch (action) {
      case "estimate":
        alert(`Estimating payments for ${name}...`);
        break;
      case "text":
        alert(`Connecting you with a recent buyer of ${name}...`);
        break;
      case "specs":
        alert(`Showing technical specs and comparisons for ${name}.`);
        break;
      case "wishlist":
        alert(`${name} added to your wishlist!`);
        break;
      case "share":
        alert(`Copied share link for ${name}!`);
        break;
      case "buy":
        window.open("https://www.toyota.com/dealers", "_blank");
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <motion.h1 
        className="text-4xl font-extrabold text-gray-800"
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }}
      >
        🚗 The Future of Car Buying
      </motion.h1>

      <p className="text-gray-500 text-md">
        Smart, social, and Gen Z-ready. Filter by lifestyle and explore cars built for you.
      </p>

      <div className="flex flex-wrap gap-2">
        <Button onClick={() => setFilter("")}>All</Button>
        <Button onClick={() => setFilter("Commuter")}>Commuter</Button>
        <Button onClick={() => setFilter("Adventure")}>Adventure</Button>
        <Button onClick={() => setFilter("Off-Road")}>Off-Road</Button>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((v, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card
              className="rounded-3xl border border-gray-200 shadow-md hover:shadow-xl transition"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-bold">{v.name}</h2>
                  <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                    {v.type}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-1">{v.description}</p>
                <div className="text-yellow-500 flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < Math.round(v.rating) ? "fill-yellow-500" : "fill-none"} />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">{v.rating.toFixed(1)}</span>
                </div>
                <p className="text-xl text-green-600 font-semibold mb-3">{v.price}</p>
                <ul className="text-sm text-gray-700 space-y-1 mb-4">
                  {v.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Sparkles size={16} /> {feature}
                    </li>
                  ))}
                </ul>
                <iframe
                  width="100%"
                  height="180"
                  src={v.video}
                  title="Vehicle Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-xl border"
                ></iframe>
                {hovered === index && (
                  <div className="mt-5 space-y-2">
                    <Button variant="outline" className="w-full" onClick={() => handleAction("estimate", v.name)}>
                      <DollarSign size={18} className="mr-2" /> Estimate Payments
                    </Button>
                    <Button variant="secondary" className="w-full" onClick={() => handleAction("text", v.name)}>
                      <Phone size={18} className="mr-2" /> Text A Buyer
                    </Button>
                    <Button variant="ghost" className="w-full" onClick={() => handleAction("specs", v.name)}>
                      <Info size={18} className="mr-2" /> See More Specs
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => handleAction("wishlist", v.name)}>
                      <ClipboardCheck size={18} className="mr-2" /> Add to Wishlist
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => handleAction("share", v.name)}>
                      <Share2 size={18} className="mr-2" /> Share This Car
                    </Button>
                    <Button variant="default" className="w-full" onClick={() => handleAction("buy", v.name)}>
                      <ShoppingCart size={18} className="mr-2" /> Start Purchase
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
