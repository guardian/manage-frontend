import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import Header from "../../components/header";

describe("Header", () => {
  it("renders the header in a signed out state", () => {
    render(<Header signInStatus="signedOut" />);
    expect(screen.getByRole("link", { name: "Sign in" })).toBeInTheDocument();
  });

  it("renders the header in a signed in state", () => {
    render(<Header signInStatus="signedIn" requiresSignIn={true} />);
    expect(
      screen.getByRole("link", { name: "My account" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "My account" })
    ).toBeInTheDocument();
  });
});
