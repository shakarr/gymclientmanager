import { List, Icon } from "semantic-ui-react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, textVariant } from "../../utils/motion";

import "./home.scss";

export function Home() {
  return (
    <div className="container">
      <div className="container-home">
        <div style={{ textAlign: "center" }}>
          <List>
            <List.Header as="h1">Gym Client Manager</List.Header>
            <List.Description>
              Herramienta de gestión y administració de clientes y dietas <br />
              personal de Javier Alfonso Guerrero
            </List.Description>
            <List.Item />
            {/* <List.Item>version: {appVer}</List.Item> */}
          </List>
          <div style={{ marginTop: 25, marginBottom: 25 }}>
            <List horizontal relaxed>
              <List.Item>
                <a
                  href="mailto:bit.teach.team@gmail.com"
                  target="_blank"
                  title="Contact me"
                  rel="noreferrer"
                >
                  <div className="home-button">
                    <p>
                      <Icon name="send" color="blue" size="big" />
                    </p>
                    <p>Contacto</p>
                  </div>
                </a>
              </List.Item>
              <List.Item>
                <a
                  href="https://github.com/shakarr/gymclientmanager"
                  target="_blank"
                  title="Visit Github"
                  rel="noreferrer"
                >
                  <div className="home-button">
                    <p>
                      <Icon name="github" color="blue" size="big" />
                    </p>
                    <p>Github</p>
                  </div>
                </a>
              </List.Item>
              <List.Item>
                <a
                  href="https://github.com/shakarr/gymclientmanager/issues"
                  target="_blank"
                  title="Report Bugs"
                  rel="noreferrer"
                >
                  <div className="home-button">
                    <p>
                      <Icon name="bug" color="blue" size="big" />
                    </p>
                    <p>Reportar Bugs</p>
                  </div>
                </a>
              </List.Item>
            </List>
          </div>

          <List relaxed>
            {/* <List.Item>Electron: {window.sysinfo.versions.electron}</List.Item>
            <List.Item>Node: {window.sysinfo.versions.node}</List.Item>
            <List.Item>Chrome: {window.sysinfo.versions.chrome}</List.Item> */}
            <List.Item>
              <div
                style={{
                  display: "flex",
                  verticalAlign: "middle",
                  justifyContent: "center",
                }}
              >
                <Icon name="react" color="grey" size="big" />
                <Icon name="node js" color="grey" size="big" />
                <svg
                  style={{ marginRight: 4 }}
                  viewBox="0 0 32 32"
                  width="28"
                  height="28"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g stroke="#586069" fill="none" fillRule="evenodd">
                    <path d="M11.7014354,7.72646259 C7.91761319,7.04380371 4.81334929,7.69369948 3.61536899,9.74908711 C2.72656361,11.27402 3.03878853,13.3122813 4.27551338,15.4489979 M6.32642733,18.1886712 C7.89193828,19.8928217 9.9666792,21.548102 12.4120986,22.9466461 C18.2414315,26.2804624 24.2930499,27.0779063 27.1669222,25.1368228 M29.8456419,24.0565148 C29.8456419,23.1971812 29.1423799,22.5005537 28.2748621,22.5005537 C27.4073444,22.5005537 26.7040823,23.1971812 26.7040823,24.0565148 C26.7040823,24.9158484 27.4073444,25.612476 28.2748621,25.612476 C29.1423799,25.612476 29.8456419,24.9158484 29.8456419,24.0565148 L29.8456419,24.0565148 Z" />
                    <path d="M26.1017264,17.699802 C28.5790274,14.8008665 29.5563892,11.8210699 28.3609038,9.7699627 C27.4866535,8.27000212 25.5971843,7.51855661 23.1692624,7.48727915 M19.6970573,7.86083838 C17.4054295,8.34719767 14.8948834,9.30454988 12.424266,10.7175048 C6.42288792,14.1497143 2.65401611,19.1281832 3.16552768,22.580522 M3.68501877,25.612476 C4.5525365,25.612476 5.25579857,24.9158484 5.25579857,24.0565148 C5.25579857,23.1971812 4.5525365,22.5005537 3.68501877,22.5005537 C2.81750104,22.5005537 2.11423897,23.1971812 2.11423897,24.0565148 C2.11423897,24.9158484 2.81750104,25.612476 3.68501877,25.612476 L3.68501877,25.612476 L3.68501877,25.612476 Z" />
                    <path d="M10.1856596,25.0699995 C11.480995,28.6529192 13.5999849,30.9876144 15.99422,30.9876144 C17.7292778,30.9876144 19.3197869,29.7615184 20.5570359,27.7228112 M22.0509221,24.3364015 C22.7373456,22.1635452 23.1341282,19.5948285 23.1341282,16.8425133 C23.1341282,10.0879866 20.7444131,4.43922457 17.5485944,3.03357113 M15.99422,4.25337326 C16.8617378,4.25337326 17.5649998,3.55674574 17.5649998,2.69741214 C17.5649998,1.83807854 16.8617378,1.14145101 15.99422,1.14145101 C15.1267023,1.14145101 14.4234402,1.83807854 14.4234402,2.69741214 C14.4234402,3.55674574 15.1267023,4.25337326 15.99422,4.25337326 Z" />
                    <path d="M16.2975137,18.2334955 C15.5219407,18.3994908 14.7578457,17.9112502 14.5899415,17.142994 C14.4226932,16.3747378 14.9152558,15.6178512 15.6908287,15.451531 C16.4664016,15.2855357 17.2304967,15.7737763 17.3984009,16.5420325 C17.5659771,17.3102887 17.0730866,18.0671753 16.2975137,18.2334955 Z" />
                  </g>
                </svg>
              </div>
            </List.Item>
            <List.Item />
          </List>
        </div>
      </div>
    </div>
  );
}
