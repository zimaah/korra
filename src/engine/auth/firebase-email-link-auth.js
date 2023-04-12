import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { app } from "../persistence/firebase";

const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://korraaa-qa.web.app/',
    // This must be true.
    handleCodeInApp: true,
};

export function getAuthorizedUser(callback) {
    getAuth(app).onAuthStateChanged((user) => {
        console.log(`getAuthorizedUser()`, user);
        callback && callback(user)
    });
}

export function sendEmailLink(email) {
    const auth = getAuth(app);
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then((val) => {
        console.log(val);
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', email);
        console.log(`Email sent to ${email}!`);
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(error);
    });
}

export function signInEmailLink() {
    const auth = getAuth(app);
    let promise = false;
    const userAuth = JSON.parse(localStorage.getItem("userAuth"))

    if (isSignInWithEmailLink(auth, window.location.href) && !userAuth) {
        // Additional state parameters can also be passed via URL.
        // This can be used to continue the user's intended action before triggering
        // the sign-in operation.
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
            // User opened the link on a different device. To prevent session fixation
            // attacks, ask the user to provide the associated email again. For example:
            email = window.prompt('Please provide your email for confirmation');
        }
        // The client SDK will parse the code from the link for you.
        promise = signInWithEmailLink(auth, email, window.location.href)
    }

    return promise;
}

export function reAuthenticate(email) {

    // Construct the email link credential from the current URL.
    const credential = EmailAuthProvider.credentialWithLink(email, window.location.href);

    // Re-authenticate the user with this credential.
    const auth = getAuth(app);
    auth.onAuthStateChanged((currentUser) => {
        console.log(currentUser, credential);
        reauthenticateWithCredential(currentUser, credential)
            .then((usercred) => {
                console.log(usercred)
            })
            .catch((error) => {
                console.error(error)
            });
    })
}

export function signOut() {
    return getAuth(app).signOut()
}