import {setCookie, getCookie} from 'cookies-next'
import { createRef, useState } from 'react'

import styles from '../styles/RedirectSettings.module.scss'

import * as cookie from '../modules/cookies'

export default function Settings({user}){
  let [isEnabled, setIsEnabled] = useState(user.isEnabled);
  let [isDelayed, setIsDelayed] = useState(user.isDelayed);
  let [delayTime, setDelayTime] = useState(user.delayTime);

  function empty() {}

  function toggleIsEnabled(e) {
    setIsEnabled(e.target.checked);

    const cookies = new cookie.Settings(e.target.checked, isDelayed, delayTime);
    setCookie("redirectSettings", cookies, cookies.rules());
  }

  function toggleIsDelayed(e) {
    setIsDelayed(e.target.checked);

    const cookies = new cookie.Settings(isEnabled, e.target.checked, delayTime);
    setCookie("redirectSettings", cookies, cookies.rules());
    console.log(JSON.parse(getCookie("redirectSettings")));
  }

  function changeDelayTime(e) {
    setDelayTime(e.target.value);
    e.target.value = (!e.target.value > 0) ? e.target.value = 0 : e.target.value;

    const cookies = new cookie.Settings(isEnabled, isDelayed, parseInt(e.target.value));
    setCookie("redirectSettings", cookies, cookies.rules());

    console.log(JSON.parse(getCookie("redirectSettings")));
  }

  function toggleMenuClass() {
    setContainerHidden(((containerShown == "") ? styles.settingsContainerShown : ""));
  }
  let [containerShown, setContainerHidden] = useState("");

  return(
      <div className={styles.settingsContainer+" "+containerShown}>
        <div className={styles.openSettings}>
          <img className={styles.openSettingsIcon} src="settings.svg" onClick={toggleMenuClass}></img>
        </div>
        <form onSubmit={(e) => {e.preventDefault()}}>
          <table>
            <tbody>
              <tr className={styles.settingsContainerFirstRow}>
                <td className={styles.label}>Disable redirect confirmation</td>
                <td>
                  <label className={styles.switch}>
                    <input type="checkbox" checked={isEnabled} onChange={empty} onClick={toggleIsEnabled}/>
                    <span className={styles.slider}></span>
                  </label>
                </td>
              </tr>

              <tr className={styles.settingsContainerSecondRow}>
                <td className={styles.label}>Enable redirect delay</td>
                <td>
                  <label className={styles.switch}>
                    <input type="checkbox" checked={isDelayed} onChange={empty} onClick={toggleIsDelayed}/>
                    <span className={styles.slider}></span>
                  </label>
                </td>
              </tr>

              <tr className={styles.settingsContainerThirdRow}>
                <td className={styles.label}>Redirect delay</td>
                <td>
                  <label className={styles.num}>
                    <input type="number" value={delayTime} onChange={changeDelayTime}/>
                    <span>Secs</span>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
  )
}