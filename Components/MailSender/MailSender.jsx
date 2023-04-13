import React, { useState } from "react";
import axios from "axios";

//INTERNAL IMPORT
import styles from "./MailSender.module.css";

const MailSender = () => {
  const [name, setName] = useState("");
  const [toEmail, setToEmail] = useState("");

  const url = process.env.NEXT_PUBLIC_API_URL;

  const handleMailSend = async () => {
    const result = await axios
      .post(`${url}/sendMail`, {
        name: name,
        email: toEmail,
        message: "Flintstone",
      })
      .then(async (response) => {
        console.log(response);
        console.log(response.data.Response_message);
      })
      .catch(async (error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.form_container}>
      <p className={styles.title}>Mailchain Email Sender</p>
      <form className={styles.form}>
        <div className={styles.input_group}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className={styles.input_group}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setToEmail(e.target.value)}
          />
        </div>
        <div className={styles.input_group}>
          <label htmlFor="message">Message</label>
          <input type="text" name="message" id="message" placeholder="" />
          <div className={styles.forgot}></div>
        </div>
        <button type="button" className={styles.sign} onClick={handleMailSend}>
          Send Mail
        </button>
      </form>
    </div>
  );
};

export default MailSender;
