import { PrismaClient } from '@prisma/client';


// Approch1
// Declaration to prevent TypeScript errors when referencing `prisma` on the global object.
declare global {
    var prisma: PrismaClient | undefined;
}

 // Use the existing `prisma` instance if it exists in the global scope, 
 // or create a new instance of `PrismaClient` if it doesn't.
const db = globalThis.prisma || new PrismaClient();

// During development, save the Prisma Client instance to the global object 
// to reuse it in case of hot reloads (only when `NODE_ENV !== 'production'`).
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = db;
}

export default db;


console.log(globalThis); // Accesses the global object in the current environment
console.log(global); // Accesses the global object in Node.js




// Approch2
// //For large application
// class PrismaSingleton {
//     private static instance: PrismaClient;
  
//     private constructor() {}
  
//     public static getInstance(): PrismaClient {
//       if (!PrismaSingleton.instance) {
//         PrismaSingleton.instance = new PrismaClient();
//       }
//       return PrismaSingleton.instance;
//     }
//   }
  
//   export default PrismaSingleton.getInstance();


// Approch3
// Use this for next js
// // Declaration to prevent TypeScript errors when referencing `prisma` on the global object.
// declare global {
//     let prisma: PrismaClient | undefined;
// }

// // Use the existing `prisma` instance if it exists in the global scope, 
// // or create a new instance of `PrismaClient` if it doesn't.
// const prisma = global.prisma || new PrismaClient();

// // During development, save the Prisma Client instance to the global object 
// // to reuse it in case of hot reloads (only when `NODE_ENV !== 'production'`).
// if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

// export default prisma;



// // Approch4
// declare global {
//     let prisma: PrismaClient | undefined;
// }

// // let prisma: PrismaClient;

// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient();
// } else {
//   if (!globalThis.prisma) {
//     globalThis.prisma = new PrismaClient();
//   }
//   prisma = globalThis.prisma;
// }

// export default prisma;



// for small application
// import { PrismaClient } from '@prisma/client';

// let prisma: PrismaClient;

// if (!prisma) {
//   prisma = new PrismaClient();
// }

// export default prisma;