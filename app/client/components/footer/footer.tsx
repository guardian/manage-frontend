import React, { SyntheticEvent } from "react";
import { conf } from "../../../server/config";
import palette from "../../colours";
import { minWidth } from "../../styles/breakpoints";
import { serif } from "../../styles/fonts";
import { Button } from "../buttons";
import { footerLinks } from "./footerlinks";

let domain: string;
if (typeof window !== "undefined" && window.guardian) {
  domain = window.guardian.domain;
} else {
  domain = conf.DOMAIN;
}

const fillEmailSignup = (emailForm: SyntheticEvent<HTMLIFrameElement>) => {
  // Placeholder method to autofill user email when the iframe is hosted on the same hostname
  return;
};

const Footer = () => (
  <footer
    css={{
      marginTop: "2rem"
    }}
  >
    <div>
      <div
        css={{
          backgroundColor: palette.blue.header,
          color: palette.white
        }}
      >
        <div
          css={{
            maxWidth: "1300px",
            margin: "auto"
          }}
        >
          <div
            css={{
              padding: "10px",
              border: "1px solid rgba(255,255,255,0.3)",
              borderTop: 0,
              [minWidth.desktop]: {
                padding: "0 20px",
                display: "flex"
              }
            }}
          >
            <div
              css={{
                paddingBottom: "0.75rem",

                [minWidth.desktop]: {
                  padding: 0,
                  border: 0,
                  width: "320px",
                  margin: 0
                }
              }}
            >
              <iframe
                title="Guardian Email Sign-up Form"
                src={`https://profile.code.dev-theguardian.com/email/form/footer/today-uk`}
                scrolling="no"
                seamless={false}
                frameBorder="0"
                data-form-success-desc="We will send you our picks of the most important headlines tomorrow morning."
                data-node-uid="2"
                height="86px"
                onLoad={emailForm => fillEmailSignup(emailForm)}
              />
            </div>

            <div
              css={{
                fontFeatureSettings: "kern",
                fontSize: "16px",
                lineHeight: "16px",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginLeft: "140px"
              }}
            >
              {footerLinks.map((linkList, i) => (
                <ul
                  key={i}
                  css={{
                    lineHeight: "19.2px",
                    width: "calc(50% - 1.250rem - 1px)",
                    listStyle: "none",
                    position: "relative",
                    padding: "0 10px",
                    margin: 0,
                    marginBottom: "18px",

                    "&:nth-child(even)": {
                      borderLeft: "1px solid rgba(255,255,255,0.3)"
                    },

                    [minWidth.tablet]: {
                      "&:not(:first-child)": {
                        borderLeft: "1px solid rgba(255,255,255,0.3)"
                      },

                      width: "161px",
                      flex: "1 0 0"
                    },

                    [minWidth.desktop]: {
                      borderLeft: "1px solid rgba(255,255,255,0.3)"
                    }
                  }}
                >
                  {linkList.map(({ title, link }) => (
                    <li
                      key={title}
                      css={{
                        listStyle: "none"
                      }}
                    >
                      <a
                        href={link}
                        css={{
                          display: "inline-block",
                          padding: "6px 0",
                          color: palette.white,
                          ":hover": {
                            color: palette.yellow.medium
                          }
                        }}
                      >
                        {title}
                      </a>
                    </li>
                  ))}
                </ul>
              ))}
              <div
                css={{
                  width: "300px",
                  borderLeft: "1px solid rgba(255,255,255,0.3)",
                  paddingLeft: "10px",
                  marginBottom: "18px"
                }}
              >
                <div
                  css={{
                    color: palette.yellow.medium,
                    fontFamily: serif,
                    fontSize: "32px",
                    lineHeight: "32px",
                    fontWeight: "800",
                    marginTop: "3px",
                    marginBottom: "12px"
                  }}
                >
                  Support The&nbsp;Guardian
                </div>
                <a
                  href="https://support.theguardian.com/contribute?INTCMP=footer_support_contribute"
                  css={{ marginRight: "10px", marginBottom: "6px" }}
                >
                  <Button text="Contribute" fontWeight="bold" primary right />
                </a>
                <a href="https://support.theguardian.com/subscribe?INTCMP=footer_support_subscribe">
                  <Button text="Subscribe" fontWeight="bold" primary right />
                </a>
              </div>
            </div>
          </div>

          <div
            css={{
              paddingBottom: "24px",
              paddingLeft: "20px",
              paddingRight: "20px",
              position: "relative"
            }}
          >
            <span
              css={{
                paddingTop: "6px",
                fontSize: "12px"
              }}
            >
              © 2018 Guardian News and Media Limited or its affiliated
              companies. All&nbsp;rights&nbsp;reserved.
            </span>
            <a
              href="#top"
              css={{
                fontSize: "16px",
                color: palette.white,
                fontWeight: "bold",
                padding: "0 5px",
                backgroundColor: palette.blue.header,
                ":hover": {
                  color: palette.yellow.medium
                },
                position: "absolute",
                right: "20px",
                transform: "translateY(-50%)"
              }}
            >
              <span
                css={{
                  display: "inline-block",
                  paddingRight: "5px",
                  paddingTop: "9px"
                }}
              >
                Back to top
              </span>
              <span
                css={{
                  position: "relative",
                  float: "right",
                  backgroundColor: "currentColor",
                  borderRadius: "100%",
                  height: "42px",
                  width: "42px"
                }}
              >
                <span
                  css={{
                    position: "absolute",
                    fill: palette.blue.header,
                    top: "9px",
                    left: "9px"
                  }}
                >
                  <svg width="24" height="18" viewBox="0 0 24 18">
                    <path d="M.4 15.3l10.5-8.4L12 6l1.1.9 10.5 8.4-.5.7L12 9.7.9 16l-.5-.7z" />
                  </svg>
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
