import { signInEmailLink } from "./firebase-email-link-auth";

/**
 * Checks if login is successful and then triggers the modal (success/error) accordingly.
 */
export function checksIfLoginSuccessful(props) {
    const signPromise = signInEmailLink()
    console.log(`signPromise`, signPromise)
    if (signPromise) {
        signPromise.then((result) => {
            // Clear email from storage.
            window.localStorage.removeItem('emailForSignIn');

            // You can access the new user via result.user
            // Additional user info profile not available via:
            // result.additionalUserInfo.profile == null
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser
            console.log(`result.user`, result.user);

            props.setShowLoginSuccessfulModal(true)
            localStorage.setItem("userAuth", true)
        })
        .catch((error) => {
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
            console.error(error)
            props.setShowLoginErrorModal(true)
        });
        // already logged in, just redirect to app
    }
}