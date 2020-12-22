var nodemailer = require("nodemailer");
const axios = require("axios");

exports.sendMessage = async (req, api, user) => {
  console.log("MESSAGE");
  console.log(api);

  //Build Text
  var text = "";
  var html = "";

  for (var i = 0; i < req.length; i++) {
    var d = new Date(req[i].notification.layoutParameters.eventDate);
    var datestring =
      d.getDate() +
      "-" +
      (d.getMonth() + 1) +
      "-" +
      d.getFullYear() +
      " " +
      d.getHours() +
      ":" +
      d.getMinutes();
    if (req[i].notification.type == "event" && req[i].reason == "location") {
      text +=
        `Die Aktion ` +
        req[i].notification.layoutParameters.eventName +
        ` wurde in deiner Region hinzugefügt. 
        Sie findet am ` +
        datestring +
        ` in ` +
        req[i].notification.layoutParameters.eventCity +
        ` statt.
        
        `;

      html +=
        `<p>
            Die Aktion <b>` +
        req[i].notification.layoutParameters.eventName +
        `</b> wurde in deiner Region
            hinzugefügt. Sie findet am <b>` +
        datestring +
        `</b> in
            <b>` +
        req[i].notification.layoutParameters.eventCity +
        ` </b>statt.
          </p>`;
    }
    if (req[i].notification.type == "event" && req[i].reason == "Interest") {
      text +=
        `Neue Aktion ` +
        req[i].notification.layoutParameters.eventName +
        ` in deiner Crew. Sie findet am ` +
        datestring +
        ` statt.
        
        `;
      html +=
        `<p>
            Neue Aktion <b>` +
        req[i].notification.layoutParameters.eventName +
        `</b> in deiner Crew. Sie findet am <b>` +
        datestring +
        ` </b>statt.
          </p>`;
    }
    if (req[i].notification.type == "application" && req[i].reason == "own") {
      text +=
        `Deine Bewerbung zum Event` +
        req[i].notification.layoutParameters.poolEventName +
        ` wurde geprüft. Der neue Status ist ` +
        req[i].notification.layoutParameters.applicationState +
        `
        
        `;
      html +=
        `<p>
              Deine Bewerbung zum Event
              <b>` +
        req[i].notification.layoutParameters.poolEventName +
        `</b> wurde geprüft. Der neue Status
              ist <b>` +
        req[i].notification.layoutParameters.applicationState +
        `</b>
            </p>`;
    }
    if (req[i].notification.type == "comment" && req[i].reason == "invested") {
      text +=
        req[i].notification.layoutParameters.userName +
        ` hat einen neuen Kommentar geschrieben in folgenden Event, dass du beobachtest:` +
        req[i].notification.layoutParameters.poolEventName +
        `
        
        `;
      html +=
        `  <p>
            <b>` +
        req[i].notification.layoutParameters.userName +
        `
          </b> hat einen neuen Kommentar geschrieben in folgenden Event, dass du beobachtest:
          <b>` +
        req[i].notification.layoutParameters.poolEventName +
        `</b></p>`;
    }
  }
  console.log(text);

  if (api == "email") {
    var mail_address = user.filter.email.contact_data;

    var transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.MAIL_USER,
      to: mail_address,
      subject: req.length + " Neuigkeiten zu Aktionen und Bewerbungen",
      text: text,
      html: html,
    };

    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });
  } else if (api == "telegram") {
    var chatID = user.filter.telegram.contact_data;

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    console.log(process.env.TELEGRAM_BOT_TOKEN);
    axios
      .post(`https://api.telegram.org/bot${botToken}/sendMessage?`, {
        chat_id: chatID,
        text: text,
      })
      .then((response) => {
        console.log("Telegram sent: " + response);
      })
      .catch((e) => {
        console.log("error in Telegram");
        console.log(e.response.data);
      });
  } else if (api == "wireshark") {
    var token = user.filter.wireshark.contact_data;

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    axios({
      method: "POST",
      url: `http://wirepusher.com/send?id=${token}&title=VCA-NEWS&message=${text}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        console.log("Wireshark sent: " + response);
      })
      .catch((e) => {
        console.log("error in Wireshark");
        console.log(e.response.data);
      });
  }
};
