import { createNewDaigramaction } from "@/actions/SchemaActions";
import CustomModal from "@/components/Modals/CustomModal";
import enqueSnackBar from "@/utils/enqueSnackBar";
import { newdaigramvalidation } from "@/utils/validations/validation";
import { Button } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React, { useTransition } from "react";
import { Spinner } from "reactstrap";

const CreateNewDaigramModal: React.FC<{
  isOpen: boolean;
  setIsopen: (boolean: boolean) => void;
}> = ({ isOpen, setIsopen }) => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const handleServerAction = async (value: { title: string }) => {
    try {
      const data = await createNewDaigramaction({
        title: value.title,
      });
      setIsopen(false);
      queryClient.invalidateQueries({ queryKey: ["userSchemas"] });
      enqueSnackBar({
        type: "success",
        message: "Schema Create Successfully!",
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <CustomModal
      size="md"
      isOpen={isOpen}
      title="New Daigram"
      onClose={() => setIsopen(false)}
    >
      <Formik
        initialValues={{
          title: "",
        }}
        validationSchema={newdaigramvalidation}
        onSubmit={(value) => {
          startTransition(() => handleServerAction(value));
        }}
      >
        {({ values, errors, handleChange }) => (
          <Form className="wrapper m-3 flex-column">
            <div className="w-full">
              <label
                className="block font-semibold text-sm text-gray-700"
                htmlFor="name"
              >
                <span>Diagram name</span>
              </label>
              <input
                className="createinput max-w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-gray-300 mt-1 block w-full disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200"
                id="name"
                type="text"
                name="title"
                onChange={handleChange}
                value={values.title}
              ></input>
            </div>
            <Button type="submit" className="mt-3 rounded-md newdaigrambtn">
              {isPending ? <Spinner size="sm" /> : "Create Schema"}
            </Button>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default CreateNewDaigramModal;
