import ContentPage from "@/components/ContentPage";

export default function StylingProducts() {
  const items = [
    { name: "Raw Texture Clay", category: "Finish", price: "$42.00" },
    { name: "Hydrating Mist", category: "Prep", price: "$38.00" },
    { name: "Volume Serum", category: "Style", price: "$45.00" },
    { name: "Satin Pomade", category: "Finish", price: "$40.00" },
  ];

  return (
    <ContentPage 
      title="Styling Products" 
      description="Professional-grade formulations for sculpting, defining, and protecting your hair. All products are organic and sustainably sourced." 
      items={items}
    />
  );
}
