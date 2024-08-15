import { auth } from "@/auth";

export default async function () {
  const session = await auth();
  return (
    <div className="mx-auto max-w-242.5">
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
}
