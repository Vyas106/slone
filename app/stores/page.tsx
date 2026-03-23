import ContentPage from "@/components/ContentPage";

export default function Stores() {
  const items = [
    { name: "Flagship Studio", category: "Downtown", price: "OPEN" },
    { name: "The Lab", category: "Jubilee Hills", price: "APPOINTMENT ONLY" },
    { name: "Slone Concept", category: "West Side", price: "OPEN" },
    { name: "Boutique Corner", category: "Airport", price: "CLOSED" },
  ];

  return (
    <ContentPage 
      title="Stores" 
      description="Visit our physical locations to experience the Slone atmosphere. Our studios are designed for transformation." 
      items={items}
    />
  );
}
