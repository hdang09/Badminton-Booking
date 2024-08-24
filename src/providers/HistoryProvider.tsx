import myHistory from "@/libs/history";
import { HistoryRouter } from "@/routes/HistoryRouter";

export default function HistoryProvider({ children }: { children: React.ReactNode }) {
  return <HistoryRouter history={myHistory}>{children}</HistoryRouter>;
}
