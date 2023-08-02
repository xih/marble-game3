// import { useEffect } from "react";

// Problem:
// DeviceMotionEvent.requestPermission (request Permission doesn't exist)

// const MobileAccelerometerControls = ({
//   permissionGranted,
//   setPermissionGranted,
// }) => {
//   useEffect(() => {
//     const deviceMotion = new DeviceMotionEvent("function");
//     if (typeof DeviceMotionEvent.requestPermission === "function") {
//       const permissionState = DeviceMotionEvent.requestPermission();

//       if (permissionState === "granted") {
//         setPermissionGranted(true);
//       } else {
//         console.error("error");
//       }
//     }
//     return () => {};
//   });

//   const handlePermissionGranted = () => {
//     let permissionState = DeviceMotionEvent.requestPermission();
//     if (permissionState === "granted") {
//       setPermissionGranted(true);
//       window.location.reload();
//     } else {
//       console.error("error");
//     }
//   };

//   return (
//     <>
//       {permissionGranted ? null : (
//         <div>
//           <div>
//             <h2>allow access to device motion and orientation </h2>
//             <p>
//               this app requires access to device motion and orientation to
//               function properly
//             </p>
//           </div>
//           <button className="btn" onClick={handlePermissionGranted}>
//             Grant Permission
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default MobileAccelerometerControls;
