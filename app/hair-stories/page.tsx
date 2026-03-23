import ContentPage from "@/components/ContentPage";

export default function HairStories() {
  const items = [
    { name: "Identity Series", category: "Film", price: "WATCH" },
    { name: "The Artisans", category: "Interview", price: "READ" },
    { name: "Modern Geometry", category: "Gallery", price: "VIEW" },
    { name: "Before & Flow", category: "Archive", price: "VIEW" },
  ];

  return (
    <ContentPage 
      title="Hair Stories" 
      description="Capturing the journey of self-discovery through hair. Explore our archive of transformations and artist interviews." 
      items={items}
    />
  );
}
