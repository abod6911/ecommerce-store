import React from "react";
import CourseClientView from "./CourseClientView";

export function generateStaticParams() {
  return [
    { id: "digital-marketing-masterclass" },
    { id: "sales-psychology-mastery" },
    { id: "course-1" },
    { id: "course-2" },
  ];
}

export default function CoursePage({ params }: { params: { id: string } }) {
  return <CourseClientView initialCourseId={params.id} />;
}
