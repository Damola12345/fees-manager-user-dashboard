import { toast } from "react-hot-toast";

export const alertSuccess = (message) => {
  toast.success(message);
}

export const alertError = (message) => {
  toast.error(message);
}

export const alertPromise = (message) => {
  toast.promise(promise, messages);
}
