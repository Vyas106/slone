import ContentPage from "@/components/ContentPage";

export default function Kits() {
  const items = [
    { name: "Full Ritual Kit", category: "Set", price: "₹9,999" },
    { name: "Traveler Essentials", category: "Mini", price: "₹4,565" },
    { name: "Color Care Duet", category: "Treatment", price: "₹6,225" },
    { name: "Sculpting Trio", category: "Styling", price: "₹7,885" },
  ];

  return (
    <ContentPage 
      title="Kits" 
      description="Curated collections designed for specific hair needs. The perfect introduction to the Styloria ecosystem." 
      items={items}
    />
  );
}
