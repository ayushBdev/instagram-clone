import Pusher from "pusher-js";

const pusher = new Pusher("ac77301acf671fd5c19d", {
    cluster: "ap2"
});

export default pusher;