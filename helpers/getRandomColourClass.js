export default function getRandomColourClass(classesArray) {

  const randomIndex = Math.floor(Math.random() * classesArray.length);
    return classesArray[randomIndex];
  }

 // const og = ["blue-300", "red-50", "pink-400", "yellow-100", "red-100", "green-100"];
export const random50 = ["bg-blue-50", "bg-red-50", "bg-pink-50", "bg-yellow-50", "bg-green-50", "bg-purple-50", "bg-indigo-50", "bg-gray-50"];
export const random100 = ["bg-blue-100", "bg-red-100", "bg-pink-100", "bg-yellow-100", "bg-green-100", "bg-purple-100", "bg-indigo-100", "bg-gray-100"];
export const random300 = ["bg-blue-300", "bg-red-300", "bg-pink-300", "bg-yellow-300", "bg-green-300", "bg-purple-300", "bg-indigo-300", "bg-gray-300"];
export const random400 = ["bg-blue-400", "bg-red-400", "bg-pink-400", "bg-yellow-400", "bg-green-400", "bg-purple-400", "bg-indigo-400", "bg-gray-400"];  
