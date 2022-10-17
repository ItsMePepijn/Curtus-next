import {setCookie, getCookie} from 'cookies-next'
import { useEffect, useState } from 'react'

import styles from '../styles/RedirectSettings.module.scss'

import * as cookie from '../modules/cookies'

export default function Settings({isEnabledData, isDelayedData, delayTimeData}){
  let [isEnabled, setIsEnabled] = useState(isEnabledData);
  let [isDelayed, setIsDelayed] = useState(isDelayedData);
  let [delayTime, setDelayTime] = useState(delayTimeData);

  function toggleIsEnabled(e) {
    setIsEnabled(e.target.checked);

    const cookies = new cookie.Settings(e.target.checked, isDelayed, delayTime);
    setCookie("redirectSettings", cookies, cookies.rules());

    console.log(JSON.parse(getCookie("redirectSettings")));
  }

  return(
    <div className={styles.settingsContainer}>
      <form>
        <table>
          <tbody>
            <tr>
              <td className={styles.label}>Disable redirect confirmation</td>
              <td>
                <label className={styles.switch}>
                  <input type="checkbox" checked={isEnabled} onChange={toggleIsEnabled}/>
                  <span className={styles.slider}></span>
                </label>
              </td>
            </tr>

            <tr>
              <td className={styles.label}>Enable redirect delay</td>
              <td>
                <label className={styles.switch}>
                  <input type="checkbox" defaultChecked={isDelayed}/>
                  <span className={styles.slider}></span>
                </label>
              </td>
            </tr>

            <tr>
              <td className={styles.label}>Redirect delay</td>
              <td>
                <label>
                  <input type="numer" defaultValue={delayTime}/>
                  <span></span>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )
}