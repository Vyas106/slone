import ContentPage from "@/components/ContentPage";

export default function HairTools() {
  const items = [
    { name: "Ionic Sculptor", category: "Dryer", price: "₹24,817" },
    { name: "Ceramic Glide", category: "Straightener", price: "₹20,667" },
    { name: "Precision Clipper", category: "Trimmer", price: "₹15,687" },
    { name: "Infrared Pro", category: "Brush", price: "₹7,885" },
  ];

  return (
    <ContentPage 
      title="Hair Tools" 
      description="Advanced technology meets ergonomic design. Our pro-tools are engineered for longevity and professional results at home." 
      items={items}
    />
  );
}
