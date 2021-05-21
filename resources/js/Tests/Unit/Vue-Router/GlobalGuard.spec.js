import rewiremock from "rewiremock/webpack";
import expect from "expect";
import sinon from "sinon";
import { MainBeforeEachFn, CheckVerificationRequirements, CheckAuthRequirements, IsRecaptchaVisible, helperFuncs, LogInPath } from "../../../Routes/GlobalBeforeGuards"
import { NO_AUTH_NEEDED, NO_VERIFICATION_NEEDED } from "../../../Routes/MetaTags";

const authRequirement = "authRequirement";
const verificationRequirement = "verificationRequirement";
const routeCreator = (path = undefined, meta = undefined) => {return { path, meta: meta }};
const toPath = routeCreator("/toPath", {[authRequirement]: NO_AUTH_NEEDED, [verificationRequirement]: NO_VERIFICATION_NEEDED});
const fromPath = routeCreator("/fromPath")

describe("Vue Router Global Before Guards", () => {
  describe("Global Before Each Guard Main Function", () => {
    it("calls check auth requirement function", async () => {
      const checkAuthFn = sinon.stub(helperFuncs, "CheckAuthRequirements").returns(toPath);

      //? Jest Version usage example
      // rewiremock("../../../Routes/GlobalBeforeGuards").callThrough().with({helperFuncs: { CheckAuthRequirements: checkAuthFn }});
      // rewiremock.enable();
      // const globalGuards = require("../../../Routes/GlobalBeforeGuards");
      // await globalGuards.MainBeforeEachFn(toPath, fromPath, ()=>{});
      // sinon.assert.calledOnce(checkAuthFn);
      // rewiremock.disable();

      await MainBeforeEachFn(toPath, fromPath, () => {});
      sinon.assert.calledOnce(checkAuthFn);

      checkAuthFn.restore();
    });
    it("calls check verification requirement function", async () => {
      const checkVerificationFn = sinon.stub(helperFuncs, "CheckVerificationRequirements").returns(toPath);
      
      await MainBeforeEachFn(toPath, fromPath, ()=>{});
      sinon.assert.calledOnce(checkVerificationFn); 

      checkVerificationFn.restore();
    });
    describe("calls next function", () => {
      let nextStub;
      beforeEach(() => {
        nextStub = sinon.spy();
      })

      it("calls next() only once!", async () => {
        await MainBeforeEachFn(toPath, fromPath, nextStub);
        sinon.assert.calledOnceWithExactly(nextStub);
      })
      it("calls next() as normal, without parameters", async () => {
        await MainBeforeEachFn(toPath, fromPath, nextStub);
        sinon.assert.calledOnceWithExactly(nextStub);
      })
      it("calls next() with an altered path", async () => {
        //* Could stub both authFn & verificationFn, but ultimately all that matters is nextPath.path !== toPath.path conditional is tested
        const checkVerificationFn = sinon.stub(helperFuncs, "CheckVerificationRequirements").returns(LogInPath);

        await MainBeforeEachFn(toPath, fromPath, nextStub);
        sinon.assert.calledOnceWithExactly(nextStub, LogInPath);

        checkVerificationFn.restore();
      })
    })
  });
});