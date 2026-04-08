import { render, screen, within } from "@testing-library/react";

import Home from "./page";
import { MANDATORY_SUPPORT_TEXT, complianceBlock } from "@/content/project-content";

describe("Landing compliance", () => {
  it("renders exact mandatory support text on the main page", () => {
    render(<Home />);

    expect(screen.getByText(MANDATORY_SUPPORT_TEXT)).toBeInTheDocument();
  });

  it("renders both required logos in support block", () => {
    render(<Home />);

    const supportBlock = screen.getByTestId("support-block");

    for (const logo of complianceBlock.logos) {
      expect(within(supportBlock).getByAltText(logo.title)).toBeInTheDocument();
    }
  });

  it("renders all required landing sections", () => {
    render(<Home />);

    expect(document.querySelector("#about")).toBeInTheDocument();
    expect(document.querySelector("#prototype")).toBeInTheDocument();
    expect(document.querySelector("#applications")).toBeInTheDocument();
    expect(document.querySelector("#specs")).toBeInTheDocument();
    expect(document.querySelector("#contacts")).toBeInTheDocument();
    expect(document.querySelector("#support")).toBeInTheDocument();
  });
});
