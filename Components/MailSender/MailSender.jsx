import React, { useState } from "react";
import axios from "axios";

//INTERNAL IMPORT
import styles from "./MailSender.module.css";

const MailSender = () => {
  const [fields, setFields] = useState([
    {
      name: null,
      toEmail: null,
      message: null,
      getTime: null,
      toggleschedule: false,
    },
  ]);
  console.log(fields);

  const url = process.env.NEXT_PUBLIC_API_URL;

  // const handScheduleTime = () => {
  //   fields.forEach(async (el, i) => {
  //     console.log("running for each loop", fields[i].getTime);
  //     if (fields[i].getTime === null) {
  //       console.log("current time");
  //       const values = [...fields];
  //       let utcTime = new Date();
  //       utcTime.setMinutes(utcTime.getMinutes() + 1);
  //       let date = new Date(utcTime);
  //       let utcString = date.toUTCString();
  //       utcString = date.toISOString();
  //       console.log(utcString);
  //       values[i].getTime = utcString;
  //       setFields(values);
  //     }
  //   });
  // };

  const handleMailSend = async () => {
    const result = await axios
      .post(`${url}/sendMail`, fields)
      .then(async (response) => {
        console.log(response);
        console.log(response.data.Response_message);
      })
      .catch(async (error) => {
        console.log(error);
      });
  };

  //ONCHANGE FUNCTIONS

  function handleChange(i, event) {
    const values = [...fields];
    values[i].name = event.target.value;
    setFields(values);
  }
  function handleChangeEmail(i, event) {
    const values = [...fields];
    values[i].toEmail = event.target.value;
    setFields(values);
  }
  function handleChangeSelect(i, event) {
    const values = [...fields];
    values[i].message = event.target.value;
    setFields(values);
  }
  function handleChangeTime(i, event) {
    const values = [...fields];
    let utcTime = event.target.value;
    let date = new Date(utcTime);
    let utcString = date.toUTCString();
    utcString = date.toISOString();
    console.log(utcString);
    values[i].getTime = utcString;
    setFields(values);
  }

  function handleAdd() {
    const values = [...fields];
    values.push({
      name: null,
      toEmail: null,
      message: null,
      getTime: null,
      toggleschedule: false,
    });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

  const handleschedule = (i, event) => {
    // setToggleschedule(!toggleschedule);

    const values = [...fields];
    if (values[i].toggleschedule == false) {
      values[i].toggleschedule = true;
    } else {
      values[i].toggleschedule = false;
      values[i].getTime = null;
    }

    setFields(values);
  };

  return (
    <div className={styles.form_container}>
      <p className={styles.title}>MailChain.GPT</p>
      <div className={styles.main_box}>
        {fields.map((field, idx) => {
          return (
            <div className={styles.form_box} key={idx}>
              <form className={styles.form} key={`${field}-${idx}`}>
                <div className={styles.input_group}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    onChange={(e) => handleChange(idx, e)}
                  />
                </div>
                <div className={styles.input_group}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email addresses"
                    onChange={(e) => handleChangeEmail(idx, e)}
                  />
                </div>
                {/* <div className={styles.input_group}>
  <label htmlFor="message">Message</label>
  <input type="text" name="message" id="message" placeholder="" />
  <div className={styles.forgot}></div>
</div> */}

                <div className={styles.input_group}>
                  <label htmlFor="message">Select Option</label>
                  <select
                    value={fields[idx].message}
                    onChange={(e) => handleChangeSelect(idx, e)}
                  >
                    <option>write me a poem within 20 characters</option>
                    <option>write me a poem within 30 characters</option>
                    <option>write me a poem within 40 characters</option>
                  </select>
                </div>

                <div className={styles.input_group}>
                  <label htmlFor="message"> Set schedule</label>

                  <div className={styles.checkbox_con}>
                    <input
                      id="checkbox"
                      type="checkbox"
                      onClick={(e) => handleschedule(idx, e)}
                    />
                  </div>
                  {fields[idx].toggleschedule && (
                    <input
                      type="datetime-local"
                      id="time"
                      name="time"
                      onChange={(e) => handleChangeTime(idx, e)}
                    />
                  )}

                  {/* <input type="text" name="message" id="message" placeholder="" /> */}
                  <div className={styles.forgot}></div>
                </div>
              </form>

              <button
                className={styles.noselect}
                type="button"
                onClick={() => handleRemove(idx)}
              >
                <span className={styles.text}>Delete</span>
                <span className={styles.icon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                  </svg>
                </span>
              </button>
            </div>
          );
        })}
        <div className={styles.button_box}>
          <button
            type="button"
            className={styles.button}
            onClick={() => handleAdd()}
          >
            <span className={styles.button__text}>Add Email sequence</span>
            <span className={styles.button__icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke="currentColor"
                height="24"
                fill="none"
                class="svg"
              >
                <line y2="19" y1="5" x2="12" x1="12"></line>
                <line y2="12" y1="12" x2="19" x1="5"></line>
              </svg>
            </span>
          </button>

          <button
            type="button"
            className={styles.sign}
            onClick={handleMailSend}
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default MailSender;
