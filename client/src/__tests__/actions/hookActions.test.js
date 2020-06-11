import moxios from "moxios";

import { getSecretWord } from "../../actions/hookActions";

describe("moxios tests", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("calls the getSecredWord callback on axios response", async () => {
    const secretWorld = "party";

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWorld,
      });
    });

    const mockSetSecredWord = jest.fn();

    await getSecretWord(mockSetSecredWord);

    expect(mockSetSecredWord).toBeCalledWith(secretWorld);
  });
});
