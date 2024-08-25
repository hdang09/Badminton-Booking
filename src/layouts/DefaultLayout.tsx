import { AppShell } from "@mantine/core";
import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import Header from "./components/Header";

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
        <Header />
      </AppShell.Header>
      <AppShell.Navbar p="md" style={{ justifyContent: "space-between" }}>
        <NavBar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
