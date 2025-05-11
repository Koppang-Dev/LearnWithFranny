import { redirect } from "next/navigation";

// Rendering the first tab
export default function ProfileRedirect() {
  redirect("/profile/General");
}
