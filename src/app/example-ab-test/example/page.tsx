import { cookies } from "next/headers";
import { AB_COOKIE_NAME } from "../../utils";

export default async function Page() {
  const cookieStore = await cookies();
  const abGroup = cookieStore.get(AB_COOKIE_NAME)?.value as "A" | "B" | undefined;
  const group = abGroup || "A";

  return (
    <div className="container">
      <div className="text-center py-8 mb-8">
        <div className="text-xs text-muted mb-4">
          Você foi atribuído ao:
        </div>

        <div className="text-sm text-muted">
          {group === "A"
            ? "Você está no grupo A"
            : "Você está no grupo B"}
        </div>
      </div>
    </div>
  );
}
