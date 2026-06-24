import type { Metadata } from "next";
import CourseRegisterAutoOpen from "@/components/CourseRegisterAutoOpen";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Register for Full Course | AL Biology - Mostafa Khalifa",
  description:
    "Register for the AS/A2 Biology Cambridge full course with Mostafa Khalifa.",
};

export default function CourseRegisterPage() {
  return (
    <>
      <CourseRegisterAutoOpen />
      <LandingPage />
    </>
  );
}
