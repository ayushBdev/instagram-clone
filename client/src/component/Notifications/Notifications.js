import { store } from 'react-notifications-component';

export const posted = () => {
    store.addNotification({
        title: "",
        message: "Room deleted Successfully",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 1000,
          onScreen: true
        }
      });
};

export const Logouts = () => {
  store.addNotification({
      title: "",
      message: "Logged Out Successfully",
      type: "warning",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 1000,
        onScreen: true
      }
    });
};

export const wrongPassword = () => {
  store.addNotification({
      title: "",
      message: "Password Mismatch",
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 1000,
        onScreen: true
      }
    });
};

export const success = (name) => {
  store.addNotification({
      title: "SignUp Successful",
      message: `Welcome ${name}`,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 1500,
        onScreen: true
      }
    });
};