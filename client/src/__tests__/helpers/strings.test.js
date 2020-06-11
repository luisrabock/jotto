import stringsModule from "../../helpers/strings";

const { getStringByLanguage } = stringsModule;

const strings = {
  en: { submit: "submit" },
  emoji: { submit: "🚀" },
  mermish: {},
};

describe("language string tests", () => {
  const mockWarn = jest.fn();
  let originalWar;
  beforeEach(() => {
    originalWar = console.warn;
    console.warn = mockWarn;
  });
  afterEach(() => {
    console.warn = originalWar;
  });
  it("returns correct submit string for english", () => {
    const string = getStringByLanguage("en", "submit", strings);
    expect(string).toBe("submit");
    expect(mockWarn).not.toHaveBeenCalled();
  });
  it("returns correct submit string for emoji", () => {
    const string = getStringByLanguage("emoji", "submit", strings);
    expect(string).toBe("🚀");
    expect(mockWarn).not.toHaveBeenCalled();
  });
  it("returns english submit string when language does not exist", () => {
    const string = getStringByLanguage("notAlanguage", "submit", strings);
    expect(string).toBe("submit");
    expect(mockWarn).toHaveBeenCalledWith(
      "Could not get a string [submit] for language [notAlanguage]"
    );
  });
  it("returns english submit string when submit key does not exists for language", () => {
    const string = getStringByLanguage("mermish", "submit", strings);
    expect(string).toBe("submit");
    expect(mockWarn).toHaveBeenCalledWith(
      "Could not get a string [submit] for language [mermish]"
    );
  });
});
