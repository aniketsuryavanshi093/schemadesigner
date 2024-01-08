import { tablecolors } from "@/Constants";

export const getRandomColor = (usedcolors: string[]): string | undefined => {
    const availableColors = tablecolors.filter(color => !usedcolors.includes(color));
  
    if (availableColors.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableColors.length);
      return availableColors[randomIndex];
    }
  
    // Return undefined if no available colors are left
    return undefined;
  };