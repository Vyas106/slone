import ContentPage from "@/components/ContentPage";

export default function HairTools() {
  const items = [
    { name: "Ionic Sculptor", category: "Dryer", price: "$299.00" },
    { name: "Ceramic Glide", category: "Straightener", price: "$249.00" },
    { name: "Precision Clipper", category: "Trimmer", price: "$189.00" },
    { name: "Infrared Pro", category: "Brush", price: "$95.00" },
  ];

  return (
    <ContentPage 
      title="Hair Tools" 
      description="Advanced technology meets ergonomic design. Our pro-tools are engineered for longevity and professional results at home." 
      items={items}
    />
  );
}
