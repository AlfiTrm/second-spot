import { Realtime } from "ably";
import { useUser } from "@clerk/clerk-react";

const useAblyClient = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const AblyClient = new Realtime({
    key: import.meta.env.VITE_ABLY_API_KEY,
    clientId: user.id,
  });
  console.log(import.meta.env.VITE_ABLY_API_KEY)

  AblyClient.connection.on("connected", () => {
    console.log("Ably Connected");
  });

  return AblyClient;
};

export default useAblyClient;
