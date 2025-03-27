import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const imageUpdates = [
    {
      id: "6b8facf0-e47f-4aca-a690-a971243954c2", 
      imageUrl: "https://res.cloudinary.com/your-cloud-name/image/upload/v1712345678/flower1.jpg",
    },
    {
      id: "6d7b8bf0-3170-46ce-b10f-7192605e60f6",
      imageUrl: "https://res.cloudinary.com/your-cloud-name/image/upload/v1712345679/flower2.jpg",
    },
    {
      id: "f9c3a291-14a9-4b0a-9418-5aaa2c4bb4fb",
      imageUrl: "https://res.cloudinary.com/your-cloud-name/image/upload/v1712345680/flower3.jpg",
    },
  ];

  async function restoreImages() {
    try {
      for (const { id, imageUrl } of imageUpdates) {
        const updatedFlower = await prisma.flowerItems.update({
          where: { id },
          data: { imageUrl },
        });
        console.log(`✅ Updated: ${updatedFlower.id} -> ${updatedFlower.imageUrl}`);
      }
      console.log("🎉 All images restored!");
    } catch (error) {
      console.error("❌ Error updating images:", error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  // Run the function
  restoreImages();