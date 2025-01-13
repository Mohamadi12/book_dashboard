import { Client as WorkflowClient } from "@upstash/workflow";
import config from "./config";
import { Client as QStashClient, resend } from "@upstash/qstash";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

//La partie personnalisation du email
const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  await qstashClient.publishJSON({
    api: {
      name: "email", //Identifiant par l'IAPI
      provider: resend({ token: config.env.resendToken }),
    },
    body: {
      from: "JS Mastery <contact@adrianjsmastery.com>", //Mon nom et mon email que je veux que ça s'affiche chez le client
      to: [email], //Le email du client
      subject,
      html: message,
    },
  });
};

// email : L'adresse e-mail du destinataire.
// subject : L'objet du message.
// message : Le contenu du message en format HTML.

// body : Le contenu de l'e-mail.
// from : L'adresse de l'expéditeur (nom et e-mail).
// to : Un tableau contenant les adresses e-mail des destinataires.
// subject : L'objet de l'e-mail.
// html : Le contenu de l'e-mail en HTML.
