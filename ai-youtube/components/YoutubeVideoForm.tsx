import Form from "next/form";
import AnalyseButton from "./AnalyseButton";
import { Input } from "./ui/input";
import { analyseYoutubeVideo } from "@/actions/analyseYoutubeVideo";

function YoutubeVideoForm() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Form
        action={analyseYoutubeVideo}
        className="flex flex-col sm:flex-row gap-2 items-center"
      >
        <Input
          name="url"
          type="text"
          placeholder="Enter Youtube URL"
          className="flex-1 w-full px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg"
        />

        <AnalyseButton />
      </Form>
    </div>
  );
}

export default YoutubeVideoForm;
