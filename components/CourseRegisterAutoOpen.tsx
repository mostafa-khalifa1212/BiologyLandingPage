"use client";

import { useEffect, useRef } from "react";
import { useCourseRegisterModal } from "@/components/CourseRegisterModal";

type CourseRegisterAutoOpenProps = {
  enabled?: boolean;
};

export default function CourseRegisterAutoOpen({
  enabled = true,
}: CourseRegisterAutoOpenProps) {
  const { openCourseRegister } = useCourseRegisterModal();
  const hasOpened = useRef(false);

  useEffect(() => {
    if (enabled && !hasOpened.current) {
      hasOpened.current = true;
      const timer = setTimeout(() => openCourseRegister(), 300);
      return () => clearTimeout(timer);
    }
  }, [enabled, openCourseRegister]);

  return null;
}
