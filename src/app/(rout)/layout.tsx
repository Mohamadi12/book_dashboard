import Header from "@/components/Header";
import { auth } from "../auth";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const Layout = async({ children }: Props) => {
  const session = await auth()

  if(!session) redirect('/sign-in')

  return (
    <main className="root-container">
      <div className="mx-auto mx-w-7xl">
        <Header session={session}/>
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
