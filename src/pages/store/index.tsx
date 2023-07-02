import Store from "@/components/store/store";
import withAuth from "@/components/wrapper";

function StorePage() {
  return (
    <Store />
  );
}

export default withAuth(StorePage)