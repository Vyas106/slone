import ContentPage from "@/components/ContentPage";

export default function Kits() {
  const items = [
    { name: "Full Ritual Kit", category: "Set", price: "$120.00" },
    { name: "Traveler Essentials", category: "Mini", price: "$55.00" },
    { name: "Color Care Duet", category: "Treatment", price: "$75.00" },
    { name: "Sculpting Trio", category: "Styling", price: "$95.00" },
  ];

  return (
    <ContentPage 
      title="Kits" 
      description="Curated collections designed for specific hair needs. The perfect introduction to the Slone ecosystem." 
      items={items}
    />
  );
}
