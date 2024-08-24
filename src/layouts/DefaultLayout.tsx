import { AppShell } from "@mantine/core";
import { Outlet } from "react-router";
import NavBar from "./components/NavBar";

export default function DefaultLayout() {
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
      padding="md"
    >
      <AppShell.Header>
        <div>Logo</div>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavBar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
