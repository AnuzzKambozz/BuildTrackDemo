import { ExceptionMdl } from "../models/common";
// import { useAuth } from '@/app/context/AuthContext';



// export const apiExceptionHandler = (exception: ExceptionMdl) => {
//     // const { logout } = useAuth();
//     alert(alertMessage(exception));


// };

export const apiExceptionHandler = (exception: ExceptionMdl) => {
    // const { logout } = useAuth();
     if (exception?.code === 120) {
        // alert(alertMessage(exception));
        localStorage.removeItem("authToken");
        localStorage.removeItem("userProfile");
        localStorage.removeItem("subscription");
        window.location.href = "/"; // Redirects user to login
     } else {
        alert(alertMessage(exception));
  }

};

export const UNAUTHORIZED_ERROR={
    code: 120,
    message:"Unauthorized Access",
    description: "Unauthorized access: Invalid or missing token."
}





function alertMessage(exception: ExceptionMdl) {
    // try {
    //   // Try to parse the input as JSON
    //   const parsedKey = JSON.parse(exception.description);
  
    //   // If parsing succeeds and the result is an array
    //   if (Array.isArray(parsedKey)) {
    //     return parsedKey.join(", ");
    //   }
    // } catch (e) {
    //   // If parsing fails, it's likely a normal string
    //   // Just return the original input
    // }
  
    // Return the input directly if it's not a JSON string
    // return exception.description;

    return JSON.stringify(exception?.description, null, 2)
  }
  