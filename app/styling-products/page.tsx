import ContentPage from "@/components/ContentPage";

export default function StylingProducts() {
  const items = [
    { name: "Raw Texture Clay", category: "Finish", price: "₹3,486" },
    { name: "Hydrating Mist", category: "Prep", price: "₹3,154" },
    { name: "Volume Serum", category: "Style", price: "₹3,735" },
    { name: "Satin Pomade", category: "Finish", price: "₹3,320" },
  ];

  return (
    <ContentPage 
      title="Styling Products" 
      description="Professional-grade formulations for sculpting, defining, and protecting your hair. All products are organic and sustainably sourced." 
      items={items}
    />
  );
}
