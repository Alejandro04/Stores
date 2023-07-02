import FormCreateStoreComponent from "@/components/store/formCreate";
import withAuth from "@/components/wrapper";

function CreateStorePage() {
  return (
    <FormCreateStoreComponent />
  );
}

export default withAuth(CreateStorePage)
