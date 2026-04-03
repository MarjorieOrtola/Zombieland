import { describe, it } from "node:test";
import assert from "node:assert";
import { validateUser } from "../middlewares/auth.middleware.js";

// --- Helpers pour simuler req/res/next Express ---
function makeReq(body) {
  return { body };
}

function makeRes() {
  const res = {};
  let lastStatus = null;
  let lastJson = null;

  res.status = (code) => {
    lastStatus = code;
    return res;
  };
  res.json = (data) => {
    lastJson = data;
    return res;
  };
  res.getStatus = () => lastStatus;
  res.getJson = () => lastJson;

  return res;
}

function makeNext() {
  let called = false;
  const next = () => {
    called = true;
  };
  next.wasCalled = () => called;
  return next;
}

// --- Body valide de base (réutilisé dans plusieurs tests) ---
const validBody = {
  first_name: "Thomas",
  last_name: "Dupont",
  mail: "thomas.dupont@email.com",
  password: "motdepasse1234",
};

// ============================================================
// Tests : validateUser
// ============================================================
describe("validateUser()", () => {
  // --- Cas valide ---
  describe("Body valide", () => {
    it("appelle next() si le body est complet et valide", () => {
      const req = makeReq(validBody);
      const res = makeRes();
      const next = makeNext();

      validateUser(req, res, next);

      assert.equal(next.wasCalled(), true);
    });

    it("appelle next() avec les champs optionnels remplis", () => {
      const req = makeReq({
        ...validBody,
        phone_number: "0612345678",
        city: "",
        address: "12 rue des Zombies",
        postcode: "31000",
      });
      const res = makeRes();
      const next = makeNext();

      validateUser(req, res, next);

      assert.equal(next.wasCalled(), true);
    });

    it("appelle next() si les champs optionnels sont vides", () => {
      const req = makeReq({
        ...validBody,
        phone_number: "",
        city: "",
        address: "",
        postcode: "",
      });
      const res = makeRes();
      const next = makeNext();

      validateUser(req, res, next);

      assert.equal(next.wasCalled(), true);
    });
  });

  // --- Prénom ---
  describe("Validation du prénom (first_name)", () => {
    it("retourne 400 si le prénom est absent", () => {
      const { first_name, ...bodyWithout } = validBody;
      const req = makeReq(bodyWithout);
      const res = makeRes();
      const next = makeNext();

      validateUser(req, res, next);

      assert.equal(res.getStatus(), 400);
      assert.equal(next.wasCalled(), false);
    });

    it("retourne 400 si le prénom est trop court (moins de 3 caractères)", () => {
      const req = makeReq({ ...validBody, first_name: "Al" });
      const res = makeRes();
      const next = makeNext();

      validateUser(req, res, next);

      assert.equal(res.getStatus(), 400);
    });

    it("retourne 400 si le prénom dépasse 30 caractères", () => {
      const req = makeReq({ ...validBody, first_name: "A".repeat(31) });
      const res = makeRes();
      const next = makeNext();

      validateUser(req, res, next);

      assert.equal(res.getStatus(), 400);
    });
  });

  // --- Nom ---
  describe("Validation du nom (last_name)", () => {
    it("retourne 400 si le nom est absent", () => {
      const { last_name, ...bodyWithout } = validBody;
      const req = makeReq(bodyWithout);
      const res = makeRes();
      const next = makeNext();

      validateUser(req, res, next);

      assert.equal(res.getStatus(), 400);
    });

    it("retourne 400 si le nom est trop court", () => {
      const req = makeReq({ ...validBody, last_name: "Du" });
      const res = makeRes();
      const next = makeNext();

      validateUser(req, res, next);

      assert.equal(res.getStatus(), 400);
    });
  });

  // --- Email ---
  describe("Validation de l'email (mail)", () => {
    it("retourne 400 si l'email est absent", () => {
      const { mail, ...bodyWithout } = validBody;
      const req = makeReq(bodyWithout);
      const res = makeRes();
      const next = makeNext();

      validateUser(req, res, next);

      assert.equal(res.getStatus(), 400);
    });

    it("retourne 400 si l'email est invalide (sans @)", () => {
      const req = makeReq({ ...validBody, mail: "pasunemail.com" });
      const res = makeRes();
      const next = makeNext();

      validateUser(req, res, next);

      assert.equal(res.getStatus(), 400);
    });

    it("retourne 400 si l'email est invalide (sans domaine)", () => {
      const req = makeReq({ ...validBody, mail: "thomas@" });
      const res = makeRes();
      const next = makeNext();

      validateUser(req, res, next);

      assert.equal(res.getStatus(), 400);
    });
  });

  // --- Mot de passe ---
  describe("Validation du mot de passe (password)", () => {
    it("retourne 400 si le mot de passe est absent", () => {
      const { password, ...bodyWithout } = validBody;
      const req = makeReq(bodyWithout);
      const res = makeRes();
      const next = makeNext();

      validateUser(req, res, next);

      assert.equal(res.getStatus(), 400);
    });

    it("retourne 400 si le mot de passe fait moins de 12 caractères", () => {
      const req = makeReq({ ...validBody, password: "trop_court" });
      const res = makeRes();
      const next = makeNext();

      validateUser(req, res, next);

      assert.equal(res.getStatus(), 400);
    });

    it("retourne 400 si le mot de passe dépasse 100 caractères", () => {
      const req = makeReq({ ...validBody, password: "A".repeat(101) });
      const res = makeRes();
      const next = makeNext();

      validateUser(req, res, next);

      assert.equal(res.getStatus(), 400);
    });
  });

  // --- Téléphone ---
  describe("Validation du téléphone (phone_number)", () => {
    it("retourne 400 si le téléphone contient des lettres", () => {
      const req = makeReq({ ...validBody, phone_number: "abcdefghij" });
      const res = makeRes();
      const next = makeNext();

      validateUser(req, res, next);

      assert.equal(res.getStatus(), 400);
    });

    it("retourne 400 si le téléphone contient moins de 10 chiffres", () => {
      const req = makeReq({ ...validBody, phone_number: "061234" });
      const res = makeRes();
      const next = makeNext();

      validateUser(req, res, next);

      assert.equal(res.getStatus(), 400);
    });

    it("appelle next() si le téléphone est vide (champ optionnel)", () => {
      const req = makeReq({ ...validBody, phone_number: "" });
      const res = makeRes();
      const next = makeNext();

      validateUser(req, res, next);

      assert.equal(next.wasCalled(), true);
    });
  });

  // --- Messages d'erreur ---
  describe("Messages d'erreur", () => {
    it("retourne le bon message si le prénom est absent", () => {
      const { first_name, ...bodyWithout } = validBody;
      const req = makeReq(bodyWithout);
      const res = makeRes();
      const next = makeNext();

      validateUser(req, res, next);

      const messages = res.getJson().message;
      assert.ok(messages.includes("Le prénom est obligatoire"));
    });

    it("retourne le bon message si l'email est invalide", () => {
      const req = makeReq({ ...validBody, mail: "pasunemail" });
      const res = makeRes();
      const next = makeNext();

      validateUser(req, res, next);

      const messages = res.getJson().message;
      assert.ok(messages.includes("L'email n'est pas valide"));
    });

    it("retourne plusieurs messages si plusieurs champs sont invalides", () => {
      const req = makeReq({
        first_name: "Al",
        last_name: "Du",
        mail: "pasunemail",
        password: "court",
      });
      const res = makeRes();
      const next = makeNext();

      validateUser(req, res, next);

      const messages = res.getJson().message;
      assert.ok(messages.length > 1);
    });
  });
});
