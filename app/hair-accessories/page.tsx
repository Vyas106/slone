import ContentPage from "@/components/ContentPage";

export default function HairAccessories() {
  const items = [
    { name: "Silk Scrunchie", category: "Care", price: "$22.00" },
    { name: "Matte Claw Clip", category: "Style", price: "$28.00" },
    { name: "Minimalist Pins", category: "Detail", price: "$15.00" },
    { name: "Leather Wrap", category: "Luxury", price: "$65.00" },
  ];

  return (
    <ContentPage 
      title="Hair Accessories" 
      description="Refined details for the modern individual. Elevate your everyday style with our curated collection of hair hardware." 
      items={items}
    />
  );
}
