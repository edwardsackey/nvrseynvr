import { redirect } from "next/navigation";

/** Payment used to live on its own screen; it is part of /checkout now. */
export default function PaymentRedirect() {
  redirect("/checkout");
}
