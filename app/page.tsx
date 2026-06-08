
import { AppShell } from "@/app-shell";
import { AppStateProvider } from "@/app-shell/context";

export default function Home() {
  return <AppStateProvider>
      <AppShell/>
    </AppStateProvider>
}
