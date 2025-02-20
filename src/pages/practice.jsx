// import { NumberSquareOne } from "phosphor-react";
// import React, { useEffect, useState } from "react";

// // Masz do dyspozycji mockowe API,
// // które symuluje pobieranie i usuwanie użytkowników z listy.
// //  Twoim zadaniem jest stworzenie komponentu funkcyjnego w React,
// //  który wykorzysta to API do wyświetlenia listy użytkowników oraz umożliwi ich usuwanie.

// let mockData = {
//   users: [
//     { id: 1, name: "Jan Kowalski", age: 30 },
//     { id: 2, name: "Anna Nowak", age: 25 },
//   ],
//   success: true,
// };

// //try async await

// function mockApiFetch() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(mockData);
//     }, 2000); // Symulacja opóźnienia
//   });
// }

// function deleteUserById(userId) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const index = mockData.users.findIndex((user) => user.id === userId);
//       if (index !== -1) {
//         mockData.users.splice(index, 1);
//         console.log("usunie  y", userId);
//         resolve({ success: true, message: "Użytkownik został usunięty." });
//       } else {
//         reject(new Error("Nie znaleziono użytkownika o podanym ID."));
//       }
//     }, 2000); // Symulacja opóźnienia
//   });
// }

// export const Practise = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const get = async () => {
//       try {
//         const response = await mockApiFetch();
//         console.log(response);
//         setData(response.users);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     get();
//   }, []);

//   const handleDelete = async (id) => { //2
//     const res = await deleteUserById(id);
//     if (res.success) {
//             setData((prevItems) => prevItems.filter(item => item.id !== id));
//     }

//   }

//   return (
//     <div className="cart">
//       {data.map((user) => (
//         <p>
//           {user.name}{" "}
//           <button onClick={() => handleDelete(user.id)}>Delete</button>
//         </p>
//       ))}
//     </div>
//   );
// };
