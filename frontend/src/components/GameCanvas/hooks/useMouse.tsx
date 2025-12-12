// import { useEffect, useRef } from "react";


// export default function useMouseRef() {
//   const mouseRef = useRef<MouseRefState>({ x: 0, y: 0, isDown: false });

//   useEffect(() => {
//     const onMove = (e: MouseEvent) => {
//       mouseRef.current.x = e.clientX;
//       mouseRef.current.y = e.clientY;
//     };
//     const onDown = () => (mouseRef.current.isDown = true);
//     const onUp = () => (mouseRef.current.isDown = false);

//     window.addEventListener("mousemove", onMove);
//     window.addEventListener("mousedown", onDown);
//     window.addEventListener("mouseup", onUp);

//     return () => {
//       window.removeEventListener("mousemove", onMove);
//       window.removeEventListener("mousedown", onDown);
//       window.removeEventListener("mouseup", onUp);
//     };
//   }, []);

//   return mouseRef;
// }
