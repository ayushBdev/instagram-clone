import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const success = (val) => {
    toast.success(
        val, {
        position: "top-right",
        autoClose: 2500,
        pauseOnHover: false,
        draggable: false,
    });
};

export const warning = (val) => {
    toast.warn(
        val, {
        position: "top-right",
        autoClose: 2500,
        pauseOnHover: false,
        draggable: false,
    });
};

export const danger = (val) => {
    toast.error(
        val, {
        position: "top-right",
        autoClose: 2500,
        pauseOnHover: false,
        draggable: false,
    });
};