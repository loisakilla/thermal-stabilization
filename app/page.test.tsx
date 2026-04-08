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

    expect(screen.getByRole("heading", { name: /о продукте/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /модификации системы/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /области применения/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /технические характеристики/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /контакты/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /поддержка проекта/i })).toBeInTheDocument();
  });
});
