"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

function AnalyseButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium">
      {pending ? "Analysing" : "Analyse"}
    </Button>
  );
}

export default AnalyseButton;
