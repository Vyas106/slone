import ContentPage from "@/components/ContentPage";

export default function HairAccessories() {
  const items = [
    { name: "Silk Scrunchie", category: "Care", price: "₹1,826" },
    { name: "Matte Claw Clip", category: "Style", price: "₹2,324" },
    { name: "Minimalist Pins", category: "Detail", price: "₹1,200" },
    { name: "Leather Wrap", category: "Luxury", price: "₹5,395" },
  ];

  return (
    <ContentPage 
      title="Hair Accessories" 
      description="Refined details for the modern individual. Elevate your everyday style with our curated collection of hair hardware." 
      items={items}
    />
  );
}
