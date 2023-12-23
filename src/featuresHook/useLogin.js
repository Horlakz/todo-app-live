import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { login as loginapi } from "../services/apiAuth";
import { AuthService } from "../services/auth";
import { Storage } from "../utilities/storage";
import { ACCESS_TOKEN_KEY } from "../constants/auth";

const auth = new AuthService();
const storage = new Storage();

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading: isLoggingIn, mutate: login } = useMutation({
    mutationFn: ({ username, password }) => loginapi({ username, password }),
    onSuccess: (data) => {
      toast.success("Successfully Logged In");
      storage.setItem(ACCESS_TOKEN_KEY, data.token);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { isLoggingIn, login };
}
