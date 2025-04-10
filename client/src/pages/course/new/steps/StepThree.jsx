import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import DescriptionTextEditor from "../../../../components/DescriptionTextEditor";

const StepThree = () => {
  const { setCourseFormData, setIsNextBtnEnabled } = useOutletContext();

  useEffect(() => {
    setIsNextBtnEnabled(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-10 md:gap-20 md:pt-16">

      <div className='space-y-4 text-center md:space-y-8'>
        <h1 className="text-2xl font-bold text-gray-200 sm:text-3xl md:text-4xl">How about a working description?</h1>
        <p className="text-gray-400">It's ok if you can't think of a good title now. You can change it later.</p>
      </div>

      <DescriptionTextEditor
        setCourseFormData={setCourseFormData}
      />
    </div>
  );
};

export default StepThree;
